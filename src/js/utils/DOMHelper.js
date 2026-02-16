/**
 * DOM操作ヘルパー
 * よく使うDOM操作を短縮・安全化するユーティリティ関数群
 */

/**
 * HTML 特殊文字をエスケープ（XSS 対策）
 * innerHTML に動的な値を埋め込む際に必ず使用すること
 * @param {string} str  エスケープ対象の文字列
 * @returns {string}
 */
export function escapeHTML(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * 要素を1つ取得（nullセーフ）
 * @param {string} selector
 * @param {Element} [context=document]
 * @returns {Element|null}
 */
export function $(selector, context = document) {
  return context.querySelector(selector)
}

/**
 * 要素を配列で取得
 * @param {string} selector
 * @param {Element} [context=document]
 * @returns {Element[]}
 */
export function $$(selector, context = document) {
  return [...context.querySelectorAll(selector)]
}

/**
 * 要素のテキストを安全に設定
 * @param {string} selector
 * @param {string} text
 * @param {Element} [context=document]
 */
export function setText(selector, text, context = document) {
  const el = $(selector, context)
  if (el) el.textContent = text
}

/**
 * 要素のHTMLを安全に設定
 * @param {string} selector
 * @param {string} html
 * @param {Element} [context=document]
 */
export function setHTML(selector, html, context = document) {
  const el = $(selector, context)
  if (el) el.innerHTML = html
}

/**
 * URLクエリパラメータを安全に取得
 * @param {string} key
 * @returns {string|null}
 */
export function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key)
}

/**
 * 現在のページ種別を判定
 * パスの末尾ファイル名で厳密に判定し、部分一致による誤判定を防止
 * @returns {'index'|'search'|'property'|'station'}
 */
export function detectPage() {
  const path = window.location.pathname
  // 末尾のファイル名（例: '/search.html' → 'search.html'）を取得
  const filename = path.split('/').pop() || ''
  if (filename.startsWith('search'))   return 'search'
  if (filename.startsWith('property')) return 'property'
  if (filename.startsWith('station'))  return 'station'
  return 'index'
}

/**
 * 都道府県リストから optgroup 付き HTML を生成
 * 共通ユーティリティ — AreaSearch / StationSearch で利用
 * @param {{ key: string, name: string, region: string }[]} prefList  都道府県配列
 * @param {string} [defaultLabel]  先頭のデフォルト選択肢ラベル（省略時は追加しない）
 * @returns {string}
 */
export function buildRegionOptions(prefList, defaultLabel = '') {
  const regionMap = new Map()
  for (const p of prefList) {
    if (!regionMap.has(p.region)) regionMap.set(p.region, [])
    regionMap.get(p.region).push(p)
  }

  const groups = [...regionMap.entries()]
    .map(([region, prefs]) => {
      const opts = prefs
        .map((p) => `<option value="${escapeHTML(p.key)}">${escapeHTML(p.name)}</option>`)
        .join('')
      return `<optgroup label="${escapeHTML(region)}">${opts}</optgroup>`
    })
    .join('')

  return defaultLabel
    ? `<option value="">${escapeHTML(defaultLabel)}</option>${groups}`
    : groups
}
