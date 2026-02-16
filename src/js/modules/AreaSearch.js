/**
 * エリア検索・フィルタリング・ソート・ページネーション
 *
 * URLクエリパラメータとサイドバーフォームの両方から
 * 検索条件を読み取り、PropertyData を動的にフィルタ・表示する。
 *
 * 対応パラメータ:
 *   area     … 都道府県キー（例: tokyo）
 *   rent_min … 賃料下限（万円）
 *   rent_max … 賃料上限（万円）
 *   layout   … 間取り（複数指定可）
 *   type     … 物件タイプ（複数指定可）
 *   area_min … 面積下限（㎡）
 *   area_max … 面積上限（㎡）
 *   age      … 築年数上限
 *   feature  … こだわり条件（複数指定可）
 *   lines    … 路線キー（カンマ区切り、station.html から遷移時）
 *   stations … 路線:駅名（カンマ区切り、station.html から遷移時）
 *   sort     … ソートキー
 *   page     … ページ番号
 *
 * リファクタリング:
 *   - 駅マッチングロジック → StationMatcher.js に分離
 *   - フィルタ/ソート純粋関数 → SearchFilter.js に分離
 *   - 検索結果カードHTML → CardBuilder.js に移動
 */

import { gsap } from 'gsap'
import PREFECTURES from '../data/PrefectureData.js'
import PROPERTIES from '../data/PropertyData.js'
import { updatePageMeta } from '../utils/MetaUpdater.js'
import { SITE, SELECTOR, SEARCH, EVENT } from '../utils/Config.js'
import { $, buildRegionOptions, escapeHTML } from '../utils/DOMHelper.js'
import { getFavorites } from '../utils/StorageHelper.js'
import { buildPropertyRow } from '../utils/CardBuilder.js'
import { CURRENT_YEAR, extractYear } from '../data/PropertyFactory.js'
import { extractStationName, resolveLineKeys, getLineLabel } from '../utils/StationMatcher.js'
import { parseFilterParams, filterProperties, sortProperties, getAll } from '../utils/SearchFilter.js'

// ----------------------------------------------------------------
// 定数
// ----------------------------------------------------------------
const { perPage: PER_PAGE, checkboxNames: CHECKBOX_NAMES } = SEARCH

/** ソートのデフォルト値 — URL から省略される */
const DEFAULT_SORT = 'recommended'

// ----------------------------------------------------------------
// 物件データ構築
// ----------------------------------------------------------------

/**
 * buildDate 文字列 (例: "2023年6月") から築年数を計算
 * @param {string} buildDate
 * @returns {number}
 */
function calcAge(buildDate) {
  const year = extractYear(buildDate)
  return year === 0 ? 99 : CURRENT_YEAR - year
}

/**
 * 物件データを ID 付きの扱いやすい配列に変換し、築年数・駅名をプリコンピュート
 * @returns {Object[]}
 */
function buildPropertyList() {
  return Object.entries(PROPERTIES).map(([id, p]) => {
    const stationName = extractStationName(p.station)
    return {
      id: Number(id),
      ...p,
      _age: calcAge(p.buildDate),
      _stationName: stationName,
      _lineKeys: resolveLineKeys(stationName),
    }
  })
}

// ----------------------------------------------------------------
// メインクラス
// ----------------------------------------------------------------

export default class AreaSearch {
  /** @type {Object[]} 全物件（ID・_age 付き） */
  #allProperties

  /** @type {Object[]} フィルタ後の物件配列（ソート前の状態を保持） */
  #filtered = []

  /** @type {number} 現在のページ番号 (1-based) */
  #currentPage = 1

  /** @type {URLSearchParams} 現在の検索パラメータ */
  #params

  // ── キャッシュ済み DOM 要素 ──
  /** @type {HTMLElement|null} */ #elItems
  /** @type {HTMLElement|null} */ #elEmpty
  /** @type {HTMLElement|null} */ #elPagination
  /** @type {HTMLElement|null} */ #elCount
  /** @type {HTMLSelectElement|null} */ #elSort
  /** @type {HTMLFormElement|null} */ #elForm

  /** @type {boolean} 初期描画完了フラグ（ページネーション後のアニメーション制御用） */
  #initialized = false

  constructor() {
    this.#allProperties = buildPropertyList()
    this.#params = new URLSearchParams(location.search)
    this.#cacheElements()

    if (this.#elItems) this.#init()
  }

  // ==============================================================
  // 初期化
  // ==============================================================

  /** DOM 要素をキャッシュ */
  #cacheElements() {
    this.#elItems      = $(SELECTOR.propertyItems)
    this.#elEmpty      = $(SELECTOR.propertyEmpty)
    this.#elPagination = $(SELECTOR.pagination)
    this.#elCount      = $(SELECTOR.propertyListCount)
    this.#elSort       = $(SELECTOR.sortSelect)
    this.#elForm       = $(SELECTOR.filterForm)
  }

  #init() {
    this.#populateAreaSelect()
    this.#restoreFormState()
    this.#bindEvents()
    this.#applyFilters()
    this.#initialized = true
  }

  // ==============================================================
  // エリアセレクト
  // ==============================================================

  /** サイドバーのエリア select に都道府県オプションを動的生成 */
  #populateAreaSelect() {
    const select = this.#elForm?.querySelector('[name="area"]')
    if (!select) return

    const prefList = Object.entries(PREFECTURES).map(([key, p]) => ({
      key, name: p.name, region: p.region,
    }))
    select.insertAdjacentHTML('beforeend', buildRegionOptions(prefList))
  }

  // ==============================================================
  // フォーム状態の復元・イベントバインド
  // ==============================================================

  /**
   * URL パラメータからフォーム要素の値を復元
   *
   * [BUG FIX] popstate 時にもUI状態を完全に同期するため、
   * パラメータに存在しない項目はデフォルト値にリセットする。
   * 以前はパラメータ未指定のチェックボックス / セレクトがリセットされず、
   * フィルタ結果とフォーム表示がデシンクしていた。
   */
  #restoreFormState() {
    if (!this.#elForm) return

    // select 要素 — パラメータがなければデフォルト（空値）にリセット
    for (const sel of this.#elForm.querySelectorAll('select')) {
      const val = this.#params.get(sel.name)
      sel.value = val || ''
    }

    // checkbox — パラメータに含まれるもののみチェック、それ以外はクリア
    for (const name of CHECKBOX_NAMES) {
      const vals = getAll(this.#params, name)
      for (const cb of this.#elForm.querySelectorAll(`input[name="${name}"]`)) {
        cb.checked = vals.includes(cb.value)
      }
    }

    // ソート
    if (this.#elSort) {
      this.#elSort.value = this.#params.get('sort') || DEFAULT_SORT
    }

    // ページ
    this.#currentPage = Math.max(1, Number(this.#params.get('page')) || 1)
  }

  /** フォーム submit・ソート変更・ページネーションクリックを一括バインド */
  #bindEvents() {
    // フォーム submit → JS フィルタ
    this.#elForm?.addEventListener('submit', (e) => {
      e.preventDefault()
      this.#currentPage = 1
      this.#syncParamsFromForm()
      this.#applyFilters()
      this.#dispatchSearchFilter()
    })

    // ソート変更（デフォルト値 'recommended' は URL から省略）
    this.#elSort?.addEventListener('change', () => {
      const sortVal = this.#elSort.value
      if (sortVal && sortVal !== DEFAULT_SORT) {
        this.#params.set('sort', sortVal)
      } else {
        this.#params.delete('sort')
      }
      this.#replaceURL()
      this.#render()
    })

    // ページネーション — イベント委譲
    this.#elPagination?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-page]')
      if (!btn) return
      this.#currentPage = Number(btn.dataset.page)
      this.#params.set('page', String(this.#currentPage))
      this.#replaceURL()
      this.#render()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    // ブラウザの戻る・進むで URL が変わった際にフィルタ状態を同期
    window.addEventListener('popstate', () => {
      this.#params = new URLSearchParams(location.search)
      this.#restoreFormState()
      this.#applyFilters()
    })
  }

  /** フォームの現在値を #params に同期し、URL を更新 */
  #syncParamsFromForm() {
    if (!this.#elForm) return

    const fd = new FormData(this.#elForm)
    const newParams = new URLSearchParams()

    for (const [key, val] of fd.entries()) {
      if (val) newParams.append(key, /** @type {string} */ (val))
    }

    // sort は form 外なので引き継ぐ
    const sort = this.#elSort?.value
    if (sort && sort !== DEFAULT_SORT) newParams.set('sort', sort)

    // 路線・駅パラメータは form 外なので引き継ぐ（station.html からの遷移）
    const lines    = this.#params.get('lines')
    const stations = this.#params.get('stations')
    if (lines)    newParams.set('lines', lines)
    if (stations) newParams.set('stations', stations)

    this.#params = newParams
    this.#replaceURL()
  }

  /** URL を replaceState で更新（ページリロードなし） */
  #replaceURL() {
    // page=1 は冗長なので削除
    if (this.#params.get('page') === '1') this.#params.delete('page')

    const qs = this.#params.toString()
    const url = `${location.pathname}${qs ? '?' + qs : ''}`
    history.replaceState(null, '', url)
  }

  // ==============================================================
  // フィルタリング
  // ==============================================================

  /** 現在の #params に基づいて物件をフィルタし、描画をトリガー */
  #applyFilters() {
    const filters = parseFilterParams(this.#params)
    this.#filtered = filterProperties(this.#allProperties, filters)
    this.#updateMeta()
    this.#render()
  }

  /**
   * ユーザー操作による検索実行時のみ検索条件イベントを発火
   * （初期ロード・popstate での再適用時は発火しない）
   */
  #dispatchSearchFilter() {
    const qs = this.#params.toString()
    if (qs) {
      document.dispatchEvent(
        new CustomEvent(EVENT.SEARCH_FILTER, { detail: { query: qs } }),
      )
    }
  }

  // ==============================================================
  // 描画
  // ==============================================================

  /** フィルタ + ソート結果をページネーション込みで描画 */
  #render() {
    const sortKey    = this.#params.get('sort') || DEFAULT_SORT
    const sorted     = sortProperties(this.#filtered, sortKey)
    const total      = sorted.length
    const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))

    // [BUG FIX] ページ番号を範囲内に補正し、URL にも反映
    // 以前はフィルタ結果の減少で無効になったページ番号がURLに残っていた
    if (this.#currentPage > totalPages) {
      this.#currentPage = totalPages
      if (this.#currentPage <= 1) {
        this.#params.delete('page')
      } else {
        this.#params.set('page', String(this.#currentPage))
      }
      this.#replaceURL()
    }

    const start     = (this.#currentPage - 1) * PER_PAGE
    const pageItems = sorted.slice(start, start + PER_PAGE)

    this.#updateCount(total)
    this.#renderCards(pageItems)
    this.#toggleEmpty(total === 0)
    this.#renderPagination(totalPages)
  }

  /** h1 の件数表示を更新 */
  #updateCount(total) {
    if (!this.#elCount) return

    const area = this.#params.get('area')
    const pref = area && PREFECTURES[area]
    const lineLabel = getLineLabel(this.#params.get('lines'))

    let areaLabel
    if (lineLabel) {
      areaLabel = lineLabel
    } else if (pref) {
      areaLabel = pref.name
    } else {
      areaLabel = '全国'
    }

    this.#elCount.innerHTML =
      `${escapeHTML(areaLabel)}の賃貸物件 <span>${total.toLocaleString()}</span>件`
  }

  /** 物件カードの HTML を生成して挿入 */
  #renderCards(items) {
    if (!this.#elItems) return

    if (items.length === 0) {
      this.#elItems.innerHTML = ''
      return
    }

    const favIds = new Set(getFavorites())
    this.#elItems.innerHTML = items.map((p) => buildPropertyRow(p, favIds)).join('')

    // 初期描画後（ページネーション・ソート変更・再検索時）は
    // ScrollAnimations が再適用されないため、動的カードを手動でアニメーション表示
    if (this.#initialized) {
      const newCards = this.#elItems.querySelectorAll('.property-row')
      gsap.fromTo(newCards,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
      )
    }
  }

  /** 空状態メッセージの表示切替 */
  #toggleEmpty(isEmpty) {
    if (this.#elEmpty) this.#elEmpty.hidden = !isEmpty
  }

  // ==============================================================
  // ページネーション
  // ==============================================================

  /** ページネーション UI を生成 */
  #renderPagination(totalPages) {
    if (!this.#elPagination) return

    if (totalPages <= 1) {
      this.#elPagination.innerHTML = ''
      return
    }

    const current = this.#currentPage
    const parts = []

    // 前へ
    if (current > 1) {
      parts.push(
        `<button class="pagination__item pagination__item--prev" data-page="${current - 1}">← 前へ</button>`,
      )
    }

    // ページ番号（省略記号含む）
    for (const p of this.#calcPageRange(current, totalPages)) {
      if (p === '...') {
        parts.push('<span class="pagination__item pagination__ellipsis">...</span>')
      } else if (p === current) {
        parts.push(`<button class="pagination__item is-active" aria-current="page" data-page="${p}">${p}</button>`)
      } else {
        parts.push(`<button class="pagination__item" data-page="${p}">${p}</button>`)
      }
    }

    // 次へ
    if (current < totalPages) {
      parts.push(
        `<button class="pagination__item pagination__item--next" data-page="${current + 1}">次へ →</button>`,
      )
    }

    this.#elPagination.innerHTML = parts.join('')
  }

  /**
   * ページ番号の配列を計算（省略記号含む、最大 7 要素）
   * @param {number} current  現在のページ
   * @param {number} total    総ページ数
   * @returns {(number|string)[]}
   */
  #calcPageRange(current, total) {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }

    const pages = [1]
    if (current > 3) pages.push('...')

    const start = Math.max(2, current - 1)
    const end   = Math.min(total - 1, current + 1)
    for (let i = start; i <= end; i++) pages.push(i)

    if (current < total - 2) pages.push('...')
    pages.push(total)
    return pages
  }

  // ==============================================================
  // メタ情報
  // ==============================================================

  /** エリア指定または路線検索時にページメタを更新 */
  #updateMeta() {
    const area = this.#params.get('area')
    const lineLabel = getLineLabel(this.#params.get('lines'))

    // 路線検索の場合
    if (lineLabel) {
      const title = `${lineLabel}の賃貸物件一覧｜${SITE.name}`
      const description = `${lineLabel}沿線の賃貸マンション・アパート物件一覧。${SITE.name}で理想の住まいを探しましょう。`

      updatePageMeta({
        title,
        description,
        ogTitle: title,
        ogDescription: `${lineLabel}沿線の賃貸マンション・アパート物件一覧`,
        canonical: `${SITE.domain}/search.html?lines=${this.#params.get('lines') || ''}`,
        breadcrumb: [
          { label: SITE.tagline, href: './' },
          { label: '沿線・駅から探す', href: './station.html' },
          { label: `${lineLabel}の賃貸物件` },
        ],
      })
      return
    }

    // エリア検索の場合
    if (!area || !PREFECTURES[area]) return

    const pref = PREFECTURES[area]
    const title = `${pref.name}の賃貸物件一覧｜${SITE.name}`
    const description =
      `${pref.name}の賃貸マンション・アパート物件一覧。${pref.name}の賃貸情報は${SITE.name}。`

    updatePageMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: `${pref.name}の賃貸マンション・アパート物件一覧`,
      canonical: `${SITE.domain}/search.html?area=${area}`,
      breadcrumb: [
        { label: SITE.tagline, href: './' },
        { label: pref.region, href: '#' },
        { label: `${pref.name}の賃貸物件` },
      ],
    })
  }
}
