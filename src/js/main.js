// ==========================================
// メインエントリポイント
// モジュールレジストリパターンで拡張性と保守性を確保
// ==========================================

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { detectPage } from './utils/DOMHelper.js'
import { PAGE, EVENT } from './utils/Config.js'

gsap.registerPlugin(ScrollTrigger)

// ── 全ページ共通モジュール（静的インポート） ──
import Header from './modules/Header.js'
import MobileMenu from './modules/MobileMenu.js'
import ScrollAnimations from './modules/ScrollAnimations.js'
import PageTransition from './modules/PageTransition.js'
import BackToTop from './modules/BackToTop.js'
import CursorFollower from './modules/CursorFollower.js'
import HoverAnimations from './modules/HoverAnimations.js'
import TextAnimation from './modules/TextAnimation.js'
import FavoriteManager from './modules/FavoriteManager.js'
import RecentlyViewedManager from './modules/RecentlyViewedManager.js'
import SearchHistoryManager from './modules/SearchHistoryManager.js'

/** 全ページ共通モジュール */
const COMMON_MODULES = [
  Header,
  MobileMenu,
  ScrollAnimations,
  PageTransition,
  BackToTop,
  CursorFollower,
  HoverAnimations,
  TextAnimation,
  FavoriteManager,
  RecentlyViewedManager,
  SearchHistoryManager,
]

/**
 * ページ固有モジュールの動的インポート定義
 * 新しいページやモジュールを追加する際はここにエントリを追加するだけで済む
 *
 * @type {Record<string, () => Promise<Array<new () => any>>>}
 */
const PAGE_MODULES = {
  [PAGE.INDEX]: async () => {
    const [{ default: Loading }, { default: HeroSlider }, { default: NewProperties }] = await Promise.all([
      import('./modules/Loading.js'),
      import('./modules/HeroSlider.js'),
      import('./modules/NewProperties.js'),
    ])
    return [Loading, HeroSlider, NewProperties]
  },

  [PAGE.SEARCH]: async () => {
    const { default: AreaSearch } = await import('./modules/AreaSearch.js')
    return [AreaSearch]
  },

  [PAGE.PROPERTY]: async () => {
    const { default: PropertyLoader } = await import('./modules/PropertyLoader.js')
    return [PropertyLoader]
  },

  [PAGE.STATION]: async () => {
    const [{ default: LineSelector }, { default: StationSearch }] = await Promise.all([
      import('./modules/LineSelector.js'),
      import('./modules/StationSearch.js'),
    ])
    return [LineSelector, StationSearch]
  },
}

// ==========================================
// 初期化
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  const page = detectPage()

  // ── 共通モジュールの一括初期化 ──
  for (const Module of COMMON_MODULES) new Module()

  // ── ページ固有モジュールの動的初期化 ──
  const loader = PAGE_MODULES[page]
  if (loader) {
    const modules = await loader()
    for (const Module of modules) new Module()
  }

  // index.html 以外はローディング画面が存在しないため
  // ScrollAnimations / TextAnimation が待機する loadingComplete を即座に発火
  if (page !== PAGE.INDEX) {
    requestAnimationFrame(() => {
      document.dispatchEvent(new CustomEvent(EVENT.LOADING_COMPLETE))
    })
  }
})
