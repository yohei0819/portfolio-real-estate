/**
 * 物件データ自動生成ファクトリ
 *
 * コンパクトなシード定義（~10行）から物件詳細ページに必要な
 * 全フィールドを自動補完する。新規物件追加は PropertySeeds.js に
 * シードを追加するだけで完了する。
 *
 * ■ シードに必要なフィールド（最小構成）:
 *   name, areaKey, prefecture, city, address, station,
 *   totalFloors, floor, direction,
 *   price, managementFee, depositMonths, keyMoneyMonths,
 *   type, layout, area, buildDate, features
 *
 * ■ オプション（省略時は自動生成）:
 *   badge, gradient, parking, structure, age,
 *   floorplan, initialCosts, nearby, company, similarIds
 */

// ================================================================
// グラデーションプリセット（カード背景色）
// ================================================================
const GRADIENTS = [
  'linear-gradient(135deg, #f5e6d3, #e8d5c4)',
  'linear-gradient(135deg, #d3e5f5, #c4d5e8)',
  'linear-gradient(135deg, #d3f5e6, #c4e8d5)',
  'linear-gradient(135deg, #f5d3d3, #e8c4c4)',
  'linear-gradient(135deg, #e6d3f5, #d5c4e8)',
  'linear-gradient(135deg, #f5f0d3, #e8e0c4)',
  'linear-gradient(135deg, #f5d3e8, #e8c4d5)',
  'linear-gradient(135deg, #d3f5f5, #c4e8e8)',
  'linear-gradient(135deg, #e8e6d3, #dbd5c4)',
  'linear-gradient(135deg, #d3e6f0, #c4d5e0)',
  'linear-gradient(135deg, #f0e6d3, #e0d5c4)',
  'linear-gradient(135deg, #d3f0e6, #c4e0d5)',
]

// ================================================================
// 構造体マッピング
// ================================================================
const STRUCTURE_MAP = {
  'マンション': 'RC造（鉄筋コンクリート）',
  'アパート': '軽量鉄骨造',
  '一戸建て': '木造2階建',
  'メゾネット': 'RC造（鉄筋コンクリート）',
}

// ================================================================
// コンビニ・スーパーブランド（周辺施設テンプレート用）
// ================================================================
const CONV_STORES = ['セブンイレブン', 'ローソン', 'ファミリーマート']
const SUPERMARKETS = ['マックスバリュ', 'イオン', 'ライフ']

// ================================================================
// 初期費用の定数設定
// ================================================================
const COST_CONFIG = {
  /** 仲介手数料率（税込 = 賃料 × 1.0 + 消費税10%） */
  BROKERAGE_RATE: 1.1,
  /** 保証会社利用料率（賃料に対する割合） */
  GUARANTOR_RATE: 0.5,
  /** 火災保険料（円）— 賃料 threshold 万円以上: high / 未満: low */
  INSURANCE: { high: 20_000, low: 15_000, threshold: 8 },
  /** 鍵交換費用（円）— 賃料 threshold 万円以上: high / 未満: low */
  KEY_EXCHANGE: { high: 22_000, low: 16_500, threshold: 8 },
}

// ================================================================
// 初期費用キー（PropertyData.js と共有）
// ================================================================
/** 初期費用の合計計算に使用するキー一覧 */
export const COST_KEYS = [
  'deposit', 'keyMoney', 'rent', 'management',
  'brokerage', 'insurance', 'guarantorFee', 'keyExchange',
]

// ================================================================
// 内部ユーティリティ
// ================================================================

/** 現在年（築年数計算で共用。モジュール間で重複定義を避けるためエクスポート） */
export const CURRENT_YEAR = new Date().getFullYear()
const M2_PER_JO = 1.62

/** 帖数を 0.5 単位に丸め（最低 3 帖） */
function roundHalfJo(m2) {
  return Math.max(3, Math.round((m2 / M2_PER_JO) * 2) / 2)
}

/**
 * 都市名から施設名に使う短縮ラベルを抽出
 * 「大阪市中央区」→「中央」、「渋谷区」→「渋谷」、「四日市市」→「四日市」
 */
function getCityLabel(city) {
  // 「○○市△△区」形式 → 区名部分
  const kuMatch = city.match(/市(.+?)区$/)
  if (kuMatch) return kuMatch[1]

  // 「渋谷区」「品川区」形式
  const simpleKu = city.match(/^(.+?)区$/)
  if (simpleKu) return simpleKu[1]

  // 「青森市」「四日市市」→ 末尾の市だけ除去
  return city.replace(/市$/, '')
}

// ================================================================
// シードバリデーション
// ================================================================

/** シードに必須のフィールド一覧 */
const REQUIRED_SEED_KEYS = [
  'name', 'areaKey', 'prefecture', 'city', 'address', 'station',
  'totalFloors', 'floor', 'direction',
  'price', 'managementFee', 'depositMonths', 'keyMoneyMonths',
  'type', 'layout', 'area', 'buildDate', 'features',
]

/**
 * シードの必須フィールド検証（開発時の入力ミス検出用）
 * @param {Object} seed   シードオブジェクト
 * @param {number} index  シード配列内のインデックス
 */
function validateSeed(seed, index) {
  const missing = REQUIRED_SEED_KEYS.filter(key => seed[key] === undefined)
  if (missing.length > 0) {
    console.warn(
      `[PropertyFactory] シード #${index}（${seed.name ?? '名称不明'}）に必須フィールドが不足: ${missing.join(', ')}`,
    )
  }
}

/** 居住面積率（浴室・WC・玄関・廊下を除いた比率） */
const USABLE_AREA_RATIO = 0.75

// ================================================================
// 自動生成関数
// ================================================================

/**
 * buildDate 文字列から年を抽出（ソート等の数値比較用）
 * @param {string} buildDate  例: '2023年6月'
 * @returns {number}  年（取得できない場合は 0）
 */
export function extractYear(buildDate) {
  const m = buildDate?.match(/(\d{4})年/)
  return m ? Number(m[1]) : 0
}

/**
 * buildDate 文字列 → 築年数ラベル
 * 他モジュール（NewProperties, AreaSearch 等）でも利用するためエクスポート
 * @param {string} buildDate  例: '2023年6月'
 * @returns {string} 例: '築3年'
 */
export function buildAge(buildDate) {
  const year = extractYear(buildDate)
  if (!buildDate || year === 0) return '不明'
  const y = CURRENT_YEAR - year
  return y <= 0 ? '新築' : `築${y}年`
}

/**
 * 間取り + 面積 → floorplan オブジェクトを自動生成
 * @param {string} layout  例: '2LDK'
 * @param {number} area    専有面積（㎡）
 * @returns {{ label: string, rooms: Object[] }}
 */
function buildFloorplan(layout, area, type = 'マンション') {
  const rooms = []
  const usable = area * USABLE_AREA_RATIO

  const m = layout.match(/^(\d+)(R|K|DK|LDK|SLDK)$/)

  if (!m) {
    // フォールバック
    rooms.push({ type: 'ldk', name: 'LDK', size: `${roundHalfJo(usable * 0.6)}帖` })
    rooms.push({ type: 'bed', name: '洋室', size: `${roundHalfJo(usable * 0.4)}帖` })
  } else {
    const n = Number(m[1])
    const rt = m[2]
    const isSldk = rt === 'SLDK'

    // リビング面積比率（間取りタイプ別）
    const ratio = rt === 'R' ? 1.0
      : rt === 'K' ? 0.15
      : rt === 'DK' ? 0.30
      : n === 1 ? 0.55 : 0.45

    const livingM2 = usable * ratio
    // SLDK はサービスルーム分を加味して按分
    const divider = Math.max(1, isSldk ? n + 1 : n)
    const bedM2 = rt === 'R' ? 0 : (usable - livingM2) / divider

    if (rt === 'R') {
      rooms.push({ type: 'ldk', name: '居室', size: `${roundHalfJo(livingM2)}帖` })
    } else {
      const ldkName = rt === 'K' ? 'K' : rt === 'DK' ? 'DK' : 'LDK'
      rooms.push({ type: 'ldk', name: ldkName, size: `${roundHalfJo(livingM2)}帖` })
      for (let i = 0; i < n; i++) {
        rooms.push({ type: 'bed', name: '洋室', size: `${roundHalfJo(bedM2)}帖` })
      }
      if (isSldk) {
        rooms.push({ type: 'service', name: 'S（納戸）', size: `${roundHalfJo(bedM2 * 0.7)}帖` })
      }
    }
  }

  // 共通設備（物件タイプに応じて外部空間を切替え）
  rooms.push(
    { type: 'bath', name: '浴室' },
    { type: 'wc', name: 'WC' },
    { type: 'entrance', name: '玄関' },
  )
  if (type === '一戸建て') {
    rooms.push({ type: 'garden', name: '庭' })
  } else {
    rooms.push({ type: 'balcony', name: 'バルコニー' })
  }

  return { label: `${layout} ／ ${area}㎡`, rooms }
}

/**
 * 賃料情報 → 初期費用オブジェクトを自動計算
 * total は PropertyData.js の COST_KEYS ループで各項目の合計として一括計算される
 */
function buildInitialCosts(price, mgmt, depM, keyM) {
  const yen = Math.round(price * 10_000)
  const { BROKERAGE_RATE, GUARANTOR_RATE, INSURANCE, KEY_EXCHANGE } = COST_CONFIG
  const insAmt = price >= INSURANCE.threshold ? INSURANCE.high : INSURANCE.low
  const keyAmt = price >= KEY_EXCHANGE.threshold ? KEY_EXCHANGE.high : KEY_EXCHANGE.low

  return {
    deposit:      { label: '敷金',          amount: yen * depM,                        note: depM ? `${depM}ヶ月` : 'なし' },
    keyMoney:     { label: '礼金',          amount: yen * keyM,                        note: keyM ? `${keyM}ヶ月` : 'なし' },
    rent:         { label: '前家賃',         amount: yen,                              note: '1ヶ月' },
    management:   { label: '管理費・共益費',   amount: mgmt },
    brokerage:    { label: '仲介手数料',      amount: Math.round(yen * BROKERAGE_RATE), note: '税込' },
    insurance:    { label: '火災保険料',      amount: insAmt,                           note: '2年間' },
    guarantorFee: { label: '保証会社利用料',   amount: Math.round(yen * GUARANTOR_RATE), note: '賃料50%' },
    keyExchange:  { label: '鍵交換費用',      amount: keyAmt,                           note: '税込' },
    // total は PropertyData.js で全物件一括計算される（手動物件も含む）
    total: 0,
  }
}

/**
 * 都道府県名・都市名 → 周辺施設テンプレートを生成
 */
function buildNearby(prefecture, city) {
  // 北海道は「道」を除去しない（「北海」にならないよう特別扱い）
  const prefShort = prefecture === '北海道'
    ? '北海道'
    : prefecture.replace(/[都府県]$/, '')
  const label = getCityLabel(city)
  const idx = (label.charCodeAt(0) || 0) % 3

  return {
    shopping: [
      { name: `${CONV_STORES[idx]}${label}駅前店`, distance: '徒歩2分（約160m）' },
      { name: `${SUPERMARKETS[idx]}${label}店`, distance: '徒歩5分（約400m）' },
      { name: `ドラッグストア${label}店`, distance: '徒歩4分（約320m）' },
    ],
    medical: [
      { name: `${label}駅前クリニック`, distance: '徒歩3分（約240m）' },
      { name: `${prefShort}中央病院`, distance: '車で10分' },
    ],
    education: [
      { name: `${label}小学校`, distance: '徒歩7分（約560m）' },
      { name: `${label}中学校`, distance: '徒歩10分（約800m）' },
    ],
    finance: [
      { name: `ゆうちょ銀行${label}支店`, distance: '徒歩5分（約400m）' },
      { name: `${label}郵便局`, distance: '徒歩6分（約480m）' },
    ],
  }
}

/**
 * 都道府県名・都市名 → 会社情報を生成
 */
function buildCompany(prefecture, city) {
  const label = getCityLabel(city)
  return {
    name: `ホームナビ${label}店`,
    address: `${prefecture}${city}1-1-1`,
    hours: '10:00〜19:00',
    holiday: '水曜日',
  }
}

// ================================================================
// エクスポート関数
// ================================================================

/**
 * シードデータから完全な物件オブジェクトを生成
 * シードに明示的に設定されたフィールドは上書きしない
 * @param {number} id    物件ID
 * @param {Object} seed  コンパクトなシードデータ
 * @returns {Object}     完全な物件オブジェクト
 */
export function createProperty(id, seed) {
  return {
    // ── デフォルト値 ──
    parking: 'なし（近隣月極駐車場あり）',
    moveIn: '即入居可',
    contract: '2年間（普通借家）',
    guarantor: '利用必須（月額賃料の50%）',
    transaction: '仲介',
    badge: '',
    // ── シードで上書き ──
    ...seed,
    // ── 自動計算フィールド（シードに無い場合のみ生成） ──
    age:          seed.age          || buildAge(seed.buildDate),
    structure:    seed.structure    || STRUCTURE_MAP[seed.type] || 'RC造（鉄筋コンクリート）',
    gradient:     seed.gradient     || GRADIENTS[id % GRADIENTS.length],
    floorplan:    seed.floorplan    || buildFloorplan(seed.layout, seed.area, seed.type),
    initialCosts: seed.initialCosts || buildInitialCosts(seed.price, seed.managementFee, seed.depositMonths, seed.keyMoneyMonths),
    nearby:       seed.nearby       || buildNearby(seed.prefecture, seed.city),
    company:      seed.company      || buildCompany(seed.prefecture, seed.city),
    similarIds:   seed.similarIds   || [],
  }
}

/**
 * シード配列を展開し、ID付きオブジェクトに変換
 * @param {Object[]} seeds    シード配列
 * @param {number}   startId  開始ID
 * @returns {Object}          { [id]: property, ... }
 */
export function expandSeeds(seeds, startId) {
  const result = {}
  for (let i = 0; i < seeds.length; i++) {
    validateSeed(seeds[i], i)
    const id = startId + i
    result[id] = createProperty(id, seeds[i])
  }
  return result
}

/**
 * similarIds が空の物件に自動で類似物件IDを割り当てる
 * 同エリア優先 → 価格帯近似で最大3件を設定
 * @param {Object} properties  全物件オブジェクト（既存 + 生成済み）
 */
export function assignSimilarIds(properties) {
  const allIds = Object.keys(properties).map(Number)

  for (const id of allIds) {
    const p = properties[id]
    if (p.similarIds.length > 0) continue // 手動設定済みはスキップ

    const candidates = allIds.filter((oid) => oid !== id)
    /** 価格差で昇順ソート（同エリア・全体共通） */
    const priceDiff = (a, b) =>
      Math.abs(properties[a].price - p.price) - Math.abs(properties[b].price - p.price)

    // 同エリア物件を価格近似順で優先（最大2件）
    const sameArea = candidates
      .filter((oid) => properties[oid].areaKey === p.areaKey)
      .sort(priceDiff)

    // 価格帯が近い物件で補完
    const byPrice = [...candidates].sort(priceDiff)

    const result = new Set(sameArea.slice(0, 2))
    for (const oid of byPrice) {
      if (result.size >= 3) break
      result.add(oid)
    }
    p.similarIds = [...result].slice(0, 3)
  }
}
