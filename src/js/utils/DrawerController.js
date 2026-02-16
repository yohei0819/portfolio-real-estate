/**
 * ドロワー共通制御ユーティリティ
 *
 * FavoriteManager / RecentlyViewedManager / SearchHistoryManager が
 * それぞれ保持していたドロワー開閉・オーバーレイ・スクロールロックの
 * ロジックを一元化し、DRY 違反とスクロールロック競合を解消する。
 *
 * 排他制御:
 *   同時に開けるドロワーは 1 つだけ。
 *   新しいドロワーを開くと、既に開いている別のドロワーを自動的に閉じる。
 *
 * アクセシビリティ:
 *   Escape キーで開いているドロワーを閉じる。
 *   DOM 要素はコンストラクタ時にキャッシュし、毎回のクエリを回避。
 *
 * 使い方:
 *   const drawer = new DrawerController({
 *     drawerId:   'favDrawer',
 *     overlayId:  'favDrawerOverlay',
 *     toggleAttr: 'data-fav-drawer-toggle',
 *     onOpen:     () => this.#renderContent(),
 *   })
 */

import { $, $$ } from './DOMHelper.js'
import { acquireScrollLock, releaseScrollLock } from './ScrollLock.js'

/** 現在開いている DrawerController インスタンスを管理（排他制御用） */
const openInstances = new Set()

export default class DrawerController {
  /** @type {HTMLElement|null} キャッシュ済みドロワー要素 */
  #elDrawer

  /** @type {HTMLElement|null} キャッシュ済みオーバーレイ要素 */
  #elOverlay

  /** @type {(() => void)|null} ドロワーを開く直前に呼ばれるコールバック */
  #onOpen

  /**
   * @param {Object} config
   * @param {string} config.drawerId     ドロワー要素の ID
   * @param {string} config.overlayId    オーバーレイ要素の ID
   * @param {string} config.toggleAttr   開閉トリガーに付与する data 属性名
   * @param {() => void} [config.onOpen] ドロワーを開く直前のコールバック
   */
  constructor({ drawerId, overlayId, toggleAttr, onOpen = null }) {
    this.#elDrawer = $(`#${drawerId}`)
    this.#elOverlay = $(`#${overlayId}`)
    this.#onOpen = onOpen

    if (this.#elDrawer) this.#bind(toggleAttr)
  }

  // ==============================================================
  // 初期化
  // ==============================================================

  /**
   * イベントリスナーのバインド
   * @param {string} toggleAttr  開閉トリガーの data 属性名
   */
  #bind(toggleAttr) {
    // トリガーボタン（ヘッダー・モバイルメニュー内）
    for (const trigger of $$(`[${toggleAttr}]`)) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault()
        this.toggle()
      })
    }

    // オーバーレイクリックで閉じる
    this.#elOverlay?.addEventListener('click', () => this.close())

    // ✕ ボタンで閉じる
    const closeBtn = this.#elDrawer.querySelector('.drawer__close')
    closeBtn?.addEventListener('click', () => this.close())
  }

  /** Escape キーでドロワーを閉じる（アロー関数でインスタンスにバインド） */
  #handleKeydown = (e) => {
    if (e.key === 'Escape') this.close()
  }

  // ==============================================================
  // 公開 API
  // ==============================================================

  /** ドロワーの開閉をトグル */
  toggle() {
    if (!this.#elDrawer) return
    this.#elDrawer.classList.contains('is-open') ? this.close() : this.open()
  }

  /** ドロワーを開く（排他制御 + Escape キー登録） */
  open() {
    if (!this.#elDrawer) return

    // 排他制御（反復中の Set 変更に備えスプレッドコピー）
    for (const instance of [...openInstances]) {
      if (instance !== this) instance.close()
    }

    this.#onOpen?.()
    this.#elDrawer.classList.add('is-open')
    this.#elOverlay?.classList.add('is-visible')
    acquireScrollLock()
    document.addEventListener('keydown', this.#handleKeydown)
    openInstances.add(this)
  }

  /** ドロワーを閉じる（Escape キー解除） */
  close() {
    if (!this.#elDrawer) return
    // 二重解放防止: 既に閉じている場合は何もしない
    if (!openInstances.has(this)) return

    this.#elDrawer.classList.remove('is-open')
    this.#elOverlay?.classList.remove('is-visible')
    document.removeEventListener('keydown', this.#handleKeydown)
    openInstances.delete(this)
    releaseScrollLock()
  }

  /** ドロワーが現在開いているか */
  get isOpen() {
    return openInstances.has(this)
  }
}
