/**
 * Meta/OGP/パンくずリスト共通更新ユーティリティ
 * AreaSearch, StationSearch, PropertyLoader が共通で使用する
 * ページメタ情報の更新ロジックを一元管理
 */

import { escapeHTML } from './DOMHelper.js'

/**
 * ページタイトルを更新
 * @param {string} title - 新しいページタイトル
 */
export function updateTitle(title) {
  document.title = title
}

/**
 * meta description を更新
 * @param {string} content - description の内容
 */
export function updateMetaDescription(content) {
  const el = document.querySelector('meta[name="description"]')
  if (el) el.setAttribute('content', content)
}

/**
 * OGP タグ（og:title, og:description）を更新
 * @param {string} title - OGP タイトル
 * @param {string} description - OGP 説明文
 */
export function updateOGP(title, description) {
  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.setAttribute('content', title)

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.setAttribute('content', description)
}

/**
 * canonical URL を更新
 * @param {string} url - canonical URL
 */
export function updateCanonical(url) {
  const el = document.querySelector('link[rel="canonical"]')
  if (el) el.setAttribute('href', url)
}

/**
 * パンくずリストを更新
 * @param {Array<{label: string, href?: string}>} items
 *   - href なし → 現在のページ（最後の要素）
 *   - href あり → リンク付きパンくず
 */
export function updateBreadcrumb(items) {
  const list = document.querySelector('.breadcrumb__list')
  if (!list) return

  list.innerHTML = items
    .map((item) => {
      if (item.href) {
        return `<li class="breadcrumb__item"><a href="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a></li>`
      }
      return `<li class="breadcrumb__item">${escapeHTML(item.label)}</li>`
    })
    .join('')
}

/**
 * ページメタ情報を一括更新（簡易ヘルパー）
 * @param {Object} options
 * @param {string} options.title
 * @param {string} options.description
 * @param {string} [options.ogTitle]
 * @param {string} [options.ogDescription]
 * @param {string} [options.canonical]
 * @param {Array<{label: string, href?: string}>} [options.breadcrumb]
 */
export function updatePageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  canonical,
  breadcrumb,
}) {
  if (title) updateTitle(title)
  if (description) updateMetaDescription(description)
  updateOGP(ogTitle || title, ogDescription || description)
  if (canonical) updateCanonical(canonical)
  if (breadcrumb) updateBreadcrumb(breadcrumb)
}
