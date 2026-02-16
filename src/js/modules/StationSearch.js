/**
 * 沿線・駅検索 動的切替モジュール
 * URLの ?area= パラメータ or ドロップダウン選択に応じて
 * station.html の路線一覧を都道府県別に動的に切り替え
 */

import STATION_DATA, { PREFECTURE_LIST } from '../data/StationData.js'
import { updatePageMeta } from '../utils/MetaUpdater.js'
import { SITE, SELECTOR, EVENT } from '../utils/Config.js'
import { $, getQueryParam, buildRegionOptions, escapeHTML } from '../utils/DOMHelper.js'

// ----------------------------------------------------------------
// ユーティリティ（モジュールプライベート）
// ----------------------------------------------------------------

/**
 * 路線一覧の HTML を生成（純粋関数）
 * @param {Object[]} railways  路線グループ配列
 * @returns {string}
 */
function buildRailwaysHTML(railways) {
  return railways
    .map((group) => {
      const linesHTML = group.lines
        .map(
          (line) => `
          <div class="station-select__line-item">
            <label>
              <input type="checkbox" name="line" value="${escapeHTML(line.value)}">
              ${escapeHTML(line.name)} <span class="station-select__station-count">(${line.count.toLocaleString()}件)</span>
            </label>
          </div>`,
        )
        .join('')

      return `
        <div class="station-select__railway">
          <h3 class="station-select__railway-name">${escapeHTML(group.company)}</h3>
          <div class="station-select__railway-lines">${linesHTML}</div>
        </div>`
    })
    .join('')
}

/**
 * 隣接都道府県リンクの HTML を生成（純粋関数）
 * @param {Object[]} adjacentList  { key, name } の配列
 * @returns {string}
 */
function buildAdjacentHTML(adjacentList) {
  return adjacentList
    .map(
      (adj) =>
        `<a href="./station.html?area=${encodeURIComponent(adj.key)}" class="btn btn--outline">${escapeHTML(adj.name)}</a>`,
    )
    .join('')
}

// ----------------------------------------------------------------
// メインクラス
// ----------------------------------------------------------------

export default class StationSearch {
  // ── キャッシュ済み DOM 要素 ──
  /** @type {HTMLElement|null} */  #elContainer
  /** @type {HTMLSelectElement|null} */ #elPrefSelect
  /** @type {HTMLElement|null} */  #elTitle
  /** @type {HTMLElement|null} */  #elStepBody
  /** @type {HTMLElement|null} */  #elAdjacentStep
  /** @type {HTMLElement|null} */  #elAdjacentHeader
  /** @type {HTMLElement|null} */  #elAdjacentBody

  constructor() {
    this.#elContainer = $(SELECTOR.stationSelect)
    if (!this.#elContainer) return

    this.#cacheElements()
    this.#createPrefectureSelector()
    this.#bindEvents()
    this.#restoreFromURL()
  }

  // ==============================================================
  // 初期化
  // ==============================================================

  /** DOM 要素をキャッシュ（毎回クエリしない） */
  #cacheElements() {
    this.#elTitle    = $(SELECTOR.stationTitle)
    this.#elStepBody = $(SELECTOR.stationStepBody)
    // data-step="adjacent" で堅牢に特定（HTML 構造への依存を排除）
    this.#elAdjacentStep   = this.#elContainer.querySelector('[data-step="adjacent"]')
    this.#elAdjacentHeader = this.#elAdjacentStep?.querySelector('.station-select__step-header')
    this.#elAdjacentBody   = this.#elAdjacentStep?.querySelector('.station-select__step-body')
  }

  /** URL パラメータ ?area= があれば初期表示を復元 */
  #restoreFromURL() {
    const area = getQueryParam('area')
    if (area && STATION_DATA[area]) {
      if (this.#elPrefSelect) this.#elPrefSelect.value = area
      this.#switchPrefecture(area)
    }
  }

  // ==============================================================
  // 都道府県セレクタ
  // ==============================================================

  /** STEP1 の前に都道府県選択ドロップダウンを挿入 */
  #createPrefectureSelector() {
    const firstStep = $(SELECTOR.stationStep, this.#elContainer)
    if (!firstStep) return

    const html = `
      <div class="station-select__prefecture-selector js-fade-in">
        <label for="prefectureSelect" class="station-select__pref-label">
          <span class="station-select__pref-icon" aria-hidden="true">📍</span>
          都道府県を選択してください
        </label>
        <select id="prefectureSelect" class="station-select__pref-select">
          ${buildRegionOptions(PREFECTURE_LIST, '-- 選択してください --')}
        </select>
      </div>
    `
    firstStep.insertAdjacentHTML('beforebegin', html)

    // 挿入後にキャッシュ
    this.#elPrefSelect = $(SELECTOR.prefectureSelect)
  }

  // ==============================================================
  // イベントバインド
  // ==============================================================

  /** セレクタ変更・popstate を一括バインド */
  #bindEvents() {
    // 都道府県選択
    this.#elPrefSelect?.addEventListener('change', (e) => {
      const val = e.target.value
      if (val && STATION_DATA[val]) {
        this.#switchPrefecture(val)
        this.#replaceURL(val)
      }
    })

    // ブラウザの戻る・進むで URL が変わった際に UI を同期
    window.addEventListener('popstate', () => {
      const area = getQueryParam('area')
      if (this.#elPrefSelect) {
        this.#elPrefSelect.value = area || ''
      }
      if (area && STATION_DATA[area]) {
        this.#switchPrefecture(area)
      } else {
        // エリア未選択状態に戻った場合、前回の路線表示をクリア
        if (this.#elStepBody) this.#elStepBody.innerHTML = ''
        if (this.#elAdjacentBody) this.#elAdjacentBody.innerHTML = ''
      }
    })
  }

  // ==============================================================
  // URL 管理
  // ==============================================================

  /**
   * URL を replaceState で更新（ページリロードなし）
   * @param {string} area  都道府県キー
   */
  #replaceURL(area) {
    const params = new URLSearchParams(location.search)
    params.set('area', area)
    const url = `${location.pathname}?${params.toString()}`
    history.replaceState(null, '', url)
  }

  // ==============================================================
  // 都道府県切り替え
  // ==============================================================

  /**
   * 指定された都道府県の路線データに切り替え
   * @param {string} key  都道府県キー
   */
  #switchPrefecture(key) {
    const data = STATION_DATA[key]
    if (!data) return

    this.#updateMeta(key, data)
    this.#updateTitle(data.name)
    this.#renderRailways(data.railways)
    this.#renderAdjacentAreas(data.name, data.adjacent)
  }

  // ==============================================================
  // メタ情報
  // ==============================================================

  /**
   * ページメタ（title / OGP / パンくず）を更新
   * @param {string} key   都道府県キー
   * @param {Object} data  STATION_DATA エントリ
   */
  #updateMeta(key, data) {
    const title = `${data.name}の路線・沿線・駅から賃貸物件を探す｜${SITE.name}`
    const description = `${data.name}の路線・沿線・駅から賃貸マンション・アパートを探す`

    updatePageMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      canonical: `${SITE.domain}/station.html?area=${key}`,
      breadcrumb: [
        { label: SITE.tagline, href: './' },
        { label: data.name, href: `./search.html?area=${key}` },
        { label: `${data.name}の路線・沿線・駅から賃貸物件を探す` },
      ],
    })
  }

  // ==============================================================
  // 描画
  // ==============================================================

  /** h1 の見出しを更新 */
  #updateTitle(prefName) {
    if (!this.#elTitle) return
    this.#elTitle.textContent =
      `${prefName}の路線・沿線・駅から賃貸物件(賃貸マンション・アパート)を探す`
  }

  /** STEP1: 路線一覧を差し替え */
  #renderRailways(railways) {
    if (!this.#elStepBody) return
    this.#elStepBody.innerHTML = buildRailwaysHTML(railways)

    // 路線が再描画されたことを通知（LineSelector が駅展開をリセット）
    this.#elContainer.dispatchEvent(new CustomEvent(EVENT.RAILWAYS_REPLACED))
  }

  /** 隣接都道府県セクションを更新 */
  #renderAdjacentAreas(prefName, adjacentList) {
    if (this.#elAdjacentHeader) {
      this.#elAdjacentHeader.textContent = `${prefName}と隣接する都道府県の賃貸物件を探す`
    }
    if (this.#elAdjacentBody) {
      this.#elAdjacentBody.innerHTML = `<div class="adjacent-area">${buildAdjacentHTML(adjacentList)}</div>`
    }
  }
}
