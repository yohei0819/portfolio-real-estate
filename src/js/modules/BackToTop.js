/**
 * トップへ戻るボタン
 * スクロール量に応じて表示/非表示を切替
 */
import { SELECTOR, SCROLL } from '../utils/Config.js'
import { $ } from '../utils/DOMHelper.js'

export default class BackToTop {
  /** @type {HTMLElement|null} */
  #btn
  /** @type {boolean} */
  #ticking = false

  constructor() {
    this.#btn = $(SELECTOR.backToTop)
    if (this.#btn) this.#init()
  }

  #init() {
    // rAFスロットルでスクロール表示制御
    window.addEventListener(
      'scroll',
      () => {
        if (!this.#ticking) {
          requestAnimationFrame(() => {
            this.#btn.classList.toggle('is-visible', window.scrollY > SCROLL.backToTopThreshold)
            this.#ticking = false
          })
          this.#ticking = true
        }
      },
      { passive: true }
    )

    this.#btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }
}
