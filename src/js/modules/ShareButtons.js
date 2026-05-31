/**
 * SNS シェアボタン
 *
 * 物件詳細サイドバーのシェアボタン（[data-share]）に、現在ページの URL と
 * タイトルを使った X / Facebook / LINE のシェアリンクを設定する。
 * 「URL をコピー」ボタンはクリップボードへコピーし、フィードバックを表示する。
 *
 * OGP メタは MetaUpdater が設定済みのため、ここでは共有 URL の組み立てに専念する。
 */

import { $ } from '../utils/DOMHelper.js'

/** コピー完了フィードバックの表示時間（ms） */
const FEEDBACK_DURATION = 2000

export default class ShareButtons {
  /** @type {HTMLElement|null} */ #root
  /** @type {number|undefined} */ #feedbackTimer

  constructor() {
    this.#root = $('[data-share]')
    if (!this.#root) return

    this.#setupLinks()
    this.#bindCopy()
  }

  // ── 共有リンクの組み立て ──

  #setupLinks() {
    const url = window.location.href
    const title = document.title
    const encodedUrl = encodeURIComponent(url)
    const encodedTitle = encodeURIComponent(title)

    const links = {
      x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    }

    const xEl = $('[data-share-x]', this.#root)
    const fbEl = $('[data-share-fb]', this.#root)
    const lineEl = $('[data-share-line]', this.#root)
    if (xEl) xEl.href = links.x
    if (fbEl) fbEl.href = links.fb
    if (lineEl) lineEl.href = links.line
  }

  // ── URL コピー ──

  #bindCopy() {
    const copyBtn = $('[data-share-copy]', this.#root)
    if (!copyBtn) return

    copyBtn.addEventListener('click', async () => {
      const url = window.location.href
      try {
        await this.#copyToClipboard(url)
        this.#showFeedback('URLをコピーしました')
      } catch {
        this.#showFeedback('コピーに失敗しました')
      }
    })
  }

  /**
   * クリップボードへコピー（Clipboard API 非対応環境はフォールバック）
   * @param {string} text
   */
  async #copyToClipboard(text) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }
    // フォールバック: 一時的な textarea を使った execCommand
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'absolute'
    ta.style.left = '-9999px'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    if (!ok) throw new Error('execCommand copy failed')
  }

  #showFeedback(message) {
    const feedback = $('[data-share-feedback]', this.#root.parentElement || this.#root)
    if (!feedback) return
    feedback.textContent = message
    feedback.hidden = false
    clearTimeout(this.#feedbackTimer)
    this.#feedbackTimer = setTimeout(() => {
      feedback.hidden = true
    }, FEEDBACK_DURATION)
  }
}
