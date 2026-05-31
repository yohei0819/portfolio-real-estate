/**
 * JSON-LD 構造化データ ユーティリティ
 *
 * schema.org に準拠した構造化データを <head> に注入し、検索エンジンに
 * ページの意味情報（サイト情報・パンくず・物件情報）を伝える。
 *
 * すべての script は data-jsonld 属性で識別し、同一 id は upsert（更新）する。
 * SPA 的にページ内容が動的に変わっても古い構造化データが残らないようにする。
 */

import { SITE } from './Config.js'

/**
 * 相対パスをサイトの絶対 URL に解決する。
 * 解決できない場合は入力値をそのまま返す。
 * @param {string} href
 * @returns {string}
 */
export function toAbsoluteUrl(href) {
  if (!href) return SITE.domain
  try {
    return new URL(href, `${SITE.domain}/`).href
  } catch {
    return href
  }
}

/**
 * JSON-LD を <head> に登録（同一 id があれば更新、なければ作成）。
 * @param {string} id    識別子（data-jsonld 属性値）
 * @param {Object} data  schema.org オブジェクト
 */
export function setJsonLd(id, data) {
  if (!data) return
  let el = document.querySelector(`script[data-jsonld="${id}"]`)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.dataset.jsonld = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/**
 * 指定 id の JSON-LD を削除する。
 * @param {string} id
 */
export function removeJsonLd(id) {
  document.querySelector(`script[data-jsonld="${id}"]`)?.remove()
}

/**
 * WebSite 構造化データを生成。
 * @returns {Object}
 */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    alternateName: SITE.tagline,
    url: `${SITE.domain}/`,
  }
}

/**
 * Organization 構造化データを生成。
 * @returns {Object}
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: `${SITE.domain}/`,
    logo: `${SITE.domain}/apple-touch-icon.png`,
  }
}

/**
 * パンくず配列から BreadcrumbList 構造化データを生成。
 * @param {Array<{label: string, href?: string}>} items
 * @returns {Object|null}
 */
export function buildBreadcrumbSchema(items) {
  if (!Array.isArray(items) || items.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => {
      const entry = {
        '@type': 'ListItem',
        position: i + 1,
        name: item.label,
      }
      if (item.href) entry.item = toAbsoluteUrl(item.href)
      return entry
    }),
  }
}

/**
 * 物件データから Residence + Offer 構造化データを生成。
 * @param {Object} prop  PropertyData のエントリ
 * @param {number|string} id  物件 ID
 * @returns {Object}
 */
export function buildResidenceSchema(prop, id) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: prop.name,
    url: `${SITE.domain}/property.html?id=${id}`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'JP',
      addressRegion: prop.prefecture,
      addressLocality: prop.city,
      streetAddress: prop.address,
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: prop.area,
      unitCode: 'MTK',
    },
    numberOfRooms: prop.layout,
    yearBuilt: prop.buildDate,
    makesOffer: {
      '@type': 'Offer',
      priceCurrency: 'JPY',
      price: Math.round(prop.price * 10000),
      availability: 'https://schema.org/InStock',
      businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
    },
  }
}
