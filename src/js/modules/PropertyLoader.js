/**
 * 物件詳細ページ動的読み込みモジュール
 * URLの ?id=N パラメータに応じて property.html の内容を動的に更新
 * PropertyData.js のマスタデータを参照
 *
 * 責務ごとにメソッドを分割し、各セクションの表示ロジックを独立させる
 * 新しいセクション（写真ギャラリー、問い合わせフォーム等）の追加が容易
 */

import PROPERTIES from '../data/PropertyData.js'
import { updatePageMeta } from '../utils/MetaUpdater.js'
import { setJsonLd, removeJsonLd, buildResidenceSchema } from '../utils/JsonLd.js'
import { SITE, EVENT } from '../utils/Config.js'
import { $, setText, setHTML, getQueryParam, escapeHTML } from '../utils/DOMHelper.js'
import { isFavorite, getFavorites } from '../utils/StorageHelper.js'
import { buildPropertyCard } from '../utils/CardBuilder.js'

/** 周辺施設カテゴリの定義（追加時はここにエントリを増やすだけ） */
const NEARBY_CATEGORIES = [
  { key: 'shopping', icon: '🛒', title: '買い物' },
  { key: 'medical', icon: '🏥', title: '医療' },
  { key: 'education', icon: '🎓', title: '教育' },
  { key: 'finance', icon: '🏦', title: '金融・公共' },
]

/**
 * 室内写真ギャラリーの構成（部屋ラベル + 配色）
 * 実画像の代わりにグラデーションのプレースホルダーで表現する
 */
const GALLERY_ROOMS = [
  { label: 'リビング', gradient: 'linear-gradient(135deg, #f5e6d3, #e8d5c4)' },
  { label: 'キッチン', gradient: 'linear-gradient(135deg, #d3e5f5, #c4d5e8)' },
  { label: '浴室', gradient: 'linear-gradient(135deg, #d3f5e8, #c4e8d5)' },
  { label: '洗面所', gradient: 'linear-gradient(135deg, #e8d3f5, #d5c4e8)' },
  { label: '洋室', gradient: 'linear-gradient(135deg, #f5d3e0, #e8c4d2)' },
  { label: 'バルコニー', gradient: 'linear-gradient(135deg, #f5f0d3, #e8e2c4)' },
]

export default class PropertyLoader {
  /** @type {Object|null} */
  #prop = null
  /** @type {number} */
  #id = NaN

  constructor() {
    this.#init()
  }

  #init() {
    if (!$('.detail__title')) return

    const rawId = getQueryParam('id')
    const id = rawId !== null ? parseInt(rawId, 10) : NaN
    if (isNaN(id) || !PROPERTIES[id]) {
      this.#renderNotFound()
      return
    }

    this.#prop = PROPERTIES[id]
    this.#id = id
    this.#render()
  }

  /**
   * 物件が見つからない場合のフォールバック表示
   * 不正・存在しない ?id 指定時に呼ばれる
   */
  #renderNotFound() {
    const main = $('.detail')
    if (!main) return

    // 物件詳細用の構造化データは残さない
    removeJsonLd('residence')

    updatePageMeta({
      title: `物件が見つかりません｜${SITE.name}`,
      description: '指定された物件は見つかりませんでした。',
      breadcrumb: [{ label: SITE.tagline, href: './' }, { label: '物件が見つかりません' }],
    })

    setHTML(
      '.detail',
      `<div class="detail__not-found">
        <p class="detail__not-found-icon" aria-hidden="true">🔍</p>
        <h1 class="detail__not-found-title">物件が見つかりませんでした</h1>
        <p class="detail__not-found-text">指定された物件は削除されたか、URLが正しくない可能性があります。</p>
        <a href="./search.html" class="detail__not-found-link">物件一覧から探す</a>
      </div>`
    )
  }

  /**
   * 全セクションを順次描画
   * 新しいセクションを追加する際はここにメソッド呼び出しを追加
   */
  #render() {
    this.#renderMeta()
    this.#renderHero()
    this.#renderBasicInfo()
    this.#renderSpecTable()
    this.#renderFeatures()
    this.#renderCostSimulation()
    this.#renderFloorplan()
    this.#renderGallery()
    this.#renderNearby()
    this.#renderCompany()
    this.#renderFavoriteButton()
    this.#renderSimilarProperties()

    // 最近見た物件に追加（カスタムイベント発火）
    document.dispatchEvent(new CustomEvent(EVENT.RECENTLY_VIEWED, { detail: { id: this.#id } }))
  }

  // ── メタ情報 ──

  #renderMeta() {
    const { name, areaKey, prefecture, city } = this.#prop
    const title = `${name}｜物件詳細｜${SITE.name}`

    updatePageMeta({
      title,
      description: `${name}の賃貸物件詳細情報`,
      ogTitle: title,
      ogDescription: `${name}の賃貸物件詳細情報`,
      canonical: `${SITE.domain}/property.html?id=${this.#id}`,
      breadcrumb: [
        { label: SITE.tagline, href: './' },
        { label: prefecture, href: `./search.html?area=${areaKey}` },
        { label: city, href: `./search.html?area=${areaKey}` },
        { label: name },
      ],
    })

    // 物件詳細の構造化データ（Residence + Offer）を注入
    setJsonLd('residence', buildResidenceSchema(this.#prop, this.#id))
  }

  // ── ヒーロー ──

  #renderHero() {
    const heroBadge = $('.detail__hero-badge')
    if (heroBadge) {
      if (this.#prop.badge) {
        heroBadge.textContent = this.#prop.badge
      } else {
        heroBadge.style.display = 'none'
      }
    }

    const hero = $('.detail__hero')
    if (hero) hero.style.background = this.#prop.gradient
  }

  // ── 基本情報（名前・住所・価格） ──

  #renderBasicInfo() {
    const p = this.#prop

    setText('.detail__title', p.name)
    setText('.detail__address', `📍 ${p.address} ／ ${p.station} ／ ${p.totalFloors}階建`)
    setText('.detail__price-num', p.price)

    const depositText = p.depositMonths > 0 ? `${p.depositMonths}ヶ月` : 'なし'
    const keyMoneyText = p.keyMoneyMonths > 0 ? `${p.keyMoneyMonths}ヶ月` : 'なし'
    setText(
      '.detail__price-sub',
      `管理費: ${p.managementFee.toLocaleString()}円 ／ 敷金: ${depositText} ／ 礼金: ${keyMoneyText}`
    )
  }

  // ── 物件概要テーブル ──

  #renderSpecTable() {
    const p = this.#prop
    const rows = [
      ['物件種別', p.type],
      ['間取り', p.layout],
      ['専有面積', `${p.area}㎡`],
      ['築年月', `${p.buildDate} (${p.age})`],
      ['所在階', `${p.floor}階 / ${p.totalFloors}階建`],
      ['方位', p.direction],
      ['構造', p.structure],
      ['駐車場', p.parking],
      ['入居可能日', p.moveIn],
      ['契約期間', p.contract],
      ['保証会社', p.guarantor],
      ['取引態様', p.transaction],
    ]
    setHTML(
      '.detail__table',
      `<caption class="sr-only">物件の基本情報一覧</caption>` +
        rows
          .map(
            ([th, td]) =>
              `<tr><th scope="row">${escapeHTML(th)}</th><td>${escapeHTML(String(td ?? ''))}</td></tr>`
          )
          .join('')
    )
  }

  // ── 設備・特徴 ──

  #renderFeatures() {
    setHTML(
      '.detail__features',
      this.#prop.features
        .map((f) => `<span class="detail__feature-tag">${escapeHTML(f)}</span>`)
        .join('')
    )
  }

  // ── 初期費用シミュレーション ──

  #renderCostSimulation() {
    const costSim = $('.detail__cost-sim .detail__table')
    if (!costSim) return

    const costs = this.#prop.initialCosts
    if (!costs) return
    const entries = [
      costs.deposit,
      costs.keyMoney,
      costs.rent,
      costs.management,
      costs.brokerage,
      costs.insurance,
      costs.guarantorFee,
      costs.keyExchange,
    ]
    const rowsHTML = entries
      .filter(Boolean)
      .map((c) => {
        const note = c.note ? `（${escapeHTML(c.note)}）` : ''
        return `<tr><th scope="row">${escapeHTML(c.label)}</th><td>${c.amount.toLocaleString()}円${note}</td></tr>`
      })
      .join('')

    costSim.innerHTML =
      `<caption class="sr-only">初期費用の内訳</caption>` +
      rowsHTML +
      `<tr class="detail__cost-total"><th scope="row">初期費用合計（税込）</th><td>${costs.total.toLocaleString()}円</td></tr>`
  }

  // ── 間取り図 ──

  #renderFloorplan() {
    const { floorplan } = this.#prop
    if (!floorplan?.rooms?.length) return

    setText('.detail__floorplan-label', floorplan.label)
    setHTML(
      '.detail__floorplan-rooms',
      floorplan.rooms
        .map((r) => {
          const size = r.size ? `<span>${escapeHTML(r.size)}</span>` : ''
          return `<div class="detail__floorplan-room detail__floorplan-room--${r.type}"><span>${escapeHTML(r.name)}</span>${size}</div>`
        })
        .join('')
    )
  }

  // ── 室内写真ギャラリー ──

  #renderGallery() {
    const gallery = $('.detail__gallery')
    if (!gallery) return

    gallery.innerHTML = GALLERY_ROOMS.map(
      (room, i) =>
        `<button type="button" class="detail__gallery-item" data-gallery-index="${i}" style="background:${room.gradient}" aria-label="${escapeHTML(room.label)}の写真を拡大表示">
        <span class="detail__gallery-icon" aria-hidden="true">📷</span>
        <span class="detail__gallery-label">${escapeHTML(room.label)}</span>
      </button>`
    ).join('')
  }

  // ── 周辺施設 ──

  #renderNearby() {
    const nearbyEl = $('.detail__nearby')
    if (!nearbyEl) return

    nearbyEl.innerHTML = NEARBY_CATEGORIES.map((cat) => {
      const items = this.#prop.nearby?.[cat.key]
      if (!items || items.length === 0) return ''

      const list = items
        .map(
          (item) =>
            `<li><span class="detail__nearby-name">${escapeHTML(item.name)}</span><span class="detail__nearby-distance">${escapeHTML(item.distance)}</span></li>`
        )
        .join('')
      return `
          <div class="detail__nearby-category">
            <h3 class="detail__nearby-category-title"><span aria-hidden="true">${cat.icon}</span> ${cat.title}</h3>
            <ul class="detail__nearby-list">${list}</ul>
          </div>`
    }).join('')
  }

  // ── 管理会社 ──

  #renderCompany() {
    const { company } = this.#prop
    if (!company) return

    setText('.detail__sidebar-company', company.name)
    setText('[data-company-address]', company.address)
    setText('[data-company-hours]', `営業時間: ${company.hours}`)
    setText('[data-company-holiday]', `定休日: ${company.holiday}`)
  }

  // ── お気に入りボタン（サイドバー） ──

  #renderFavoriteButton() {
    const favBtn = $('.detail__sidebar-btn--fav')
    if (!favBtn) return

    const active = isFavorite(this.#id)
    favBtn.dataset.favId = this.#id
    favBtn.classList.toggle('is-fav-active', active)
    favBtn.setAttribute('aria-pressed', String(active))
    favBtn.removeAttribute('tabindex')

    const label = active ? 'お気に入り済み' : 'お気に入りに追加'
    const icon = active ? '❤️' : '🤍'
    favBtn.innerHTML = `<span class="fav-btn__icon">${icon}</span> <span class="fav-btn__label">${label}</span>`
  }

  // ── 類似物件 ──

  #renderSimilarProperties() {
    const grid = $('.detail__similar-grid')
    if (!grid) return

    const similarIds = this.#prop.similarIds
    if (!similarIds || similarIds.length === 0) {
      grid.innerHTML = ''
      return
    }

    const favIds = new Set(getFavorites())

    grid.innerHTML = similarIds
      .map((simId) => {
        const sim = PROPERTIES[simId]
        if (!sim) return ''
        return buildPropertyCard(simId, sim, favIds)
      })
      .filter(Boolean)
      .join('')
  }
}
