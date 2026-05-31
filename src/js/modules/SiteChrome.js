/**
 * 共通レイアウト（サイトクローム）の注入。
 *
 * 各 HTML のプレースホルダー（[data-chrome="top"] / [data-chrome="bottom"]）に
 * 共通マークアップを流し込み、サイト全体の構造化データ（WebSite / Organization）を
 * <head> に登録する。
 *
 * 注意: ヘッダーやドロワーを参照する他モジュール（Header / MobileMenu /
 * FavoriteManager 等）の初期化より前に呼び出すこと。
 */

import { CHROME_TOP_HTML, CHROME_BOTTOM_HTML } from '../templates/chrome.js'
import { setJsonLd, buildWebSiteSchema, buildOrganizationSchema } from '../utils/JsonLd.js'

/**
 * プレースホルダーへ共通マークアップを注入し、サイト共通の構造化データを登録する。
 * プレースホルダーが無いページ（旧構成）では何もしない。
 */
export function renderSiteChrome() {
  const top = document.querySelector('[data-chrome="top"]')
  if (top && !top.dataset.chromeRendered) {
    top.innerHTML = CHROME_TOP_HTML
    top.dataset.chromeRendered = 'true'
  }

  const bottom = document.querySelector('[data-chrome="bottom"]')
  if (bottom && !bottom.dataset.chromeRendered) {
    bottom.innerHTML = CHROME_BOTTOM_HTML
    bottom.dataset.chromeRendered = 'true'
  }

  // サイト全体で共通の構造化データ
  setJsonLd('website', buildWebSiteSchema())
  setJsonLd('organization', buildOrganizationSchema())
}
