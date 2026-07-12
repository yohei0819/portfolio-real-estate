/**
 * 検索条件の保存・復元モジュール
 *
 * search.html で検索条件を localStorage に保存し、
 * ドロワーから過去の検索条件を呼び出せる機能を提供する。
 *
 * 検索実行時に自動保存し、ヘッダーの「検索した条件」リンクから
 * 保存された条件を一覧表示・クリックで復元できる。
 *
 * ドロワー開閉は DrawerController に委譲（排他制御・スクロールロック一元管理）。
 */

import { EVENT, STORAGE_KEY, SEARCH } from '../utils/Config.js'
import PREFECTURES from '../data/PrefectureData.js'
import { $, escapeHTML } from '../utils/DOMHelper.js'
import DrawerController from '../utils/DrawerController.js'
import {
  getSearchHistory,
  saveSearchHistory,
  removeSearchHistory,
  clearSearchHistory,
} from '../utils/StorageHelper.js'
import { updateBadges, renderEmptyState } from '../utils/DrawerHelper.js'
import { getLineLabel } from '../utils/StationMatcher.js'

const { typeMap: TYPE_MAP } = SEARCH

/** バッジセレクタ */
const BADGE_SELECTOR = '[data-search-badge]'

export default class SearchHistoryManager {
  /** @type {DrawerController} */
  #drawer

  constructor() {
    this.#drawer = new DrawerController({
      drawerId: 'searchDrawer',
      overlayId: 'searchDrawerOverlay',
      toggleAttr: 'data-search-drawer-toggle',
      onOpen: () => this.#renderDrawerContent(),
    })
    this.#init()
  }

  #init() {
    this.#listenEvents()
    this.#initDrawerActions()
    this.#updateBadge()
  }

  // ==============================================================
  // バッジ
  // ==============================================================

  #updateBadge() {
    updateBadges(BADGE_SELECTOR, getSearchHistory().length)
  }

  // ==============================================================
  // 検索実行の検知と自動保存
  // ==============================================================

  #listenEvents() {
    // AreaSearch が検索を実行した際のカスタムイベントを監視
    document.addEventListener(EVENT.SEARCH_FILTER, (e) => {
      const query = e.detail?.query
      if (!query) return

      const label = this.#buildLabel(query)
      saveSearchHistory(query, label)
      this.#updateBadge()
    })

    // 他タブでの変更同期
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY.searchHistory) {
        this.#updateBadge()
        if (this.#drawer.isOpen) this.#renderDrawerContent()
      }
    })
  }

  /**
   * URLクエリ文字列から人間が読めるラベルを生成
   * @param {string} query
   * @returns {string}
   */
  #buildLabel(query) {
    const params = new URLSearchParams(query)
    const parts = []

    // 路線・駅（station.html からの遷移時）
    const lineLabel = getLineLabel(params.get('lines'))
    if (lineLabel) {
      parts.push(lineLabel)
    }

    // エリア（路線ラベルがない場合のみ追加 — 重複防止）
    if (!lineLabel) {
      const area = params.get('area')
      if (area && PREFECTURES[area]) {
        parts.push(PREFECTURES[area].name)
      }
    }

    // 賃料
    const rentMin = params.get('rent_min')
    const rentMax = params.get('rent_max')
    if (rentMin && rentMax) {
      parts.push(`${rentMin}〜${rentMax}万円`)
    } else if (rentMin) {
      parts.push(`${rentMin}万円以上`)
    } else if (rentMax) {
      parts.push(`${rentMax}万円以下`)
    }

    // 間取り
    const layouts = params.getAll('layout')
    if (layouts.length > 0) {
      parts.push(layouts.slice(0, 3).join('・') + (layouts.length > 3 ? '他' : ''))
    }

    // 物件タイプ
    const types = params.getAll('type')
    if (types.length > 0) {
      const typeLabels = types.map((t) => TYPE_MAP[t] || t).slice(0, 2)
      parts.push(typeLabels.join('・'))
    }

    return parts.length > 0 ? parts.join(' / ') : '条件指定なし（全件）'
  }

  // ==============================================================
  // ドロワー内操作（削除ボタン）
  // ==============================================================

  /** ドロワー内の個別削除・全件クリアをイベント委譲で処理 */
  #initDrawerActions() {
    const drawer = $('#searchDrawer')
    if (!drawer) return

    drawer.addEventListener('click', (e) => {
      // 個別削除ボタン
      const removeBtn = e.target.closest('[data-remove-query]')
      if (removeBtn) {
        e.preventDefault()
        removeSearchHistory(removeBtn.dataset.removeQuery)
        this.#updateBadge()
        this.#renderDrawerContent()
        return
      }

      // 全件クリア
      if (e.target.closest('[data-clear-history]')) {
        e.preventDefault()
        clearSearchHistory()
        this.#updateBadge()
        this.#renderDrawerContent()
      }
    })
  }

  // ==============================================================
  // ドロワー描画
  // ==============================================================

  #renderDrawerContent() {
    const container = $('#searchDrawerContent')
    if (!container) return

    const history = getSearchHistory()

    if (history.length === 0) {
      container.innerHTML = renderEmptyState(
        '保存された検索条件はありません',
        '物件を検索すると条件が自動的に保存されます'
      )
      return
    }

    const items = history
      .map((entry) => {
        const dateStr = this.#formatDate(entry.savedAt)
        // XSS 対策: ユーザー由来のクエリ文字列・ラベルをエスケープ
        const safeQuery = escapeHTML(entry.query)
        const safeLabel = escapeHTML(entry.label)

        return `
        <div class="drawer__item">
          <a href="./search.html?${safeQuery}" class="drawer__item-link">
            <div class="drawer__item-body">
              <p class="drawer__item-name">📋 ${safeLabel}</p>
              <p class="drawer__item-location">${dateStr}</p>
            </div>
          </a>
          <button class="drawer__item-remove" data-remove-query="${safeQuery}" aria-label="この検索条件を削除">✕</button>
        </div>`
      })
      .join('')

    container.innerHTML =
      items +
      `<div class="drawer__footer">
        <button class="drawer__clear-btn" data-clear-history>検索履歴をすべて削除</button>
      </div>`
  }

  /**
   * 保存日時を表示用文字列にフォーマット
   * @param {number} timestamp  Date.now() で保存されたタイムスタンプ
   * @returns {string}  "M/D HH:MM" 形式
   */
  #formatDate(timestamp) {
    const date = new Date(timestamp)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${month}/${day} ${hours}:${minutes}`
  }
}
