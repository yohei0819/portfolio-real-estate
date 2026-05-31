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
    this.#initMenuDropdown()
  }

  /**
   * PCナビのメニュードロップダウン制御
   * クリックで開閉し aria-expanded を同期。
   * 外側クリック・Escape・フォーカス離脱で閉じる。
   * （マウスホバー／キーボードフォーカス時の表示は CSS 側で処理）
   */
  #initMenuDropdown() {
    const menu = this.#el.querySelector('.header__nav-menu')
    const btn = menu?.querySelector('.header__nav-item--menu')
    if (!menu || !btn) return

    const setExpanded = (open) => btn.setAttribute('aria-expanded', String(open))

    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true'
      setExpanded(!open)
    })

    // 外側クリックで閉じる
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) setExpanded(false)
    })

    // Escape で閉じてトリガーにフォーカスを戻す
    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setExpanded(false)
        btn.focus()
      }
    })

    // フォーカスがメニュー外へ移ったら閉じる
    menu.addEventListener('focusout', (e) => {
      if (!menu.contains(e.relatedTarget)) setExpanded(false)
    })
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
