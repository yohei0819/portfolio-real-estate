/**
 * 画像ギャラリー用ライトボックス
 *
 * 物件詳細ページの `.detail__gallery` 内の写真ボタンをクリックすると
 * 拡大モーダルを表示する。キーボード操作（←/→/ESC）・スワイプ・
 * オーバーレイクリックに対応し、開閉時はスクロールロックとフォーカス管理を行う。
 *
 * ギャラリー項目のデータは DOM（背景グラデーションとラベル）から読み取るため、
 * 描画ロジック（PropertyLoader）とは疎結合に保たれている。
 */

import { $, $$ } from '../utils/DOMHelper.js'
import { acquireScrollLock, releaseScrollLock } from '../utils/ScrollLock.js'

/** スワイプと判定する最小移動量（px） */
const SWIPE_THRESHOLD = 50

export default class Lightbox {
  /** @type {HTMLElement|null} */ #gallery
  /** @type {HTMLElement|null} */ #root = null
  /** @type {HTMLElement|null} */ #imageEl = null
  /** @type {HTMLElement|null} */ #captionEl = null
  /** @type {HTMLElement|null} */ #counterEl = null
  /** @type {{ background: string, label: string }[]} */ #items = []
  /** @type {number} */ #index = 0
  /** @type {Element|null} */ #lastFocused = null
  /** @type {number} */ #touchStartX = 0

  constructor() {
    this.#gallery = $('.detail__gallery')
    if (!this.#gallery) return

    this.#build()
    this.#bindGallery()
    this.#bindControls()
  }

  // ── モーダル DOM の構築（body 直下に1つだけ生成） ──

  #build() {
    const root = document.createElement('div')
    root.className = 'lightbox'
    root.setAttribute('role', 'dialog')
    root.setAttribute('aria-modal', 'true')
    root.setAttribute('aria-label', '物件写真ギャラリー')
    root.hidden = true
    root.innerHTML = `
      <div class="lightbox__overlay" data-lightbox-close></div>
      <div class="lightbox__content">
        <button type="button" class="lightbox__close" data-lightbox-close aria-label="閉じる">✕</button>
        <button type="button" class="lightbox__nav lightbox__nav--prev" data-lightbox-prev aria-label="前の写真">‹</button>
        <figure class="lightbox__figure">
          <div class="lightbox__image" data-lightbox-image>
            <span class="lightbox__image-icon" aria-hidden="true">📷</span>
          </div>
          <figcaption class="lightbox__caption" data-lightbox-caption></figcaption>
        </figure>
        <button type="button" class="lightbox__nav lightbox__nav--next" data-lightbox-next aria-label="次の写真">›</button>
        <p class="lightbox__counter" data-lightbox-counter aria-live="polite"></p>
      </div>`

    document.body.appendChild(root)
    this.#root = root
    this.#imageEl = $('[data-lightbox-image]', root)
    this.#captionEl = $('[data-lightbox-caption]', root)
    this.#counterEl = $('[data-lightbox-counter]', root)
  }

  // ── ギャラリー側のクリックを委譲で捕捉 ──

  #bindGallery() {
    this.#gallery.addEventListener('click', (e) => {
      const btn = e.target.closest('.detail__gallery-item')
      if (!btn || !this.#gallery.contains(btn)) return
      const index = Number(btn.dataset.galleryIndex ?? 0)
      this.#open(index)
    })
  }

  // ── モーダル側のコントロール ──

  #bindControls() {
    const root = this.#root

    root
      .querySelectorAll('[data-lightbox-close]')
      .forEach((el) => el.addEventListener('click', () => this.#close()))
    $('[data-lightbox-prev]', root).addEventListener('click', () => this.#step(-1))
    $('[data-lightbox-next]', root).addEventListener('click', () => this.#step(1))

    document.addEventListener('keydown', (e) => {
      if (this.#root.hidden) return
      if (e.key === 'Escape') this.#close()
      else if (e.key === 'ArrowLeft') this.#step(-1)
      else if (e.key === 'ArrowRight') this.#step(1)
    })

    // スワイプ操作（タッチデバイス）
    const content = $('.lightbox__content', root)
    content.addEventListener(
      'touchstart',
      (e) => {
        this.#touchStartX = e.changedTouches[0].clientX
      },
      { passive: true }
    )
    content.addEventListener(
      'touchend',
      (e) => {
        const diff = e.changedTouches[0].clientX - this.#touchStartX
        if (Math.abs(diff) > SWIPE_THRESHOLD) this.#step(diff < 0 ? 1 : -1)
      },
      { passive: true }
    )
  }

  // ── 表示データを DOM から再取得 ──

  #syncItems() {
    this.#items = $$('.detail__gallery-item', this.#gallery).map((btn) => ({
      background: btn.style.background || btn.style.backgroundImage,
      label: $('.detail__gallery-label', btn)?.textContent ?? '',
    }))
  }

  // ── 開閉 ──

  #open(index) {
    this.#syncItems()
    if (this.#items.length === 0) return

    this.#lastFocused = document.activeElement
    this.#index = index
    this.#update()

    this.#root.hidden = false
    // 表示後にトランジション用クラスを付与
    requestAnimationFrame(() => this.#root.classList.add('is-open'))
    acquireScrollLock()
    $('.lightbox__close', this.#root).focus()
  }

  #close() {
    if (this.#root.hidden) return
    this.#root.classList.remove('is-open')
    this.#root.hidden = true
    releaseScrollLock()
    if (this.#lastFocused instanceof HTMLElement) this.#lastFocused.focus()
  }

  #step(dir) {
    const len = this.#items.length
    if (len === 0) return
    this.#index = (this.#index + dir + len) % len
    this.#update()
  }

  #update() {
    const item = this.#items[this.#index]
    if (!item) return
    this.#imageEl.style.background = item.background
    this.#captionEl.textContent = item.label
    this.#counterEl.textContent = `${this.#index + 1} / ${this.#items.length}`
  }
}
