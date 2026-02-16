/**
 * 最近見た物件モジュール
 *
 * 全ページで動作する共通モジュール。
 * - 物件詳細ページ表示時に自動記録（PropertyLoader の後で発火）
 * - ヘッダーの最近見た物件リンクからドロワー表示
 *
 * localStorage を StorageHelper 経由で操作。
 * ドロワー開閉は DrawerController に委譲（排他制御・スクロールロック一元管理）。
 */

import { EVENT, STORAGE_KEY } from '../utils/Config.js'
import { $ } from '../utils/DOMHelper.js'
import PROPERTIES from '../data/PropertyData.js'
import DrawerController from '../utils/DrawerController.js'
import { getRecentlyViewed, addRecentlyViewed } from '../utils/StorageHelper.js'
import { updateBadges, renderPropertyList } from '../utils/DrawerHelper.js'

/** ドロワーに表示する最大件数 */
const DRAWER_MAX = 10

/** バッジセレクタ */
const BADGE_SELECTOR = '[data-recent-badge]'

export default class RecentlyViewedManager {
  /** @type {DrawerController} */
  #drawer

  constructor() {
    this.#drawer = new DrawerController({
      drawerId: 'recentDrawer',
      overlayId: 'recentDrawerOverlay',
      toggleAttr: 'data-recent-drawer-toggle',
      onOpen: () => this.#renderDrawerContent(),
    })
    this.#init()
  }

  #init() {
    this.#listenEvents()
    this.#updateBadge()
  }

  // ==============================================================
  // バッジ
  // ==============================================================

  #updateBadge() {
    updateBadges(BADGE_SELECTOR, getRecentlyViewed().length)
  }

  // ==============================================================
  // 物件閲覧の自動記録
  // ==============================================================

  #listenEvents() {
    // PropertyLoader が物件を読み込んだ後に発火するカスタムイベントを監視
    document.addEventListener(EVENT.RECENTLY_VIEWED, (e) => {
      const id = e.detail?.id
      if (typeof id === 'number' && PROPERTIES[id]) {
        addRecentlyViewed(id)
        this.#updateBadge()
      }
    })

    // 他タブで localStorage が変更された場合
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY.recentlyViewed) {
        this.#updateBadge()
        if (this.#drawer.isOpen) this.#renderDrawerContent()
      }
    })
  }

  // ==============================================================
  // ドロワー描画
  // ==============================================================

  #renderDrawerContent() {
    const container = $('#recentDrawerContent')
    if (!container) return

    const ids = getRecentlyViewed().slice(0, DRAWER_MAX)

    container.innerHTML = renderPropertyList(ids, {
      removable: false,
      emptyMessage: '最近見た物件はありません',
      emptyHint: '物件の詳細ページを閲覧すると自動的に記録されます',
    })
  }
}
