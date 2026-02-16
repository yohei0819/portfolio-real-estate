/**
 * モバイルメニュー
 * ハンバーガーメニューの開閉・オーバーレイ・ESCキー対応
 * aria-expanded を同期して管理
 *
 * スクロールロックは ScrollLock ユーティリティで一元管理し、
 * DrawerController との競合を防止する
 */
import { SELECTOR } from '../utils/Config.js'
import { $ } from '../utils/DOMHelper.js'
import { acquireScrollLock, releaseScrollLock } from '../utils/ScrollLock.js'

export default class MobileMenu {
  /** @type {HTMLElement|null} */
  #btn
  /** @type {HTMLElement|null} */
  #nav

  constructor() {
    this.#btn = $(SELECTOR.menuBtn)
    this.#nav = $(SELECTOR.mobileNav)
    if (this.#btn && this.#nav) this.#init()
  }

  /** Escape キーでメニューを閉じる（アロー関数でインスタンスにバインド） */
  #handleKeydown = (e) => {
    if (e.key === 'Escape') {
      this.#close()
      this.#btn.focus()
    }
  }

  #init() {
    // 初期状態を設定
    this.#btn.setAttribute('aria-expanded', 'false')

    this.#btn.addEventListener('click', () => this.#toggle())

    // オーバーレイ部分 or ナビ内リンクのクリックで閉じる（イベント委譲）
    this.#nav.addEventListener('click', (e) => {
      if (e.target === this.#nav || e.target.closest('a')) this.#close()
    })
  }

  #toggle() {
    this.#nav.classList.contains('is-open') ? this.#close() : this.#open()
  }

  #open() {
    this.#nav.classList.add('is-open')
    this.#syncUI(true)
    acquireScrollLock()
    document.addEventListener('keydown', this.#handleKeydown)
  }

  #close() {
    if (!this.#nav.classList.contains('is-open')) return
    this.#nav.classList.remove('is-open')
    this.#syncUI(false)
    document.removeEventListener('keydown', this.#handleKeydown)
    releaseScrollLock()
  }

  /**
   * ボタンのaria属性・クラスを現在の開閉状態に同期
   * @param {boolean} isOpen
   */
  #syncUI(isOpen) {
    this.#btn.classList.toggle('is-active', isOpen)
    this.#btn.setAttribute('aria-expanded', String(isOpen))
    this.#btn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く')
  }
}
