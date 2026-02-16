/**
 * ヒーロースライダー
 * 自動再生・インジケータークリックによるスライド切替
 */
import { SELECTOR, SLIDER } from '../utils/Config.js'
import { $$ } from '../utils/DOMHelper.js'

export default class HeroSlider {
  /** @type {HTMLElement[]} */
  #slides
  /** @type {HTMLElement[]} */
  #indicators
  /** @type {number} */
  #currentIndex = 0
  /** @type {number|null} */
  #interval = null

  constructor() {
    this.#slides = $$(SELECTOR.heroSlide)
    this.#indicators = $$(SELECTOR.heroIndicator)

    // スライドが2枚以上ある場合のみ自動再生
    if (this.#slides.length > 1) this.#init()
  }

  #init() {
    this.#startAutoPlay()

    // タブ非表示時はスライダーを停止し、復帰時に再開
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.#stopAutoPlay()
      } else {
        this.#startAutoPlay()
      }
    })

    this.#indicators.forEach((indicator) => {
      indicator.addEventListener('click', () => {
        const index = parseInt(indicator.dataset.slide, 10)
        if (!isNaN(index)) {
          this.#goTo(index)
          this.#startAutoPlay() // クリック後にタイマーリセット
        }
      })
    })
  }

  #goTo(index) {
    if (index < 0 || index >= this.#slides.length) return
    if (index === this.#currentIndex) return

    this.#slides[this.#currentIndex].classList.remove('is-active')
    this.#indicators[this.#currentIndex]?.classList.remove('is-active')
    this.#slides[this.#currentIndex].setAttribute('aria-hidden', 'true')

    this.#currentIndex = index
    this.#slides[this.#currentIndex].classList.add('is-active')
    this.#indicators[this.#currentIndex]?.classList.add('is-active')
    this.#slides[this.#currentIndex].removeAttribute('aria-hidden')
  }

  #next() {
    const nextIndex = (this.#currentIndex + 1) % this.#slides.length
    this.#goTo(nextIndex)
  }

  #startAutoPlay() {
    this.#stopAutoPlay()
    this.#interval = setInterval(() => this.#next(), SLIDER.interval)
  }

  #stopAutoPlay() {
    if (this.#interval) {
      clearInterval(this.#interval)
      this.#interval = null
    }
  }
}
