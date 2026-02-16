/**
 * アプリケーション設定・定数
 * マジックストリングの一元管理で保守性を向上
 *
 * 新機能追加時はここに設定を集約してください
 */

/** サイト基本情報 */
export const SITE = {
  name: 'ホームナビ',
  tagline: '賃貸のホームナビ',
  domain: 'https://homenavi.example.com',
}

/** ページ種別 */
export const PAGE = {
  INDEX: 'index',
  SEARCH: 'search',
  PROPERTY: 'property',
  STATION: 'station',
}

/** DOM セレクタ（JS モジュールが参照するキー要素） */
export const SELECTOR = {
  // 共通
  header: '#header',
  menuBtn: '#menuBtn',
  mobileNav: '#mobileNav',
  pageTransition: '#pageTransition',
  pageTransitionLayer: '.page-transition__layer',
  cursorFollower: '#cursorFollower',
  backToTop: '#backToTop',
  loading: '#loading',
  loadingProgress: '#loadingProgress',

  // アニメーション
  fadeIn: '.js-fade-in',
  sectionTitle: '.section__title',
  section: '.section',

  // ヒーロー
  hero: '.hero',
  heroContent: '.hero__content',
  heroTitle: '.hero__title',
  heroSubtitle: '.hero__subtitle',
  heroSearch: '.hero__search',
  heroSlide: '.hero__slide',
  heroIndicator: '.hero__indicator',

  // 検索
  propertyListCount: '#propertyCount',
  propertyRowAddress: '.property-row__address',
  propertyRow: '.property-row',
  propertyItems: '#propertyItems',
  propertyEmpty: '#propertyEmpty',
  sortSelect: '#sortSelect',
  filterForm: '.sidebar__form',
  pagination: '#pagination',

  // 物件詳細
  detailTitle: '.detail__title',

  // 沿線・駅
  stationSelect: '.station-select',
  stationTitle: '.station-select__title',
  stationStepBody: '.station-select__step-body',
  stationStep: '.station-select__step',
  stationLineItem: '.station-select__line-item',
  stationStops: '.station-stops',
  stationStopsToggle: '.station-stops__toggle-all',
  conditionSection: '.condition-section',
  prefectureSelect: '#prefectureSelect',
  stationSummary: '#stationSummary',
  stationSearchBtn: '#stationSearchBtn',
  stationSearchBtnInline: '[data-station-search]',
}

/** カスタムイベント名 */
export const EVENT = {
  LOADING_COMPLETE: 'loadingComplete',
  PAGE_TRANSITION: 'pageTransition',
  RAILWAYS_REPLACED: 'railways:replaced',
  // 将来の拡張用
  FAVORITE_TOGGLE: 'favorite:toggle',
  RECENTLY_VIEWED: 'recentlyViewed:add',
  SEARCH_FILTER: 'search:filter',
}

/** アニメーション設定 */
export const ANIMATION = {
  fadeIn: { y: 40, duration: 0.8 },
  stagger: { duration: 0.6, stagger: 0.1 },
  transition: { duration: 0.5 },
  loading: { duration: 1.2, hideDelay: 200, fadeDuration: 0.5 },
}

/** スクロール閾値 */
export const SCROLL = {
  headerThreshold: 100,   // ヘッダー非表示になるスクロール量
  backToTopThreshold: 400, // トップへ戻るボタンの表示閾値
}

/** カーソルフォロワー設定 */
export const CURSOR = {
  /** カーソル要素の半径（px）— DOM 要素サイズの半分 */
  offset: 10,
  /** 追従アニメーション秒数 */
  duration: 0.3,
}

/** ヒーロースライダー設定 */
export const SLIDER = {
  interval: 5000, // 自動再生間隔（ms）
}

/** ホバーアニメーション対象セレクタ */
export const HOVER_TARGETS =
  'a, button, .category-card, .property-card, .property-row, .info-card, .support-card'

/** カードグリッドセレクタ */
export const CARD_GRIDS = '.category-grid, .info-grid, .support-grid, .area-grid'

/** 検索・フィルタリング設定 */
export const SEARCH = {
  /** 1ページあたりの表示件数 */
  perPage: 10,

  /**
   * こだわり条件キー → PropertyData.features 内の照合文字列
   * HTML の checkbox value と PropertyData の features[] をつなぐ
   */
  featureMap: {
    parking:      '駐車場',
    pet:          'ペット可',
    autolock:     'オートロック',
    bath_toilet:  'バス・トイレ別',
    aircon:       'エアコン',
    '2f_above':   '2階以上',
    corner:       '角部屋',
    flooring:     'フローリング',
    delivery_box: '宅配ボックス',
    internet:     'インターネット',
  },

  /**
   * 物件タイプキー → PropertyData.type の日本語ラベル
   * HTML の checkbox value と PropertyData の type をつなぐ
   */
  typeMap: {
    mansion:    'マンション',
    apartment:  'アパート',
    house:      '一戸建て',
    maisonette: 'メゾネット',
  },

  /** URL パラメータから復元するチェックボックスの name 一覧 */
  checkboxNames: ['layout', 'type', 'age', 'feature'],
}

/** ローカルストレージキー（将来の拡張用） */
export const STORAGE_KEY = {
  favorites: 'homenavi_favorites',
  recentlyViewed: 'homenavi_recently_viewed',
  searchHistory: 'homenavi_search_history',
}
