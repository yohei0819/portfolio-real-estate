/**
 * カーソルフォロワー
 * マウス追従カーソルの表示・ホバー時の拡大
 * タッチデバイスでは無効化
 */
import { gsap } from 'gsap'
import { HOVER_TARGETS, SELECTOR, CURSOR } from '../utils/Config.js'
import { $ } from '../utils/DOMHelper.js'

export default class CursorFollower {
  /** @type {HTMLElement|null} */
  #el

  constructor() {
    this.#el = $(SELECTOR.cursorFollower)
    if (!this.#el) return

    if (!window.matchMedia('(pointer: fine)').matches) {
      this.#el.style.display = 'none'
      return
    }
    this.#init()
  }

  #init() {
    // quickTo は毎フレームの gsap.to() 呼び出しを最適化し、GC負荷を軽減
    const setX = gsap.quickTo(this.#el, 'x', { duration: CURSOR.duration, ease: 'power2.out' })
    const setY = gsap.quickTo(this.#el, 'y', { duration: CURSOR.duration, ease: 'power2.out' })

    document.addEventListener('mousemove', (e) => {
      setX(e.clientX - CURSOR.offset)
      setY(e.clientY - CURSOR.offset)
    })

    // イベント委譲で動的要素にも対応
    // relatedTarget を確認し、同一要素内の子要素間移動でのflickerを防止
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(HOVER_TARGETS)
      if (target && !target.contains(e.relatedTarget)) {
        this.#el.classList.add('is-hover')
      }
    })

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(HOVER_TARGETS)
      if (target && !target.contains(e.relatedTarget)) {
        this.#el.classList.remove('is-hover')
      }
    })
  }
}
