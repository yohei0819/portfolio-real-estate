# ホームナビ — 賃貸不動産ポートフォリオサイト 機能仕様書

> **プロジェクト名**: portfolio-real-estate  
> **バージョン**: 1.0.0  
> **作成日**: 2026-03-09  
> **技術スタック**: Vite 5.4 + Vanilla JS (ESM) + Stylus + GSAP 3.12

---

## 目次

1. [プロジェクト概要](#1-プロジェクト概要)
2. [ページ構成](#2-ページ構成)
3. [共通機能（全ページ）](#3-共通機能全ページ)
4. [トップページ機能](#4-トップページ機能)
5. [物件検索ページ機能](#5-物件検索ページ機能)
6. [物件詳細ページ機能](#6-物件詳細ページ機能)
7. [駅・路線検索ページ機能](#7-駅路線検索ページ機能)
8. [データ管理](#8-データ管理)
9. [ユーティリティ](#9-ユーティリティ)
10. [アーキテクチャ設計](#10-アーキテクチャ設計)
11. [ビルド・デプロイ](#11-ビルドデプロイ)

---

## 1. プロジェクト概要

**ホームナビ**は、全国の賃貸マンション・アパート・一戸建てを検索・閲覧できるモダンな不動産ポータルサイトです。

### 主要技術

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Vite | ^5.4.0 | ビルドツール / 開発サーバー |
| GSAP | ^3.12.5 | アニメーション / ScrollTrigger |
| Stylus | ^0.63.0 | CSS プリプロセッサ |
| Vanilla JS | ES2022+ | アプリケーションロジック（フレームワーク不使用） |

### ディレクトリ構成

```
src/
├── index.html          # トップページ
├── search.html         # 物件検索ページ
├── property.html       # 物件詳細ページ
├── station.html        # 駅・路線検索ページ
├── js/
│   ├── main.js         # エントリポイント（モジュール検出・初期化）
│   ├── data/           # データ定義・ファクトリ
│   ├── modules/        # 機能モジュール（18ファイル）
│   └── utils/          # ユーティリティ関数（10ファイル）
├── styles/             # Stylus スタイルシート
└── public/             # 静的アセット
```

---

## 2. ページ構成

| ページ | ファイル | URL例 | 概要 |
|--------|---------|-------|------|
| トップ | `index.html` | `/` | ヒーロー・新着物件・特徴セクション |
| 物件検索 | `search.html` | `/search.html?area=tokyo&rent_max=10` | フィルタリング付き検索結果一覧 |
| 物件詳細 | `property.html` | `/property.html?id=1` | 個別物件の詳細情報 |
| 駅・路線検索 | `station.html` | `/station.html?area=tokyo` | 都道府県→路線→駅のステップ検索 |

---

## 3. 共通機能（全ページ）

### 3.1 ヘッダー（Header）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/Header.js` |
| **動作** | スクロール方向に応じてヘッダーの表示/非表示を切り替え |
| **非表示閾値** | 下方向スクロール時、スクロール量が100pxを超えるとヘッダーを非表示 |
| **表示復帰** | 上方向スクロールで即座に再表示 |
| **最適化** | `requestAnimationFrame` でスロットリング |
| **CSSクラス** | `is-hidden` を付与/除去 |

### 3.2 モバイルメニュー（MobileMenu）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/MobileMenu.js` |
| **トリガー** | ハンバーガーボタンクリック |
| **閉じ方** | ボタン再クリック / オーバーレイクリック / ESC キー |
| **スクロール制御** | メニュー展開中は `ScrollLock` でページスクロールを抑止 |
| **アクセシビリティ** | `aria-expanded` 属性の同期 |

### 3.3 カーソルフォロワー（CursorFollower）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/CursorFollower.js` |
| **動作** | マウスに追従するカスタムカーソルを表示 |
| **ホバー拡大** | リンク・ボタン等のインタラクティブ要素ホバー時にカーソル拡大 |
| **アニメーション** | `gsap.quickTo()` で高パフォーマンス追従 |
| **タッチデバイス** | `matchMedia('(pointer: fine)')` でタッチデバイスでは非表示 |
| **イベント委譲** | `mouseover` / `mouseout` で動的要素にも自動対応 |

### 3.4 トップへ戻るボタン（BackToTop）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/BackToTop.js` |
| **表示条件** | スクロール位置 > 400px |
| **スクロール方式** | ブラウザネイティブ smooth scroll |
| **最適化** | `requestAnimationFrame` でスロットリング |

### 3.5 スクロールアニメーション（ScrollAnimations）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/ScrollAnimations.js` |
| **初期化タイミング** | `loadingComplete` イベント受信後 |
| **アニメーション一覧** | |

| 対象 | 効果 |
|------|------|
| `.js-fade-in` 要素 | 下方40pxからフェードイン |
| ヒーローセクション | パララックス + テキスト出現タイムライン |
| カードグリッド | スタガー（時差）表示 |
| セクションタイトル | 下線のリビール（幅0→100%） |
| 検索結果テーブル行 | 行ごとのフェードイン |

- **ScrollTrigger 設定**: `start: 'top 85%'`, `toggleActions: 'play none none none'`

### 3.6 テキストアニメーション（TextAnimation）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/TextAnimation.js` |
| **対象** | `.section__title` 要素 |
| **処理** | テキストを1文字ずつ `<span>` に分解 |
| **効果** | 各文字が `opacity` / `translateY` でフェードイン（stagger: 0.04秒） |
| **最適化** | `once: true` で1回きりのトリガー |

### 3.7 ホバーアニメーション（HoverAnimations）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/HoverAnimations.js` |
| **対象** | 6種類のホバーターゲット（property-card、各種ボタン等） |
| **効果** | `scale` / `y` / `boxShadow` を GSAP で制御 |
| **イベント委譲** | 動的に追加される要素にも自動対応 |

### 3.8 ページ遷移（PageTransition）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/PageTransition.js` |
| **対象** | 内部リンク(`a[href]`) + フォーム送信 |
| **除外** | 修飾キー付きクリック / `target="_blank"` / 外部URL / `mailto:` `tel:` 等 |
| **効果** | `scaleY` トランジション（0.5秒） |
| **bfcache対応** | `pageshow` イベントで遷移レイヤーをリセット |

### 3.9 お気に入り管理（FavoriteManager）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/FavoriteManager.js` |
| **操作** | `[data-fav-id]` 要素のクリックでトグル |
| **アイコン** | ❤️（登録済み）/ 🤍（未登録） |
| **ヘッダーバッジ** | お気に入り件数をリアルタイム更新 |
| **ドロワー** | 最大30件のお気に入り物件をドロワーパネルで表示 |
| **永続化** | `localStorage` (`homenavi_favorites`) |
| **他タブ同期** | `storage` イベントで別タブの変更を検知・反映 |
| **イベント** | `EVENT.FAVORITE_TOGGLE` を発火 |

### 3.10 閲覧履歴管理（RecentlyViewedManager）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/RecentlyViewedManager.js` |
| **記録トリガー** | `PropertyLoader` が `EVENT.RECENTLY_VIEWED` を発火した時 |
| **保存内容** | 物件ID + 訪問順序（FIFO方式） |
| **上限** | 最大20件保存 / ドロワーには最新10件を表示 |
| **永続化** | `localStorage` (`homenavi_recently_viewed`) |
| **表示** | 時計アイコン + バッジ付きボタンからドロワー表示 |

### 3.11 検索履歴管理（SearchHistoryManager）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/SearchHistoryManager.js` |
| **記録トリガー** | `AreaSearch` が `EVENT.SEARCH_FILTER` を発火した時 |
| **保存内容** | URLクエリ文字列 + 人間が読める日本語ラベル |
| **ラベル例** | 「東京都 / 〜10万円 / 1LDK / マンション」 |
| **上限** | 最大10件（同一クエリは上書き） |
| **永続化** | `localStorage` (`homenavi_search_history`) |
| **操作** | 履歴クリック→条件復元 / 個別削除 / 全件クリア |

---

## 4. トップページ機能

### 4.1 ローディング画面（Loading）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/Loading.js` |
| **表示** | プログレスバー（0→100%、1.2秒） |
| **イージング** | `power2.inOut` |
| **完了処理** | 200ms後にフェードアウト → `loadingComplete` イベント発火 |
| **備考** | トップページのみ表示。他ページは即座にイベント発火 |

### 4.2 ヒーロースライダー（HeroSlider）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/HeroSlider.js` |
| **スライド枚数** | 3枚 |
| **自動再生** | 5秒間隔で自動切り替え |
| **インジケーター** | クリックで任意のスライドへ切替 + タイマーリセット |
| **タブ非表示対応** | `visibilitychange` でタブが非アクティブ時に一時停止 |

### 4.3 キーワード検索フォーム

| 項目 | 内容 |
|------|------|
| **配置** | ヒーローセクション内 |
| **動作** | フォーム送信で `search.html` へ遷移（クエリパラメータ付き） |

### 4.4 新着物件表示（NewProperties）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/NewProperties.js` |
| **表示件数** | 最大6件 |
| **優先順位** | ① `badge='NEW'` を優先 ② `buildDate` の新しい順でソート |
| **表示形式** | `property-card` 形式（カードUI） |
| **生成** | `CardBuilder.buildPropertyCard()` を使用 |

---

## 5. 物件検索ページ機能

### 5.1 エリア検索・フィルタリング（AreaSearch）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/AreaSearch.js` |

#### 対応フィルタ条件

| パラメータ | 説明 | 型 | 例 |
|-----------|------|-----|-----|
| `area` | 都道府県 | string | `tokyo` |
| `rent_min` | 最低賃料（万円） | number | `5` |
| `rent_max` | 最高賃料（万円） | number | `10` |
| `layout` | 間取り（複数可） | string[] | `1LDK,2LDK` |
| `type` | 物件タイプ | string[] | `mansion,apartment` |
| `area_min` | 最小面積（㎡） | number | `25` |
| `area_max` | 最大面積（㎡） | number | `60` |
| `age` | 築年数上限（年） | number | `10` |
| `feature` | こだわり条件 | string[] | `parking,pet` |
| `lines` | 路線（駅検索からの遷移時） | string[] | `yamanote` |
| `stations` | 駅（駅検索からの遷移時） | string[] | `新宿,渋谷` |
| `sort` | ソートキー | string | `rent-asc` |
| `page` | ページ番号 | number | `2` |

#### ソート方式

| キー | 説明 |
|------|------|
| `recommend` | 推奨順（デフォルト） |
| `rent-asc` | 賃料昇順 |
| `rent-desc` | 賃料降順 |
| `age` | 築年数（新しい順） |
| `area` | 面積（広い順） |

#### フィルタロジック

- **フィルタ関数**: `SearchFilter.parseFilterParams()` / `SearchFilter.filterProperties()` で条件照合
- **駅マッチング**: `StationMatcher` で物件テキストから駅名を抽出し路線逆引き
- **間取りマッチ**: 「3LDK+」選択時は 3LDK 以上の LDK（3LDK, 4LDK, 5LDK...）にマッチ
- **こだわり条件**: AND 方式（選択した全条件を満たす物件のみ表示）

#### ページネーション

| 項目 | 内容 |
|------|------|
| 1ページあたり | 10件 |
| URL同期 | `?page=N` でページ状態を保持 |
| 表示 | 総件数 / 現在ページ / ページ送りボタン |

#### URL同期

- 検索条件はすべてURLクエリパラメータに反映
- ブックマーク・共有・ブラウザバックに対応
- ページ読み込み時にURLから状態を自動復元

### 5.2 検索結果表示

| 項目 | 内容 |
|------|------|
| **表示形式** | `property-row`（横長カードリスト） |
| **表示内容** | 物件名 / 賃料 / 間取り / 面積 / 最寄り駅 / こだわり条件（最大4件） / 初期費用情報 |
| **生成** | `CardBuilder.buildPropertyRow()` を使用 |

---

## 6. 物件詳細ページ機能

### 6.1 物件データ読み込み（PropertyLoader）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/PropertyLoader.js` |
| **データ取得** | URLパラメータ `?id=N` から物件IDを抽出し `PropertyData` から参照 |

#### レンダリングセクション

| # | セクション | 内容 |
|---|-----------|------|
| 1 | メタ情報 | ページタイトル / meta description / OGP / パンくずリスト |
| 2 | ヒーロー | 背景グラデーション画像 |
| 3 | 基本情報 | 物件名 / 住所 / 賃料 |
| 4 | 概要テーブル | 12項目の物件詳細（間取り / 面積 / 築年数 / 方角 / 構造 / 階数 等） |
| 5 | 設備・特徴 | こだわり条件のバッジ表示 |
| 6 | 初期費用シミュレーション | 仲介手数料 / 敷金 / 礼金 / 保証会社 / 火災保険 / 鍵交換 / 合計 |
| 7 | 間取り図 | 間取りの部屋構成図 |
| 8 | 周辺施設 | 4カテゴリ（買い物 / 医療 / 教育 / 金融）の施設マップ |
| 9 | 会社情報 | 管理会社の連絡先情報 |
| 10 | お気に入りボタン | トグル式お気に入り登録 |
| 11 | 類似物件 | 同エリア・近い賃料の物件を最大6件表示 |

#### 初期費用シミュレーション計算ロジック

| 項目 | 計算方法 |
|------|---------|
| 仲介手数料 | 賃料 × 1.1（税込） |
| 保証会社 | 賃料 × 0.5 |
| 火災保険 | 賃料帯による段階料金 |
| 鍵交換 | 賃料帯による段階料金 |
| 敷金 | 賃料 × 敷金月数 |
| 礼金 | 賃料 × 礼金月数 |

#### イベント

- 物件表示時に `EVENT.RECENTLY_VIEWED` を発火（閲覧履歴に記録）

---

## 7. 駅・路線検索ページ機能

### 7.1 都道府県選択（StationSearch）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/StationSearch.js` |
| **STEP 1** | 都道府県をドロップダウンから選択 |
| **動作** | 選択変更で対応路線グループ（STEP 2）を動的に切り替え |
| **URL同期** | `?area=X` で選択状態を保持・復元 |
| **隣接都道府県** | 選択中の都道府県に関連する隣接都道府県へのクイックリンク |
| **イベント** | `EVENT.RAILWAYS_REPLACED` を発火 |

### 7.2 路線・駅選択（LineSelector）

| 項目 | 内容 |
|------|------|
| **ファイル** | `src/js/modules/LineSelector.js` |
| **STEP 2** | 路線チェックボックスを選択 → 該当路線の駅一覧を展開表示 |
| **駅データ** | `StationStops` の路線別駅一覧（物件件数付き） |
| **駅未収録路線** | 「この路線の全駅を検索対象」メッセージを表示 |

### 7.3 フローティング選択バー

| 項目 | 内容 |
|------|------|
| **表示内容** | 選択中の路線数 / 駅数をリアルタイム集計 |
| **検索ボタン** | 選択済み路線・駅 + STEP 3 の条件をURLパラメータに変換し `search.html` へ遷移 |
| **リセット** | `EVENT.RAILWAYS_REPLACED` で選択状態を初期化 |

### 7.4 条件指定（STEP 3）

| 項目 | 内容 |
|------|------|
| **配置** | 路線・駅選択の下部 |
| **条件** | 賃料 / 築年数 などの追加フィルタ |

### 7.5 人気駅セクション

| 項目 | 内容 |
|------|------|
| **配置** | ページ下部 |
| **内容** | 新宿 / 渋谷 / 池袋 / 横浜 等の人気駅へのクイックリンク |

---

## 8. データ管理

### 8.1 データフロー

```
PropertySeeds.js（コンパクトなシード定義）
    ↓ PropertyFactory.expandSeeds()
PropertyData.js（完全な物件オブジェクト）
    ↓
各モジュールが参照（AreaSearch / PropertyLoader / NewProperties）
```

### 8.2 物件データ構造（PropertyData）

#### シード定義（PropertySeeds.js）

各物件は以下の必須フィールドを持つコンパクトな定義：

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `name` | string | 物件名 |
| `areaKey` | string | 都道府県キー（例: `tokyo`） |
| `prefecture` | string | 都道府県名 |
| `city` | string | 市区町村名 |
| `address` | string | 住所 |
| `station` | string | 最寄り駅情報 |
| `totalFloors` | number | 総階数 |
| `floor` | number | 所在階 |
| `direction` | string | 方角 |
| `price` | number | 賃料（万円） |
| `managementFee` | number | 管理費（円） |
| `depositMonths` | number | 敷金（月数） |
| `keyMoneyMonths` | number | 礼金（月数） |
| `type` | string | 物件タイプ（mansion/apartment/house/maisonette） |
| `layout` | string | 間取り（例: `1LDK`） |
| `area` | number | 面積（㎡） |
| `buildDate` | string | 築年月 |
| `features` | string[] | こだわり条件（最大13項目） |
| `badge` | string? | バッジ（`NEW` / `おすすめ`） |

#### 自動生成フィールド（PropertyFactory.js）

| フィールド | 生成ロジック |
|-----------|------------|
| `gradient` | 12パターンのグラデーションからインデックスで割当 |
| `age` | `buildDate` から築年数ラベルを算出 |
| `_age` | 築年数数値（フィルタ用） |
| `floorplan` | 間取りに基づく部屋構成（LDK / 洋室 / 浴室 等）を自動生成 |
| `initialCosts` | 賃料をベースに法定費用を計算 |
| `nearby` | 市区町村名から周辺施設リストを自動生成 |
| `company` | 管理会社テンプレートを一律設定 |
| `similarIds` | 同一エリア・近い賃料の物件IDを自動関連付け |

### 8.3 都道府県データ（PrefectureData.js）

- 47都道府県マスタ（key → `{ name, region }`）
- 地域分類: 北海道 / 東北 / 関東 / 中部 / 近畿 / 中国 / 四国 / 九州・沖縄

### 8.4 駅・路線データ

#### StationData.js

| フィールド | 説明 |
|-----------|------|
| `railways` | `{ company, lines: [{ value, name, count }] }` 形式の路線グループ |
| `adjacent` | 隣接都道府県キー配列 |
| **対応都道府県** | 東京 / 神奈川 / 大阪 / 京都 等の主要都市 |

#### StationStops.js

| フィールド | 説明 |
|-----------|------|
| 構造 | `lineValue → [{ name, count }]` の路線別駅一覧 |
| 収録例 | 山手線29駅 / 中央線19駅 / 丸ノ内線20駅 / 大江戸線13駅 等 |

### 8.5 永続化（localStorage）

| キー | 管理モジュール | 保存内容 | 上限 |
|------|--------------|---------|------|
| `homenavi_favorites` | FavoriteManager | お気に入り物件IDリスト | 制限なし |
| `homenavi_recently_viewed` | RecentlyViewedManager | 閲覧済み物件IDリスト | 20件（FIFO） |
| `homenavi_search_history` | SearchHistoryManager | 検索クエリ + ラベル | 10件（FIFO、同一クエリ上書き） |

---

## 9. ユーティリティ

### 9.1 Config.js — 設定一元管理

| 定数 | 内容 |
|------|------|
| `SITE` | サイト名（`ホームナビ`）/ ドメイン / タグライン |
| `PAGE` | ページ種別定数（INDEX / SEARCH / PROPERTY / STATION） |
| `SELECTOR` | DOMセレクタ一元管理（30+キー） |
| `EVENT` | カスタムイベント名定義 |
| `ANIMATION` | GSAPパラメータ（duration / easing等） |
| `SCROLL` | 閾値定義（ヘッダー: 100px / BackToTop: 400px） |
| `CURSOR` | カーソル追従設定（offset: 10px / duration: 0.3秒） |
| `SLIDER` | 自動再生間隔（5000ms） |
| `SEARCH.perPage` | 1ページあたり表示件数（10件） |
| `SEARCH.featureMap` | こだわり条件マッピング（駐車場 / ペット可 等） |
| `SEARCH.typeMap` | 物件タイプマッピング（マンション / アパート / 一戸建て / メゾネット） |
| `STORAGE_KEY` | localStorageキー定義 |

### 9.2 DOMHelper.js — DOM操作ヘルパー

| 関数 | 説明 |
|------|------|
| `escapeHTML()` | XSS対策（`&` `<` `>` `"` `'` をエスケープ） |
| `$()` / `$$()` | `querySelector` / `querySelectorAll` の短縮形 |
| `setText()` / `setHTML()` | テキスト/HTML安全設定 |
| `getQueryParam()` | URLパラメータ取得 |
| `detectPage()` | ファイル名から現在ページ種別を判定 |
| `buildRegionOptions()` | 都道府県optgroup HTML生成 |

### 9.3 CardBuilder.js — カードHTML生成

| 関数 | 用途 |
|------|------|
| `buildFavButton()` | お気に入りボタンHTML（card / row 2バリアント） |
| `buildCardBadge()` | NEW / おすすめバッジHTML |
| `buildPropertyCard()` | カード形式HTML（トップページ / 類似物件用） |
| `buildPropertyRow()` | 行形式HTML（検索結果一覧用） |

### 9.4 SearchFilter.js — 検索フィルタ純粋関数

| 関数 | 説明 |
|------|------|
| `parseFilterParams()` | URLSearchParamsからフィルタ条件をパース |
| `filterProperties()` | 全物件配列を条件で絞り込み |
| `sortProperties()` | ソートキーに基づいてソート |
| `matchLayout()` | 間取りマッチロジック（「3LDK+」→ 3LDK以上のLDK） |
| `matchFeatures()` | こだわり条件のANDマッチング |
| `matchStationLine()` | 駅・路線フィルタの3段階マッチング |

### 9.5 StationMatcher.js — 駅マッチングロジック

| 関数 | 説明 |
|------|------|
| `extractStationName()` | 物件テキストから駅名を抽出 |
| `resolveLineKeys()` | 駅名から所属路線キーを逆引き |
| `STATION_ALIAS` | 駅名表記揺れマップ（例: 三ノ宮 ↔ 三宮） |

- **遅延初期化**: `station.html` 以外ではマップ構築コストを回避

### 9.6 StorageHelper.js — localStorage操作

| グループ | 関数 |
|---------|------|
| お気に入り | `getFavorites()` / `isFavorite(id)` / `toggleFavorite(id)` / `getFavoriteCount()` |
| 閲覧履歴 | `getRecentlyViewed()` / `addRecentlyViewed(id)` |
| 検索履歴 | `getSearchHistory()` / `saveSearchHistory()` / `removeSearchHistory()` / `clearSearchHistory()` |

- **安全性**: try-catchでJSONパース失敗やQuotaExceededErrorを処理

### 9.7 DrawerController.js — ドロワー制御

| 機能 | 説明 |
|------|------|
| **排他制御** | `openInstances` Setで同時に1つのドロワーのみ開ける |
| **操作** | `open()` / `close()` / `toggle()` / `isOpen` getter |
| **コールバック** | `onOpen` でドロワー開き直前にカスタムロジック実行 |
| **アクセシビリティ** | ESCキー対応 / `aria-expanded` 同期 |
| **スクロール制御** | `ScrollLock` ユーティリティに委譲 |

### 9.8 DrawerHelper.js — ドロワー共通ヘルパー

| 関数 | 説明 |
|------|------|
| `updateBadges()` | バッジ数値更新 |
| `renderEmptyState()` | 空状態メッセージHTML生成 |
| `renderPropertyItem()` | ドロワーアイテムHTML（`removable`オプション付き） |
| `renderPropertyList()` | ID配列→ドロワーHTML一括生成 |

### 9.9 MetaUpdater.js — メタ情報更新

| 関数 | 説明 |
|------|------|
| `updateTitle()` | `document.title` 更新 |
| `updateMetaDescription()` | `meta[name="description"]` 更新 |
| `updateOGP()` | `og:title` / `og:description` 更新 |
| `updateCanonical()` | `link[rel="canonical"]` 更新 |
| `updateBreadcrumb()` | パンくずリストHTML更新 |
| `updatePageMeta()` | 一括更新ヘルパー |

### 9.10 ScrollLock.js — スクロールロック

| 項目 | 内容 |
|------|------|
| **目的** | MobileMenu + DrawerController のスクロールロック競合防止 |
| **方式** | 参照カウンタ方式（`lockCount`） |
| **関数** | `acquireScrollLock()` → count加算 / `releaseScrollLock()` → count減算 |
| **動作** | `lockCount > 0` の間は `body { overflow: hidden }` を保持 |

---

## 10. アーキテクチャ設計

### 10.1 モジュール設計

```
main.js（エントリポイント）
├── 共通モジュール（11個）    ← 静的 import（初期バンドルに含む）
│   ├── Header
│   ├── MobileMenu
│   ├── ScrollAnimations
│   ├── PageTransition
│   ├── BackToTop
│   ├── CursorFollower
│   ├── HoverAnimations
│   ├── TextAnimation
│   ├── FavoriteManager
│   ├── RecentlyViewedManager
│   └── SearchHistoryManager
│
└── ページ固有モジュール      ← Promise.all で動的 import（レイジーロード）
    ├── INDEX:    Loading, HeroSlider, NewProperties
    ├── SEARCH:   AreaSearch
    ├── PROPERTY: PropertyLoader
    └── STATION:  StationSearch, LineSelector
```

### 10.2 イベント駆動設計

| イベント名 | 発火元 | 購読者 |
|-----------|--------|--------|
| `loadingComplete` | Loading / main.js | ScrollAnimations |
| `EVENT.FAVORITE_TOGGLE` | FavoriteManager | 各コンポーネント |
| `EVENT.RECENTLY_VIEWED` | PropertyLoader | RecentlyViewedManager |
| `EVENT.SEARCH_FILTER` | AreaSearch | SearchHistoryManager |
| `EVENT.RAILWAYS_REPLACED` | StationSearch | LineSelector |

### 10.3 状態管理

| 状態種別 | 管理方法 | 用途 |
|---------|---------|------|
| 永続データ | `localStorage` | お気に入り / 閲覧履歴 / 検索履歴 |
| URL状態 | クエリパラメータ | 検索条件 / ページ番号 / エリア選択 |
| DOM状態 | CSSクラス | `is-active` / `is-checked` / `is-hidden` 等 |

### 10.4 パフォーマンス最適化

| 手法 | 適用箇所 |
|------|---------|
| `requestAnimationFrame` スロットリング | Header / BackToTop のスクロールリスナー |
| `gsap.quickTo()` | CursorFollower のGC負荷軽減 |
| `passive: true` リスナー | スクロールイベント |
| 動的 `import()` | ページ固有モジュールのレイジーロード |
| 遅延初期化 | StationMatcher（station.htmlのみマップ構築） |
| DOMクエリキャッシュ | プライベート変数で参照保持 |
| イベント委譲 | 動的要素の一括ハンドリング |

### 10.5 セキュリティ対策

| 対策 | 実装 |
|------|------|
| XSS防止 | `DOMHelper.escapeHTML()` でユーザー入力をサニタイズ |
| localStorage安全性 | try-catchでJSONパースエラー / QuotaExceededError を処理 |

---

## 11. ビルド・デプロイ

### 開発サーバー

```bash
npm run dev    # ポート3000で起動
```

### 本番ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

### GitHub Pages デプロイ

- 環境変数 `GITHUB_PAGES=true` でベースパスを `./` に自動切り替え
- マルチページ設定: 4つのHTMLファイルを個別エントリポイントとして管理

### Vite設定

| 項目 | 内容 |
|------|------|
| エントリポイント | `index.html` / `search.html` / `property.html` / `station.html` |
| 開発ポート | 3000 |
| ベースパス | デフォルト: `/` / GitHub Pages: `./` |
