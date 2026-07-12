/**
 * お気に入り管理モジュール
 *
 * 全ページで動作する共通モジュール。
 * - ハートボタンの状態同期（物件カード・物件詳細サイドバー）
 * - ヘッダーのお気に入り件数バッジ更新
 * - お気に入りドロワー（一覧表示・削除）
 *
 * localStorage を StorageHelper 経由で操作し、
 * 同一タブ内での状態変更はカスタムイベントで通知する。
 * ドロワー開閉は DrawerController に委譲（排他制御・スクロールロック一元管理）。
 */

import { EVENT, STORAGE_KEY } from '../utils/Config.js'
import { $, $$ } from '../utils/DOMHelper.js'
import DrawerController from '../utils/DrawerController.js'
import {
  isFavorite,
  toggleFavorite,
  getFavorites,
  getFavoriteCount,
} from '../utils/StorageHelper.js'
import { updateBadges, renderPropertyList } from '../utils/DrawerHelper.js'

/** お気に入りドロワーの最大表示件数 */
const DRAWER_MAX = 30

/** バッジセレクタ */
const BADGE_SELECTOR = '[data-fav-badge]'

export default class FavoriteManager {
  /** @type {DrawerController} */
  #drawer

  constructor() {
    this.#drawer = new DrawerController({
      drawerId: 'favDrawer',
      overlayId: 'favDrawerOverlay',
      toggleAttr: 'data-fav-drawer-toggle',
      onOpen: () => this.#renderDrawerContent(),
    })
    this.#init()
  }

  #init() {
    this.#updateBadge()
    this.#initExistingButtons()
    this.#listenEvents()
  }

  // ==============================================================
  // バッジ（ヘッダーのお気に入り件数）
  // ==============================================================

  #updateBadge() {
    updateBadges(BADGE_SELECTOR, getFavoriteCount())
  }

  // ==============================================================
  // 既存のお気に入りボタン初期化
  // ==============================================================

  /** ページ読込時に存在するお気に入りボタンの状態を同期 */
  #initExistingButtons() {
    for (const btn of $$('[data-fav-id]')) {
      const id = Number(btn.dataset.favId)
      this.#syncButtonState(btn, isFavorite(id))
    }
  }

  // ==============================================================
  // イベントリスニング
  // ==============================================================

  #listenEvents() {
    // お気に入りボタンクリック（イベント委譲）
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-fav-id]')
      if (!btn) return

      e.preventDefault()
      e.stopPropagation()

      const id = Number(btn.dataset.favId)
      if (!Number.isInteger(id) || id <= 0) return
      const added = toggleFavorite(id)
      this.#syncButtonState(btn, added)
      this.#updateBadge()

      // 同一ページ内の他のボタンも同期（詳細ページにカード+サイドバー両方ある場合）
      for (const other of $$(`[data-fav-id="${id}"]`)) {
        if (other !== btn) this.#syncButtonState(other, added)
      }

      // カスタムイベント
      document.dispatchEvent(new CustomEvent(EVENT.FAVORITE_TOGGLE, { detail: { id, added } }))

      // ドロワーが開いていれば再描画
      if (this.#drawer.isOpen) this.#renderDrawerContent()
    })

    // 他タブで localStorage が変更された場合
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY.favorites) {
        this.#updateBadge()
        this.#initExistingButtons()
        if (this.#drawer.isOpen) this.#renderDrawerContent()
      }
    })
  }

  /**
   * ボタンの見た目を同期
   * @param {HTMLElement} btn
   * @param {boolean} active
   */
  #syncButtonState(btn, active) {
    btn.classList.toggle('is-fav-active', active)
    btn.setAttribute('aria-pressed', String(active))

    // ボタン内のテキスト更新（サイドバー等）
    const label = btn.querySelector('.fav-btn__label')
    if (label) {
      label.textContent = active ? 'お気に入り済み' : 'お気に入りに追加'
    }

    // アイコンのみのボタン（カード上のハート）
    const icon = btn.querySelector('.fav-btn__icon')
    if (icon) {
      icon.textContent = active ? '❤️' : '🤍'
    }
  }

  // ==============================================================
  // お気に入りドロワー描画
  // ==============================================================

  /** ドロワー内の物件リストを描画 */
  #renderDrawerContent() {
    const container = $('#favDrawerContent')
    if (!container) return

    const ids = getFavorites().slice(0, DRAWER_MAX)

    container.innerHTML = renderPropertyList(ids, {
      removable: true,
      emptyMessage: 'お気に入りに登録された物件はありません',
      emptyHint: '物件カードの🤍をタップすると追加できます',
    })
  }
}
