/**
 * GSAP ベースのホバーアニメーション
 * イベント委譲方式で動的に追加された要素にも対応
 * タッチデバイスでは無効化
 *
 * CSS で完結できるホバー（nav-item のアイコン拡大等）は header.styl 側で管理し、
 * GSAP が必要な物理演算的アニメーション（scale / boxShadow 等）のみここで定義する
 */
import { gsap } from 'gsap'

/** デフォルトのイージング */
const DEFAULT_EASE = 'power2.out'

/**
 * ホバーアニメーションルール定義
 * 不変データのためモジュールレベルで freeze
 *
 * @typedef {Object} HoverRule
 * @property {string} selector  - CSS セレクタ（closest で照合）
 * @property {Object} enter     - mouseenter 時の GSAP プロパティ
 * @property {Object} leave     - mouseleave 時の GSAP プロパティ（enter の逆）
 * @property {number} duration  - アニメーション秒数
 */
const HOVER_RULES = Object.freeze([
  {
    selector: '.category-card',
    enter: { scale: 1.03 },
    leave: { scale: 1 },
    duration: 0.3,
  },
  {
    selector: '.property-card, .property-row',
    enter: { y: -4, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)' },
    leave: { y: 0, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' },
    duration: 0.3,
  },
  {
    selector: '.btn',
    enter: { scale: 1.05 },
    leave: { scale: 1 },
    duration: 0.2,
  },
  {
    selector: '.header__menu-btn',
    enter: { scale: 1.1, rotation: 90 },
    leave: { scale: 1, rotation: 0 },
    duration: 0.3,
  },
  {
    selector: '.header__logo',
    enter: { scale: 1.05 },
    leave: { scale: 1 },
    duration: 0.3,
  },
])

export default class HoverAnimations {

  constructor() {
    // タッチデバイスではホバー不要
    if (!window.matchMedia('(pointer: fine)').matches) return
    this.#bindDelegatedEvents()
  }

  /**
   * イベント委譲で mouseover / mouseout を一括処理
   * 動的に追加される要素にも自動対応
   */
  #bindDelegatedEvents() {
    document.addEventListener('mouseover', (e) => this.#handlePointer(e, 'enter'))
    document.addEventListener('mouseout', (e) => this.#handlePointer(e, 'leave'))
  }

  /**
   * @param {MouseEvent} e
   * @param {'enter'|'leave'} phase
   */
  #handlePointer(e, phase) {
    for (const rule of HOVER_RULES) {
      const target = e.target.closest(rule.selector)
      if (!target || target.contains(e.relatedTarget)) continue

      gsap.to(target, {
        ...rule[phase],
        duration: rule.duration,
        ease: DEFAULT_EASE,
      })
    }
  }
}
