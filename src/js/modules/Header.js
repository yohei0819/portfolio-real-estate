/**
 * ヘッダー制御
 * スクロール方向に応じてヘッダーを表示/非表示
 */
import { SELECTOR, SCROLL } from '../utils/Config.js'
import { $ } from '../utils/DOMHelper.js'

export default class Header {
  /** @type {HTMLElement|null} */
  #el
  /** @type {number} */
  #lastScrollY = 0
  /** @type {boolean} */
  #ticking = false

  constructor() {
    this.#el = $(SELECTOR.header)
    if (this.#el) this.#init()
  }

  #init() {
    window.addEventListener('scroll', () => this.#onScrollThrottled(), { passive: true })
  }

  #onScrollThrottled() {
    if (!this.#ticking) {
      requestAnimationFrame(() => {
        this.#update()
        this.#ticking = false
      })
      this.#ticking = true
    }
  }

  #update() {
    // iOS bounce scroll で負値になるケースをガード
    const currentScrollY = Math.max(0, window.scrollY)

    if (currentScrollY > this.#lastScrollY && currentScrollY > SCROLL.headerThreshold) {
      this.#el.classList.add('is-hidden')
    } else {
      this.#el.classList.remove('is-hidden')
    }

    this.#lastScrollY = currentScrollY
  }
}
