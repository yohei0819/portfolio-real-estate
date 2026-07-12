/**
 * 物件お問い合わせフォーム（モーダル）
 *
 * 物件詳細サイドバーの「メールで問い合わせ」ボタン（[data-contact-open]）から
 * モーダルを開き、入力値をリアルタイム検証する。送信はモック（実送信なし）で、
 * 成功時は完了メッセージに切り替える。
 *
 * 開閉時はスクロールロック・フォーカス管理・ESC クローズに対応。
 */

import { $, $$, escapeHTML } from '../utils/DOMHelper.js'
import { acquireScrollLock, releaseScrollLock } from '../utils/ScrollLock.js'

/** お問い合わせ種別の選択肢 */
const INQUIRY_TYPES = ['内見を希望する', '空室状況を確認したい', '条件・費用を相談したい', 'その他']

/** メールアドレスの簡易検証パターン */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
/** 電話番号（数字・ハイフン・括弧・空白、10〜15桁）の検証パターン */
const TEL_RE = /^[\d\-+() ]{10,17}$/

export default class ContactForm {
  /** @type {HTMLElement|null} */ #trigger
  /** @type {HTMLElement|null} */ #root = null
  /** @type {HTMLFormElement|null} */ #form = null
  /** @type {Element|null} */ #lastFocused = null
  /** @type {string} */ #propertyName = ''

  constructor() {
    this.#trigger = $('[data-contact-open]')
    if (!this.#trigger) return

    this.#propertyName = $('.detail__title')?.textContent?.trim() || 'この物件'
    this.#build()
    this.#bind()
  }

  // ── モーダル DOM の構築 ──

  #build() {
    const root = document.createElement('div')
    root.className = 'contact-modal'
    root.setAttribute('role', 'dialog')
    root.setAttribute('aria-modal', 'true')
    root.setAttribute('aria-labelledby', 'contactModalTitle')
    root.hidden = true

    const options = INQUIRY_TYPES.map(
      (t) => `<option value="${escapeHTML(t)}">${escapeHTML(t)}</option>`
    ).join('')

    root.innerHTML = `
      <div class="contact-modal__overlay" data-contact-close></div>
      <div class="contact-modal__dialog">
        <button type="button" class="contact-modal__close" data-contact-close aria-label="閉じる">✕</button>
        <h2 class="contact-modal__title" id="contactModalTitle">お問い合わせ</h2>
        <p class="contact-modal__subtitle">${escapeHTML(this.#propertyName)} について</p>

        <form class="contact-form" novalidate>
          <div class="contact-form__field">
            <label class="contact-form__label" for="cfName">お名前 <span class="contact-form__req">必須</span></label>
            <input class="contact-form__input" id="cfName" name="name" type="text" autocomplete="name" required>
            <p class="contact-form__error" data-error-for="name"></p>
          </div>

          <div class="contact-form__field">
            <label class="contact-form__label" for="cfEmail">メールアドレス <span class="contact-form__req">必須</span></label>
            <input class="contact-form__input" id="cfEmail" name="email" type="email" autocomplete="email" required>
            <p class="contact-form__error" data-error-for="email"></p>
          </div>

          <div class="contact-form__field">
            <label class="contact-form__label" for="cfTel">電話番号 <span class="contact-form__opt">任意</span></label>
            <input class="contact-form__input" id="cfTel" name="tel" type="tel" autocomplete="tel" inputmode="tel">
            <p class="contact-form__error" data-error-for="tel"></p>
          </div>

          <div class="contact-form__field">
            <label class="contact-form__label" for="cfType">お問い合わせ種別</label>
            <select class="contact-form__select" id="cfType" name="type">${options}</select>
          </div>

          <div class="contact-form__field">
            <label class="contact-form__label" for="cfMessage">お問い合わせ内容 <span class="contact-form__req">必須</span></label>
            <textarea class="contact-form__textarea" id="cfMessage" name="message" rows="4" required></textarea>
            <p class="contact-form__error" data-error-for="message"></p>
          </div>

          <div class="contact-form__field contact-form__field--check">
            <label class="contact-form__check">
              <input type="checkbox" name="privacy" required>
              <span>プライバシーポリシーに同意する <span class="contact-form__req">必須</span></span>
            </label>
            <p class="contact-form__error" data-error-for="privacy"></p>
          </div>

          <button type="submit" class="contact-form__submit">この内容で問い合わせる</button>
        </form>

        <div class="contact-modal__success" data-contact-success hidden>
          <p class="contact-modal__success-icon" aria-hidden="true">✅</p>
          <h3 class="contact-modal__success-title">お問い合わせを受け付けました</h3>
          <p class="contact-modal__success-text">担当者より2営業日以内にご連絡いたします。<br>ありがとうございました。</p>
          <button type="button" class="contact-form__submit" data-contact-close>閉じる</button>
        </div>
      </div>`

    document.body.appendChild(root)
    this.#root = root
    this.#form = $('.contact-form', root)
  }

  // ── イベント結線 ──

  #bind() {
    this.#trigger.addEventListener('click', (e) => {
      e.preventDefault()
      this.#open()
    })

    this.#root
      .querySelectorAll('[data-contact-close]')
      .forEach((el) => el.addEventListener('click', () => this.#close()))

    document.addEventListener('keydown', (e) => {
      if (!this.#root.hidden && e.key === 'Escape') this.#close()
    })

    // リアルタイム検証（blur 時に各フィールドを検証）
    this.#form.addEventListener(
      'blur',
      (e) => {
        const field = e.target
        if (field.name) this.#validateField(field)
      },
      true
    )

    // 入力中はエラーを消す（再検証は次の blur で）
    this.#form.addEventListener('input', (e) => {
      const field = e.target
      if (field.name && field.getAttribute('aria-invalid') === 'true') {
        this.#validateField(field)
      }
    })

    this.#form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.#submit()
    })
  }

  // ── 検証ロジック ──

  /**
   * 単一フィールドを検証し、エラー表示を更新
   * @param {HTMLInputElement|HTMLTextAreaElement} field
   * @returns {boolean} 妥当なら true
   */
  #validateField(field) {
    const value = field.type === 'checkbox' ? field.checked : field.value.trim()
    let error = ''

    switch (field.name) {
      case 'name':
        if (!value) error = 'お名前を入力してください。'
        break
      case 'email':
        if (!value) error = 'メールアドレスを入力してください。'
        else if (!EMAIL_RE.test(value)) error = 'メールアドレスの形式が正しくありません。'
        break
      case 'tel':
        if (value && !TEL_RE.test(value)) error = '電話番号の形式が正しくありません。'
        break
      case 'message':
        if (!value) error = 'お問い合わせ内容を入力してください。'
        else if (value.length < 10) error = '10文字以上で入力してください。'
        break
      case 'privacy':
        if (!value) error = '同意が必要です。'
        break
    }

    this.#setFieldError(field, error)
    return error === ''
  }

  #setFieldError(field, error) {
    const errorEl = $(`[data-error-for="${field.name}"]`, this.#root)
    if (errorEl) errorEl.textContent = error
    field.setAttribute('aria-invalid', error ? 'true' : 'false')
    field.closest('.contact-form__field')?.classList.toggle('has-error', !!error)
  }

  // ── 送信（モック） ──

  #submit() {
    const fields = $$('input[name], textarea[name]', this.#form)
    let firstInvalid = null
    let allValid = true

    for (const field of fields) {
      const ok = this.#validateField(field)
      if (!ok) {
        allValid = false
        if (!firstInvalid) firstInvalid = field
      }
    }

    if (!allValid) {
      firstInvalid?.focus()
      return
    }

    // 実送信は行わず、成功表示に切り替える（ポートフォリオ用モック）
    this.#form.hidden = true
    const success = $('[data-contact-success]', this.#root)
    if (success) success.hidden = false
  }

  // ── 開閉 ──

  #open() {
    this.#lastFocused = document.activeElement
    this.#root.hidden = false
    requestAnimationFrame(() => this.#root.classList.add('is-open'))
    acquireScrollLock()
    $('#cfName', this.#root)?.focus()
  }

  #close() {
    if (this.#root.hidden) return
    this.#root.classList.remove('is-open')
    this.#root.hidden = true
    releaseScrollLock()
    if (this.#lastFocused instanceof HTMLElement) this.#lastFocused.focus()
  }
}
