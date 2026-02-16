/**
 * ローディングアニメーション
 * プログレスバーを表示し、完了時に loadingComplete イベントを発火
 * index.html でのみ使用される（#loading 要素が必要）
 */
import { gsap } from 'gsap'
import { SELECTOR, EVENT, ANIMATION } from '../utils/Config.js'
import { $ } from '../utils/DOMHelper.js'

export default class Loading {
  /** @type {HTMLElement|null} */
  #el
  /** @type {HTMLElement|null} */
  #progress

  constructor() {
    this.#el = $(SELECTOR.loading)
    this.#progress = $(SELECTOR.loadingProgress)

    // ローディング要素がないページでは何もしない
    // ※ loadingComplete の発火は main.js 側で管理
    if (!this.#el) return

    this.#init()
  }

  #init() {
    // GSAP tween で安定したプログレスアニメーション（約1.2秒で100%到達）
    const obj = { value: 0 }
    gsap.to(obj, {
      value: 100,
      duration: ANIMATION.loading.duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (this.#progress) {
          this.#progress.style.width = `${Math.round(obj.value)}%`
        }
      },
      onComplete: () => {
        setTimeout(() => this.#hide(), ANIMATION.loading.hideDelay)
      },
    })
  }

  #hide() {
    gsap.to(this.#el, {
      opacity: 0,
      duration: ANIMATION.loading.fadeDuration,
      ease: 'power2.inOut',
      onComplete: () => {
        this.#el.classList.add('is-hidden')
        this.#el.style.display = 'none'
        document.dispatchEvent(new CustomEvent(EVENT.LOADING_COMPLETE))
      },
    })
  }
}
