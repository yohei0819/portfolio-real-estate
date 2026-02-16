/**
 * 駅・路線マッチングユーティリティ
 *
 * 物件データと路線・駅検索パラメータの照合ロジックを一元管理する。
 * AreaSearch から分離し、テスタビリティと保守性を向上。
 *
 * 責務:
 *   - StationStops / StationData からの逆引きマップ構築
 *   - 物件テキストからの駅名抽出
 *   - 駅名エイリアス解決
 *   - 路線・駅フィルタの3段階マッチング
 */

import STATION_DATA from '../data/StationData.js'
import STATION_STOPS from '../data/StationStops.js'

// ----------------------------------------------------------------
// 定数
// ----------------------------------------------------------------

/**
 * 同じ駅で表記が異なるケースの正規化マップ
 * 「三ノ宮」(JR) ↔「三宮」(地下鉄) 等の表記揺れを吸収
 */
const STATION_ALIAS = new Map([
  ['三ノ宮', '三宮'],
  ['三宮', '三ノ宮'],
])

// ----------------------------------------------------------------
// マップ構築（モジュールロード時に一度だけ構築）
// ----------------------------------------------------------------

/**
 * StationStops の路線別駅データから
 * 駅名 → Set<路線キー> の逆引きマップを構築
 * @returns {Map<string, Set<string>>}
 */
function buildStationToLinesMap() {
  /** @type {Map<string, Set<string>>} */
  const map = new Map()
  for (const [lineKey, stops] of Object.entries(STATION_STOPS)) {
    for (const s of stops) {
      if (!map.has(s.name)) map.set(s.name, new Set())
      map.get(s.name).add(lineKey)
    }
  }
  return map
}

/**
 * StationData の全路線から
 * 路線キー → 路線名 のフラットマップを構築（メタ情報表示用）
 * @returns {Map<string, string>}
 */
function buildLineNameMap() {
  /** @type {Map<string, string>} */
  const map = new Map()
  for (const pref of Object.values(STATION_DATA)) {
    for (const company of pref.railways) {
      for (const line of company.lines) {
        map.set(line.value, line.name)
      }
    }
  }
  return map
}

/**
 * StationData から 路線キー → 都道府県キー のマップを構築
 * StationStops に駅データがない路線の都道府県フォールバック用
 * @returns {Map<string, string>}
 */
function buildLineToPrefMap() {
  /** @type {Map<string, string>} */
  const map = new Map()
  for (const [prefKey, pref] of Object.entries(STATION_DATA)) {
    for (const company of pref.railways) {
      for (const line of company.lines) {
        map.set(line.value, prefKey)
      }
    }
  }
  return map
}

// ----------------------------------------------------------------
// 遅延初期化（Lazy Initialization）
// station.html 以外のページでは StationStops / StationData の
// 全マップ構築コストを回避する
// ----------------------------------------------------------------

/** @type {Map<string, Set<string>>|null} 駅名 → 所属路線キー集合 */
let _stationToLines = null
/** @type {Map<string, string>|null} 路線キー → 表示用路線名 */
let _lineNames = null
/** @type {Map<string, string>|null} 路線キー → 都道府県キー */
let _lineToPref = null

/** 駅名 → 所属路線キー集合（遅延構築） */
function getStationToLines() {
  if (!_stationToLines) _stationToLines = buildStationToLinesMap()
  return _stationToLines
}

/** 路線キー → 表示用路線名（遅延構築） */
function getLineNames() {
  if (!_lineNames) _lineNames = buildLineNameMap()
  return _lineNames
}

/** 路線キー → 都道府県キー（遅延構築） */
function getLineToPref() {
  if (!_lineToPref) _lineToPref = buildLineToPrefMap()
  return _lineToPref
}

/**
 * 路線名マップへの読み取り専用アクセス（外部参照用）
 * @type {{ get(key: string): string|undefined }}
 */
export const LINE_NAMES = { get: (key) => getLineNames().get(key) }

// ----------------------------------------------------------------
// 駅名抽出・解決
// ----------------------------------------------------------------

/**
 * 物件の station テキストから駅名を抽出
 * 多様なパターンに対応:
 *   '新宿駅まで徒歩5分'           → '新宿'       (標準)
 *   '花畑町電停まで徒歩3分'       → '花畑町'     (路面電車)
 *   'バス停楚辺まで徒歩3分'       → '楚辺'       (バス)
 *   'ゆいレール経塚駅まで徒歩5分' → '経塚'       (モノレール系統名除去)
 *   'リニモ長久手古戦場駅まで…'   → '長久手古戦場' (リニモ系統名除去)
 *
 * @param {string} stationText
 * @returns {string} 駅名（抽出できない場合は空文字列）
 */
export function extractStationName(stationText) {
  if (!stationText) return ''

  // バス停XXXまで → XXX
  let m = stationText.match(/^バス停(.+?)まで/)
  if (m) return m[1]

  // XXX電停まで → XXX（路面電車）
  m = stationText.match(/^(.+?)電停まで/)
  if (m) return m[1]

  // ゆいレール/リニモ プレフィックス＋XXX駅 → XXX
  m = stationText.match(/^(?:ゆいレール|リニモ)(.+?)駅/)
  if (m) return m[1]

  // 標準パターン: XXX駅まで → XXX
  m = stationText.match(/^(.+?)駅/)
  if (m) return m[1]

  return ''
}

/**
 * 駅名からエイリアスも含めて所属路線キーを解決
 * @param {string} stationName
 * @returns {Set<string>}
 */
export function resolveLineKeys(stationName) {
  if (!stationName) return new Set()
  const map = getStationToLines()
  // map の値は共有 Set のため、防御コピーを返す
  // 呼び出し元で Set が変更されても逆引きマップに影響しない
  const keys = map.get(stationName)
  if (keys) return new Set(keys)
  const alias = STATION_ALIAS.get(stationName)
  if (alias) {
    const aliasKeys = map.get(alias)
    return aliasKeys ? new Set(aliasKeys) : new Set()
  }
  return new Set()
}

/**
 * 路線・駅パラメータから検索対象を構築
 *
 * @param {string[]} lineKeys     選択中の路線キー配列
 * @param {string[]} stationRaws  選択中の駅（'lineKey:stationName' 形式）配列
 * @returns {{ stationNames: Set<string>, linesWithStations: Set<string> }}
 */
export function buildTargetStations(lineKeys, stationRaws) {
  /** @type {Set<string>} */
  const stationNames = new Set()
  /** @type {Set<string>} — 駅レベルの選択が存在する路線 */
  const linesWithStations = new Set()

  for (const raw of stationRaws) {
    const colonIdx = raw.indexOf(':')
    if (colonIdx === -1) continue
    const lineKey = raw.slice(0, colonIdx)
    const name    = raw.slice(colonIdx + 1)
    stationNames.add(name)
    linesWithStations.add(lineKey)
  }

  return { stationNames, linesWithStations }
}

/**
 * 物件が選択中の路線・駅に一致するか判定（3段階フォールバック）
 *
 * 1. 駅が明示的に選択されている路線 → 駅名照合（エイリアス対応）
 * 2. 駅指定がない路線 → 物件の _lineKeys で路線帰属チェック
 * 3. 駅指定がなく路線帰属も不明 → 路線の都道府県と物件の areaKey で照合
 *
 * [BUG FIX] 以前は Tier 2 が全路線を対象にしていたため、
 * ユーザーが明示的に除外した駅の物件が Tier 2 を通過していた。
 * 修正後は linesWithStations に含まれる路線を Tier 2/3 から除外し、
 * Tier 1（駅名照合）でのみ判定する。
 *
 * @param {Object}      property         物件オブジェクト（_stationName, _lineKeys, areaKey 付き）
 * @param {Set<string>} targetStations   選択中の駅名セット
 * @param {string[]}    lineKeys         選択中の路線キー配列
 * @param {Set<string>} linesWithStations 駅選択がある路線キーセット
 * @returns {boolean}
 */
export function matchStationLine(property, targetStations, lineKeys, linesWithStations) {
  // 路線フィルタ未指定 → 全件通過
  if (lineKeys.length === 0) return true

  const propStation = property._stationName

  // ── Tier 1: 明示的な駅名マッチ ──
  // 駅選択が存在する路線について、物件の駅が選択駅に含まれるか判定
  if (targetStations.size > 0 && propStation) {
    if (targetStations.has(propStation)) return true
    // 表記揺れ対応（三ノ宮 ↔ 三宮 等）
    const alias = STATION_ALIAS.get(propStation)
    if (alias && targetStations.has(alias)) return true
  }

  // ── 駅指定がない路線を抽出（Tier 2/3 共通） ──
  // linesWithStations に含まれる路線は Tier 1 で判定済みのためスキップ
  const linesWithoutExplicitStations = lineKeys.filter(
    (lk) => !linesWithStations.has(lk),
  )

  // ── Tier 2: 路線帰属チェック（駅指定がない路線のみ） ──
  // 物件の最寄駅が StationStops に登録されている場合、路線の帰属で判定
  if (propStation && property._lineKeys.size > 0) {
    for (const lk of linesWithoutExplicitStations) {
      if (property._lineKeys.has(lk)) return true
    }
  }

  // ── Tier 3: 都道府県フォールバック ──
  // StationStops に駅データがない路線（「この路線の全駅を検索対象にします」と表示される路線）
  // について、路線の都道府県 ≒ 物件の areaKey で照合
  const lineToPref = getLineToPref()
  for (const lk of linesWithoutExplicitStations) {
    const prefKey = lineToPref.get(lk)
    if (prefKey && prefKey === property.areaKey) return true
  }

  return false
}

/**
 * 選択中の路線名ラベルを取得
 * @param {string} linesRaw  カンマ区切りの路線キー文字列
 * @returns {string} 路線名（例: 'JR山手線・JR中央線'）。路線未選択時は空文字列
 */
export function getLineLabel(linesRaw) {
  if (!linesRaw) return ''

  const keys = linesRaw.split(',').filter(Boolean)
  if (keys.length === 0) return ''

  const lineNames = getLineNames()
  const names = keys
    .map((k) => lineNames.get(k))
    .filter(Boolean)

  if (names.length === 0) return ''
  if (names.length <= 2) return names.join('・')
  return `${names[0]}・${names[1]}他${names.length - 2}路線`
}
