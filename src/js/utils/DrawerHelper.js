/**
 * ドロワー共通描画ヘルパー
 *
 * FavoriteManager / RecentlyViewedManager / SearchHistoryManager が
 * 共通で使用するドロワー内 HTML 生成ロジックを一元管理する。
 *
 * 目的:
 *   - DRY 原則（同一テンプレートの重複排除）
 *   - XSS 対策（escapeHTML の一貫適用）
 *   - 保守性向上（テンプレート変更時の修正箇所を1か所に集約）
 */

import { $$, escapeHTML } from './DOMHelper.js'
import PROPERTIES from '../data/PropertyData.js'

/** バッジに表示する最大数（100件以上は "99+" のような表示を避け 99 で統一） */
const BADGE_MAX = 99

// ----------------------------------------------------------------
// バッジ更新
// ----------------------------------------------------------------

/**
 * バッジ要素群のテキスト・表示を一括更新
 * 3つのマネージャーで共通のバッジ更新パターンを一元化
 *
 * @param {string} selector  バッジ要素の data 属性セレクタ（例: '[data-fav-badge]'）
 * @param {number} count     表示件数
 */
export function updateBadges(selector, count) {
  const badges = $$(selector)
  const display = count > 0 ? String(Math.min(count, BADGE_MAX)) : ''

  for (const badge of badges) {
    badge.textContent = display
    badge.hidden = count === 0
  }
}

// ----------------------------------------------------------------
// 空状態
// ----------------------------------------------------------------

/**
 * ドロワーの空状態 HTML を生成
 * 防御的に escapeHTML を適用（将来的に動的文字列が渡される場合に備える）
 * @param {string} message  空状態のメインメッセージ
 * @param {string} hint     補足ヒントテキスト
 * @returns {string}
 */
export function renderEmptyState(message, hint) {
  return `
    <div class="drawer__empty">
      <p>${escapeHTML(message)}</p>
      <p class="drawer__empty-hint">${escapeHTML(hint)}</p>
    </div>`
}

// ----------------------------------------------------------------
// 物件ドロワーアイテム
// ----------------------------------------------------------------

/**
 * ドロワー内の物件アイテム HTML を生成
 * FavoriteManager / RecentlyViewedManager で共通使用
 *
 * @param {number}  id       物件ID
 * @param {Object}  [options]
 * @param {boolean} [options.removable=false]  削除ボタンを表示するか
 * @returns {string}  HTML 文字列（物件が存在しない場合は空文字）
 */
export function renderPropertyItem(id, { removable = false } = {}) {
  if (!Number.isInteger(id) || id <= 0) return ''
  const p = PROPERTIES[id]
  if (!p) return ''

  const removeBtn = removable
    ? `<button class="drawer__item-remove" data-fav-id="${id}" aria-label="${escapeHTML(p.name)}をお気に入りから削除">✕</button>`
    : ''

  return `
    <div class="drawer__item">
      <a href="./property.html?id=${id}" class="drawer__item-link">
        <div class="drawer__item-image" style="background: ${p.gradient};"></div>
        <div class="drawer__item-body">
          <p class="drawer__item-name">${escapeHTML(p.name)}</p>
          <p class="drawer__item-price">${p.price}万円 ／ ${escapeHTML(p.layout)} ／ ${p.area}㎡</p>
          <p class="drawer__item-location">📍 ${escapeHTML(p.city)}</p>
        </div>
      </a>
      ${removeBtn}
    </div>`
}

/**
 * 物件IDの配列からドロワー内容を一括生成
 * @param {number[]} ids       物件IDの配列
 * @param {Object}   [options]
 * @param {boolean}  [options.removable=false]  削除ボタンを表示するか
 * @param {string}   [options.emptyMessage]     空時のメッセージ
 * @param {string}   [options.emptyHint]        空時のヒント
 * @returns {string}  HTML 文字列
 */
export function renderPropertyList(
  ids,
  { removable = false, emptyMessage = '物件がありません', emptyHint = '' } = {}
) {
  if (ids.length === 0) {
    return renderEmptyState(emptyMessage, emptyHint)
  }

  return ids
    .map((id) => renderPropertyItem(id, { removable }))
    .filter(Boolean)
    .join('')
}
