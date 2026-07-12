/**
 * 路線選択 + 駅展開モジュール
 *
 * - チェック状態に応じた is-checked クラスのトグル
 * - 路線チェック時に駅一覧を展開表示（StationStops データ使用）
 * - 選択状況のリアルタイム集計 → フローティング選択バーに反映
 * - 検索URLの動的構築（フローティング + STEP2 内ボタンの両方を同期）
 *
 * イベント委譲を使用し、StationSearch.js による路線HTML動的差し替え後も
 * 新しいチェックボックスが正しく動作する
 */
import { SELECTOR, EVENT } from '../utils/Config.js'
import { $, $$, escapeHTML } from '../utils/DOMHelper.js'
import STATION_STOPS from '../data/StationStops.js'

/** 駅展開パネルの折りたたみ遷移時間（ms） — CSS の transition と合わせること */
const COLLAPSE_DURATION_MS = 400

/** チェックボックスの name 属性定数 */
const CB_NAME = Object.freeze({ LINE: 'line', STATION: 'station' })

/** DOM クエリ用セレクタ（name 属性ベースで繰り返し使う） */
const Q = Object.freeze({
  lineChecked: `input[name="${CB_NAME.LINE}"]:checked`,
  stationChecked: `input[name="${CB_NAME.STATION}"]:checked`,
  stationAll: `input[name="${CB_NAME.STATION}"]`,
})

export default class LineSelector {
  /** @type {HTMLElement|null} */
  #container

  /** @type {HTMLElement|null} */
  #summaryBar

  /** @type {HTMLElement|null} */
  #lineCountEl

  /** @type {HTMLElement|null} */
  #stationCountEl

  /** @type {HTMLAnchorElement|null} — フローティングバーの検索ボタン */
  #searchBtn

  /** @type {HTMLAnchorElement|null} — STEP2 内の検索ボタン */
  #searchBtnInline

  constructor() {
    this.#container = $(SELECTOR.stationSelect)
    if (!this.#container) return

    this.#cacheSummaryElements()
    this.#bindEvents()
  }

  // ==============================================================
  // 初期化
  // ==============================================================

  /** フローティング選択バー + STEP2 ボタンの要素をキャッシュ */
  #cacheSummaryElements() {
    this.#summaryBar = $(SELECTOR.stationSummary)
    this.#lineCountEl = $('[data-selected-line-count]')
    this.#stationCountEl = $('[data-selected-station-count]')
    this.#searchBtn = $(SELECTOR.stationSearchBtn)
    this.#searchBtnInline = $(SELECTOR.stationSearchBtnInline)
  }

  /** イベント委譲で路線・駅チェックボックスのみ処理 */
  #bindEvents() {
    this.#container.addEventListener('change', (e) => {
      const el = e.target
      if (el.type === 'checkbox' && el.name === CB_NAME.LINE) {
        this.#handleLineToggle(el)
        this.#updateSummary()
      } else if (el.type === 'checkbox' && el.name === CB_NAME.STATION) {
        this.#syncToggleBtnLabel(el)
        this.#updateSummary()
      } else if (el.type === 'checkbox' || el.tagName === 'SELECT') {
        // STEP2 条件（間取り・築年数・賃料）の変更で URL を再計算
        this.#updateSummary()
      }
    })

    // StationSearch が都道府県切替で路線を再描画したときにリセット
    this.#container.addEventListener(EVENT.RAILWAYS_REPLACED, () => {
      this.#updateSummary()
    })
  }

  // ==============================================================
  // 路線チェック → 駅展開
  // ==============================================================

  /**
   * 路線チェックのトグル処理
   * @param {HTMLInputElement} checkbox  路線チェックボックス
   */
  #handleLineToggle(checkbox) {
    const lineItem = checkbox.closest(SELECTOR.stationLineItem)
    if (!lineItem) return

    lineItem.classList.toggle('is-checked', checkbox.checked)

    if (checkbox.checked) {
      this.#expandStations(lineItem, checkbox.value)
    } else {
      this.#collapseStations(lineItem)
    }
  }

  /**
   * 駅一覧を展開表示
   * @param {HTMLElement} lineItem  .station-select__line-item 要素
   * @param {string} lineValue     路線キー
   */
  #expandStations(lineItem, lineValue) {
    // 既に展開済みならスキップ
    if (lineItem.querySelector(SELECTOR.stationStops)) return

    const stops = STATION_STOPS[lineValue]
    const stopsEl = document.createElement('div')
    stopsEl.className = 'station-stops'

    if (stops?.length) {
      stopsEl.innerHTML = this.#buildStopsHTML(lineValue, stops)
    } else {
      stopsEl.innerHTML = `
        <div class="station-stops__all-notice">
          <span aria-hidden="true">🚉</span> この路線の全駅を検索対象にします
        </div>
      `
    }

    lineItem.appendChild(stopsEl)

    // 「すべて選択 / すべて解除」トグルをバインド（イベント委譲外のボタン）
    const toggleBtn = stopsEl.querySelector(SELECTOR.stationStopsToggle)
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.#toggleAllStations(stopsEl, toggleBtn))
    }

    // 次フレームで is-open を付与して CSS transition を走らせる
    requestAnimationFrame(() => stopsEl.classList.add('is-open'))
  }

  /**
   * 駅チェックボックス一覧の HTML を生成
   * @param {string} lineValue  路線キー
   * @param {Array<{name: string, count: number}>} stops  駅データ配列
   * @returns {string}
   */
  #buildStopsHTML(lineValue, stops) {
    const safeLine = escapeHTML(lineValue)

    const stopsHTML = stops
      .map(
        (s) => `
        <label class="station-stops__item">
          <input type="checkbox" name="${CB_NAME.STATION}" value="${safeLine}:${escapeHTML(s.name)}" checked>
          <span class="station-stops__name">${escapeHTML(s.name)}</span>
          <span class="station-stops__count">${s.count.toLocaleString()}件</span>
        </label>`
      )
      .join('')

    // 展開直後は全駅チェック済みなので「すべて解除」を表示
    return `
      <div class="station-stops__header">
        <span class="station-stops__label">駅を選択</span>
        <button type="button" class="station-stops__toggle-all" data-line="${safeLine}">
          すべて解除
        </button>
      </div>
      <div class="station-stops__grid">${stopsHTML}</div>
    `
  }

  /**
   * 駅一覧を閉じる
   * @param {HTMLElement} lineItem
   */
  #collapseStations(lineItem) {
    const stopsEl = lineItem.querySelector(SELECTOR.stationStops)
    if (!stopsEl) return

    stopsEl.classList.remove('is-open')

    // transitionend で除去（多プロパティ対応のため propertyName をチェック）
    const onEnd = (e) => {
      if (e.propertyName !== 'max-height') return
      stopsEl.removeEventListener('transitionend', onEnd)
      stopsEl.remove()
    }
    stopsEl.addEventListener('transitionend', onEnd)

    // transitionend が発火しない場合のフォールバック
    setTimeout(() => {
      if (stopsEl.parentNode) stopsEl.remove()
    }, COLLAPSE_DURATION_MS)
  }

  /**
   * 駅チェック変更時に、同じパネルのトグルボタンラベルを同期
   * @param {HTMLInputElement} checkbox  変更された駅チェックボックス
   */
  #syncToggleBtnLabel(checkbox) {
    const stopsEl = checkbox.closest(SELECTOR.stationStops)
    if (!stopsEl) return

    const toggleBtn = stopsEl.querySelector(SELECTOR.stationStopsToggle)
    if (!toggleBtn) return

    const allChecked = $$(Q.stationAll, stopsEl).every((cb) => cb.checked)
    toggleBtn.textContent = allChecked ? 'すべて解除' : 'すべて選択'
  }

  /**
   * 「すべて選択 / すべて解除」トグル
   * @param {HTMLElement} stopsEl   駅コンテナ
   * @param {HTMLElement} toggleBtn トグルボタン
   */
  #toggleAllStations(stopsEl, toggleBtn) {
    const checkboxes = $$(Q.stationAll, stopsEl)
    const allChecked = checkboxes.every((cb) => cb.checked)
    const newState = !allChecked

    checkboxes.forEach((cb) => {
      cb.checked = newState
    })
    toggleBtn.textContent = newState ? 'すべて解除' : 'すべて選択'

    this.#updateSummary()
  }

  // ==============================================================
  // 選択状況の集計
  // ==============================================================

  /** フローティングバーの選択数を更新 */
  #updateSummary() {
    const lineCheckboxes = $$(Q.lineChecked, this.#container)
    const stationCheckboxes = $$(Q.stationChecked, this.#container)

    const lineCount = lineCheckboxes.length

    // 駅データがある路線は選択中の駅数、ない路線は「全駅」として 1 カウント
    const linesWithoutStops = lineCheckboxes.filter((cb) => {
      const lineItem = cb.closest(SELECTOR.stationLineItem)
      return lineItem && !lineItem.querySelector(Q.stationAll)
    })
    const stationCount = stationCheckboxes.length + linesWithoutStops.length

    // カウント更新
    if (this.#lineCountEl) this.#lineCountEl.textContent = lineCount
    if (this.#stationCountEl) this.#stationCountEl.textContent = stationCount

    // バー表示 / 非表示
    if (this.#summaryBar) {
      this.#summaryBar.hidden = lineCount === 0
    }

    // 検索URLを更新
    this.#updateSearchURL(lineCheckboxes, stationCheckboxes)
  }

  /**
   * 検索ボタンの href を動的に構築
   * フローティングバー + STEP2 内ボタンの両方を同期更新する
   * @param {HTMLInputElement[]} lineCheckboxes     チェック済み路線
   * @param {HTMLInputElement[]} stationCheckboxes  チェック済み駅
   */
  #updateSearchURL(lineCheckboxes, stationCheckboxes) {
    const params = new URLSearchParams()

    // 選択中の路線
    const lines = lineCheckboxes.map((cb) => cb.value)
    if (lines.length) params.set('lines', lines.join(','))

    // 選択中の駅
    const stations = stationCheckboxes.map((cb) => cb.value)
    if (stations.length) params.set('stations', stations.join(','))

    // STEP2 条件 — 賃料
    const rentMin = this.#container.querySelector('select[name="rent_min"]')
    const rentMax = this.#container.querySelector('select[name="rent_max"]')
    if (rentMin?.value) params.set('rent_min', rentMin.value)
    if (rentMax?.value) params.set('rent_max', rentMax.value)

    // STEP2 条件 — 間取り・築年数（複数選択）
    for (const name of ['layout', 'age']) {
      const checked = this.#container.querySelectorAll(`input[name="${name}"]:checked`)
      checked.forEach((cb) => params.append(name, cb.value))
    }

    const query = params.toString()
    const href = `./search.html${query ? '?' + query : ''}`

    // フローティング + STEP2 内ボタンの両方を同期
    if (this.#searchBtn) this.#searchBtn.href = href
    if (this.#searchBtnInline) this.#searchBtnInline.href = href
  }
}
