/**
 * 物件カード HTML 生成ユーティリティ
 *
 * NewProperties / PropertyLoader / AreaSearch で共通使用する
 * 物件カード・お気に入りボタンの HTML テンプレートを一元管理。
 *
 * 目的:
 *   - DRY 原則（テンプレートを集約）
 *   - テンプレート変更時の修正箇所を1か所に集約
 *   - お気に入りボタンの状態計算ロジック統一
 *
 * テンプレート一覧:
 *   - buildFavButton    … お気に入りボタン（全ページ共通）
 *   - buildPropertyCard … property-card 形式（トップ / 物件詳細の類似物件）
 *   - buildPropertyRow  … property-row 形式（検索結果一覧）
 */

import { escapeHTML } from './DOMHelper.js'

// ----------------------------------------------------------------
// お気に入りボタン
// ----------------------------------------------------------------

/**
 * お気に入りボタン HTML を生成
 * FavoriteManager がクリック時に [data-fav-id] で検出・トグルする。
 *
 * @param {number}      id       物件ID
 * @param {string}      name     物件名（aria-label 用）
 * @param {Set<number>} favIds   お気に入り物件IDの Set
 * @param {string}      [variant='card']  ボタンバリアント ('card' | 'row')
 * @returns {string}  HTML 文字列
 */
export function buildFavButton(id, name, favIds, variant = 'card') {
  const active = favIds.has(id)
  const cls = active ? ' is-fav-active' : ''
  const icon = active ? '❤️' : '🤍'

  return `<button class="fav-btn fav-btn--${variant}${cls}" data-fav-id="${id}" aria-label="${escapeHTML(name)}をお気に入りに追加" aria-pressed="${active}">
      <span class="fav-btn__icon">${icon}</span>
    </button>`
}

// ----------------------------------------------------------------
// property-card 用バッジ
// ----------------------------------------------------------------

/**
 * property-card 用バッジ HTML を生成
 * @param {string|undefined} badge  バッジテキスト（'NEW', 'おすすめ' 等）
 * @returns {string}  HTML 文字列（バッジなしは空文字）
 */
export function buildCardBadge(badge) {
  if (!badge) return ''
  const modifier = badge === 'NEW' ? 'new' : 'recommended'
  return `<div class="property-card__badge property-card__badge--${modifier}">${escapeHTML(badge)}</div>`
}

// ----------------------------------------------------------------
// property-card 本体
// ----------------------------------------------------------------

/**
 * property-card 形式のカード HTML を生成
 * NewProperties（トップページ）/ PropertyLoader（類似物件）共通テンプレート
 *
 * @param {number}      id       物件ID
 * @param {Object}      prop     物件データオブジェクト
 * @param {Set<number>} favIds   お気に入り物件IDの Set
 * @param {Object}      [options]
 * @param {string}      [options.location]  カスタム地名表示（省略時: prop.city）
 * @param {string}      [options.age]       カスタム築年数表示（省略時: prop.age）
 * @returns {string}  HTML 文字列
 */
export function buildPropertyCard(id, prop, favIds, { location, age } = {}) {
  return `
    <div class="property-card js-fade-in">
      <a href="./property.html?id=${id}" class="property-card__link">
        ${buildCardBadge(prop.badge)}
        <div class="property-card__image" style="background: ${prop.gradient};"></div>
        <div class="property-card__body">
          <div class="property-card__price">
            <span class="property-card__price-num">${prop.price}</span>
            <span class="property-card__price-unit">万円</span>
          </div>
          <h3 class="property-card__name">${escapeHTML(prop.name)}</h3>
          <div class="property-card__details">
            <span class="property-card__tag">${escapeHTML(prop.layout)}</span>
            <span class="property-card__tag">${prop.area}㎡</span>
            <span class="property-card__tag">${escapeHTML(age || prop.age)}</span>
          </div>
          <p class="property-card__location">${escapeHTML(location || prop.city)}</p>
        </div>
      </a>
      ${buildFavButton(id, prop.name, favIds)}
    </div>`
}

// ----------------------------------------------------------------
// property-row 本体（検索結果一覧用）
// ----------------------------------------------------------------

/**
 * property-row 形式の検索結果カード HTML を生成
 * AreaSearch（search.html）で使用する横長リストカード
 *
 * @param {Object}      p       物件オブジェクト（id, name, address, station 等）
 * @param {Set<number>} favIds  お気に入り物件IDの Set（バッチ済み）
 * @returns {string}  HTML 文字列
 */
export function buildPropertyRow(p, favIds) {
  const badge = p.badge
    ? `<span class="property-row__badge">${escapeHTML(p.badge)}</span>`
    : ''

  const features = p.features
    .slice(0, 4)
    .map((f) => `<span class="property-row__feature">${escapeHTML(f)}</span>`)
    .join('')

  const subParts = []
  if (p.managementFee) subParts.push(`管理費: ${p.managementFee.toLocaleString()}円`)
  if (p.depositMonths) subParts.push(`敷金${p.depositMonths}ヶ月`)
  const subPrice = subParts.join(' / ')

  return `
    <div class="property-row js-fade-in">
      <a href="./property.html?id=${p.id}" class="property-row__link">
        <div class="property-row__image" style="background: ${p.gradient};">
          ${badge}
        </div>
        <div class="property-row__body">
          <h2 class="property-row__name">${escapeHTML(p.name)}</h2>
          <p class="property-row__address">📍 ${escapeHTML(p.address)} ${escapeHTML(p.station)}｜${escapeHTML(String(p.totalFloors ?? ''))}階建</p>
          <div class="property-row__specs">
            <div class="property-row__spec">
              <span class="property-row__spec-label">賃料</span> ${p.price}万円
            </div>
            <div class="property-row__spec">
              <span class="property-row__spec-label">間取り</span> ${escapeHTML(p.layout)}
            </div>
            <div class="property-row__spec">
              <span class="property-row__spec-label">面積</span> ${p.area}㎡
            </div>
          </div>
          <div class="property-row__price-area">
            <div>
              <span class="property-row__price-num">${p.price}</span>
              <span class="property-row__price-unit">万円</span>
            </div>
            <span class="property-row__sub-price">${subPrice}</span>
          </div>
          <div class="property-row__features">${features}</div>
        </div>
      </a>
      ${buildFavButton(p.id, p.name, favIds, 'row')}
    </div>`
}
