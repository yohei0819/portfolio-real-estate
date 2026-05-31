/**
 * 共通レイアウト（サイトクローム）テンプレート
 *
 * 全ページで完全に重複していたヘッダー・モバイルナビ・フッター・
 * ドロワー等のマークアップを単一の真実の源として集約する。
 *
 * 各 HTML には注入用プレースホルダーのみを置き、SiteChrome モジュールが
 * DOMContentLoaded 直後（他モジュールの初期化前）にこの HTML を流し込む。
 *
 *   <div data-chrome="top"></div>     → ページ遷移演出・ヘッダー・モバイルナビ
 *   <div data-chrome="bottom"></div>  → フッター・トップへ戻る・各ドロワー
 */

/** ページ遷移演出 + カーソルフォロワー + ヘッダー + モバイルナビ */
export const CHROME_TOP_HTML = `
  <!-- ページ遷移 -->
  <div class="page-transition" id="pageTransition">
    <div class="page-transition__layer"></div>
  </div>

  <!-- カーソルフォロワー -->
  <div class="cursor-follower" id="cursorFollower"></div>

  <!-- ヘッダー -->
  <header class="header" id="header">
    <div class="header__inner">
      <a href="./" class="header__logo">
        <span class="header__logo-text"><span aria-hidden="true">🏠</span> ホームナビ</span>
      </a>

      <nav class="header__nav">
        <a href="./" class="header__nav-item">
          <span class="icon" aria-hidden="true">🔍</span>
          <span class="label">物件検索</span>
        </a>
        <a href="./station.html" class="header__nav-item">
          <span class="icon" aria-hidden="true">🚃</span>
          <span class="label">沿線・駅</span>
        </a>
        <a href="./search.html" class="header__nav-item">
          <span class="icon" aria-hidden="true">📍</span>
          <span class="label">エリア</span>
        </a>
        <button type="button" class="header__nav-item" data-fav-drawer-toggle aria-haspopup="dialog" aria-expanded="false">
          <span class="icon" aria-hidden="true">⭐</span>
          <span class="label">お気に入り</span>
          <span class="header__nav-badge" data-fav-badge hidden></span>
        </button>
        <button type="button" class="header__nav-item" data-recent-drawer-toggle aria-haspopup="dialog" aria-expanded="false">
          <span class="icon" aria-hidden="true">🕐</span>
          <span class="label">最近見た物件</span>
          <span class="header__nav-badge" data-recent-badge hidden></span>
        </button>
        <button type="button" class="header__nav-item" data-search-drawer-toggle aria-haspopup="dialog" aria-expanded="false">
          <span class="icon" aria-hidden="true">📋</span>
          <span class="label">検索した条件</span>
          <span class="header__nav-badge" data-search-badge hidden></span>
        </button>
        <div class="header__nav-menu">
          <button type="button" class="header__nav-item header__nav-item--menu" aria-haspopup="true" aria-expanded="false">
            <span class="icon" aria-hidden="true">☰</span>
            <span class="label">メニュー</span>
          </button>
          <div class="header__dropdown">
            <a href="./" class="header__dropdown-item"><span aria-hidden="true">🔍</span> 物件検索</a>
            <a href="./station.html" class="header__dropdown-item"><span aria-hidden="true">🚃</span> 沿線・駅から探す</a>
            <a href="./search.html" class="header__dropdown-item"><span aria-hidden="true">📍</span> エリアから探す</a>
            <a href="./property.html" class="header__dropdown-item"><span aria-hidden="true">🏠</span> 物件一覧</a>
          </div>
        </div>
      </nav>

      <button class="header__menu-btn" id="menuBtn" aria-label="メニューを開く">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <!-- モバイルメニュー -->
  <nav class="mobile-nav" id="mobileNav" aria-label="モバイルナビゲーション">
    <div class="mobile-nav__inner">
      <a href="./" class="mobile-nav__item"><span aria-hidden="true">🔍</span> 物件検索</a>
      <a href="./station.html" class="mobile-nav__item"><span aria-hidden="true">🚃</span> 沿線・駅から探す</a>
      <a href="./search.html" class="mobile-nav__item"><span aria-hidden="true">📍</span> エリアから探す</a>
      <a href="./property.html" class="mobile-nav__item"><span aria-hidden="true">🏠</span> 物件一覧</a>
      <button type="button" class="mobile-nav__item" data-fav-drawer-toggle aria-haspopup="dialog" aria-expanded="false"><span aria-hidden="true">⭐</span> お気に入り <span class="header__nav-badge" data-fav-badge hidden></span></button>
      <button type="button" class="mobile-nav__item" data-recent-drawer-toggle aria-haspopup="dialog" aria-expanded="false"><span aria-hidden="true">🕐</span> 最近見た物件 <span class="header__nav-badge" data-recent-badge hidden></span></button>
      <button type="button" class="mobile-nav__item" data-search-drawer-toggle aria-haspopup="dialog" aria-expanded="false"><span aria-hidden="true">📋</span> 検索した条件 <span class="header__nav-badge" data-search-badge hidden></span></button>
    </div>
  </nav>
`

/** 都道府県フッターリンク（地域 → 県）定義 */
const FOOTER_AREAS = [
  ['hokkaido', '北海道'], ['aomori', '青森'], ['iwate', '岩手'], ['miyagi', '宮城'],
  ['akita', '秋田'], ['yamagata', '山形'], ['fukushima', '福島'], ['ibaraki', '茨城'],
  ['tochigi', '栃木'], ['gunma', '群馬'], ['saitama', '埼玉'], ['chiba', '千葉'],
  ['tokyo', '東京'], ['kanagawa', '神奈川'], ['niigata', '新潟'], ['toyama', '富山'],
  ['ishikawa', '石川'], ['fukui', '福井'], ['yamanashi', '山梨'], ['nagano', '長野'],
  ['gifu', '岐阜'], ['shizuoka', '静岡'], ['aichi', '愛知'], ['mie', '三重'],
  ['shiga', '滋賀'], ['kyoto', '京都'], ['osaka', '大阪'], ['hyogo', '兵庫'],
  ['nara', '奈良'], ['wakayama', '和歌山'], ['tottori', '鳥取'], ['shimane', '島根'],
  ['okayama', '岡山'], ['hiroshima', '広島'], ['yamaguchi', '山口'], ['tokushima', '徳島'],
  ['kagawa', '香川'], ['ehime', '愛媛'], ['kochi', '高知'], ['fukuoka', '福岡'],
  ['saga', '佐賀'], ['nagasaki', '長崎'], ['kumamoto', '熊本'], ['oita', '大分'],
  ['miyazaki', '宮崎'], ['kagoshima', '鹿児島'], ['okinawa', '沖縄'],
]

const FOOTER_AREA_LINKS = FOOTER_AREAS
  .map(([key, name]) => `<a href="./search.html?area=${key}">${name}</a>`)
  .join('\n          ')

/** フッター + トップへ戻る + 各ドロワー */
export const CHROME_BOTTOM_HTML = `
  <!-- フッター -->
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__top">
        <div class="footer__col">
          <h3 class="footer__col-title">物件を探す</h3>
          <ul class="footer__col-list">
            <li><a href="./station.html">沿線・駅から探す</a></li>
            <li><a href="./search.html">エリアから探す</a></li>
            <li><a href="./search.html">地図から探す</a></li>
            <li><a href="./search.html">通勤・通学時間から探す</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h3 class="footer__col-title">こだわり条件</h3>
          <ul class="footer__col-list">
            <li><a href="./search.html">ペット可</a></li>
            <li><a href="./search.html">デザイナーズ</a></li>
            <li><a href="./search.html">タワーマンション</a></li>
            <li><a href="./search.html">リノベーション</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h3 class="footer__col-title">お役立ち情報</h3>
          <ul class="footer__col-list">
            <li><a href="#" aria-disabled="true" tabindex="-1">家賃相場</a></li>
            <li><a href="#" aria-disabled="true" tabindex="-1">引越しの手続き</a></li>
            <li><a href="#" aria-disabled="true" tabindex="-1">住まいの基礎知識</a></li>
            <li><a href="#" aria-disabled="true" tabindex="-1">よくある質問</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h3 class="footer__col-title">ホームナビについて</h3>
          <ul class="footer__col-list">
            <li><a href="#" aria-disabled="true" tabindex="-1">会社概要</a></li>
            <li><a href="#" aria-disabled="true" tabindex="-1">採用情報</a></li>
            <li><a href="#" aria-disabled="true" tabindex="-1">プライバシーポリシー</a></li>
            <li><a href="#" aria-disabled="true" tabindex="-1">お問い合わせ</a></li>
          </ul>
        </div>
      </div>

      <div class="footer__middle">
        <p class="footer__area-title">■ 全国の地域から賃貸物件を探す</p>
        <div class="footer__area-links">
          ${FOOTER_AREA_LINKS}
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__sns">
          <a href="#" aria-label="Twitter" aria-disabled="true" tabindex="-1">𝕏</a>
          <a href="#" aria-label="Facebook" aria-disabled="true" tabindex="-1">f</a>
          <a href="#" aria-label="Instagram" aria-disabled="true" tabindex="-1">📷</a>
          <a href="#" aria-label="YouTube" aria-disabled="true" tabindex="-1">▶</a>
        </div>
        <p class="footer__copyright">&copy; 2026 HomeNavi Corporation. All Rights Reserved.</p>
      </div>
    </div>
  </footer>

  <!-- トップへ戻る -->
  <button class="back-to-top" id="backToTop" aria-label="ページトップへ戻る">↑</button>

  <!-- ドロワー: お気に入り -->
  <div class="drawer-overlay" id="favDrawerOverlay"></div>
  <aside class="drawer" id="favDrawer" aria-label="お気に入り一覧">
    <div class="drawer__header">
      <h2 class="drawer__title">⭐ お気に入り</h2>
      <button class="drawer__close" aria-label="閉じる">✕</button>
    </div>
    <div class="drawer__body" id="favDrawerContent"></div>
  </aside>

  <!-- ドロワー: 最近見た物件 -->
  <div class="drawer-overlay" id="recentDrawerOverlay"></div>
  <aside class="drawer" id="recentDrawer" aria-label="最近見た物件">
    <div class="drawer__header">
      <h2 class="drawer__title">🕐 最近見た物件</h2>
      <button class="drawer__close" aria-label="閉じる">✕</button>
    </div>
    <div class="drawer__body" id="recentDrawerContent"></div>
  </aside>

  <!-- ドロワー: 検索した条件 -->
  <div class="drawer-overlay" id="searchDrawerOverlay"></div>
  <aside class="drawer" id="searchDrawer" aria-label="検索した条件">
    <div class="drawer__header">
      <h2 class="drawer__title">📋 検索した条件</h2>
      <button class="drawer__close" aria-label="閉じる">✕</button>
    </div>
    <div class="drawer__body" id="searchDrawerContent"></div>
  </aside>
`
