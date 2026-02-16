/**
 * テキスト文字ごとの出現アニメーション
 * .section__title のテキストを1文字ずつ span に分解し、スクロールで順にフェードイン
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EVENT, SELECTOR } from '../utils/Config.js'
import { $$ } from '../utils/DOMHelper.js'

export default class TextAnimation {
  /** @type {boolean} */
  #initialized = false

  constructor() {
    document.addEventListener(EVENT.LOADING_COMPLETE, () => this.#init())
  }

  #init() {
    if (this.#initialized) return
    this.#initialized = true

    const titles = $$(SELECTOR.sectionTitle)
    titles.forEach((title) => {
      const text = title.textContent || ''
      if (!text.trim()) return

      // テキストノードだけを分割（::after 疑似要素は保持される）
      title.textContent = ''

      text.split('').forEach((char) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        span.style.transform = 'translateY(20px)'
        title.appendChild(span)
      })

      ScrollTrigger.create({
        trigger: title,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(title.querySelectorAll('span'), {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.5,
            ease: 'power3.out',
          })
        },
        once: true,
      })
    })
  }
}
