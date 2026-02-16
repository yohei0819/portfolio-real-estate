/**
 * ページ遷移
 * 内部リンク・フォーム送信時にフェードトランジションを実行
 */
import { gsap } from 'gsap'
import { SELECTOR, ANIMATION } from '../utils/Config.js'
import { $ } from '../utils/DOMHelper.js'

/** 外部リンク・特殊プロトコルの判定用正規表現 */
const EXTERNAL_PATTERN = /^(?:#|https?:\/\/|\/\/|mailto:|tel:|javascript:|data:|blob:)/i

export default class PageTransition {
  /** @type {HTMLElement|null} */
  #el
  /** @type {HTMLElement|null} */
  #layer
  /** @type {boolean} */
  #isNavigating = false

  constructor() {
    this.#el = $(SELECTOR.pageTransition)
    this.#layer = this.#el?.querySelector(SELECTOR.pageTransitionLayer)
    if (this.#el && this.#layer) this.#init()
  }

  #init() {
    this.#bindLinks()
    this.#bindForms()
    this.#handlePageShow()
  }

  /**
   * ブラウザの戻る/進むボタンで再表示された際にレイヤーをリセット
   * bfcacheから復元された場合、トランジションレイヤーが覆ったままになるのを防止
   */
  #handlePageShow() {
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        // bfcacheからの復元 → レイヤーを即座に非表示
        gsap.set(this.#layer, { scaleY: 0 })
        this.#isNavigating = false
      }
    })

    // 初回ページ読み込み時もレイヤーをリセット（別ページからの遷移後）
    gsap.set(this.#layer, { scaleY: 0 })
  }

  /** イベント委譲で内部リンクのクリック遷移を管理 */
  #bindLinks() {
    document.addEventListener('click', (e) => {
      // 修飾キー付きクリック（新しいタブで開く等）はブラウザのデフォルト動作に任せる
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return

      const link = e.target.closest('a[href]')
      if (!link) return

      // target="_blank" や disabled リンクはスキップ
      if (link.target === '_blank' || link.getAttribute('aria-disabled') === 'true') return

      const href = link.getAttribute('href')
      if (this.#isInternalLink(href)) {
        e.preventDefault()
        this.#navigateTo(href)
      }
    })
  }

  /** フォーム送信もトランジション対応 */
  #bindForms() {
    document.addEventListener('submit', (e) => {
      // 既に preventDefault されているフォーム（AreaSearch の JS フィルタ等）はスキップ
      if (e.defaultPrevented) return

      const form = e.target
      if (!(form instanceof HTMLFormElement)) return

      const action = form.getAttribute('action')
      if (action && this.#isInternalLink(action)) {
        e.preventDefault()
        const formData = new FormData(form)
        const params = new URLSearchParams(formData).toString()
        const url = params ? `${action}?${params}` : action
        this.#navigateTo(url)
      }
    })
  }

  /**
   * 内部リンクかどうか判定
   * 外部URL・ハッシュリンク・特殊プロトコル（mailto, tel, blob 等）を除外
   * @param {string} href
   * @returns {boolean}
   */
  #isInternalLink(href) {
    if (!href) return false
    return !EXTERNAL_PATTERN.test(href)
  }

  /**
   * トランジション付きページ遷移
   * @param {string} url
   */
  #navigateTo(url) {
    if (this.#isNavigating) return
    this.#isNavigating = true

    gsap.to(this.#layer, {
      scaleY: 1,
      duration: ANIMATION.transition.duration,
      ease: 'power4.inOut',
      transformOrigin: 'bottom',
      onComplete: () => {
        window.location.href = url
      },
    })
  }
}
