/**
 * 検索フィルタ・ソート 純粋関数ユーティリティ
 *
 * AreaSearch のフィルタリング/ソート処理を純粋関数として分離し、
 * テスタビリティと保守性を向上。状態を持たず、入力に対して
 * 決定的な出力を返す。
 *
 * 責務:
 *   - URLSearchParams からのフィルタ条件パース
 *   - 各フィルタ条件の一致判定（間取り、こだわり等）
 *   - 物件配列のフィルタリング
 *   - ソート処理
 */

import { SEARCH } from './Config.js'
import { matchStationLine, buildTargetStations } from './StationMatcher.js'

const { featureMap: FEATURE_MAP, typeMap: TYPE_MAP } = SEARCH

// ----------------------------------------------------------------
// ユーティリティ
// ----------------------------------------------------------------

/**
 * URLSearchParams から指定キーの値を配列で取得
 * @param {URLSearchParams} params
 * @param {string} key
 * @returns {string[]}
 */
export function getAll(params, key) {
  return params.getAll(key).filter(Boolean)
}

/**
 * 範囲パラメータを安全に取得し、min > max の場合はスワップする
 * @param {URLSearchParams} params
 * @param {string} minKey   下限パラメータキー
 * @param {string} maxKey   上限パラメータキー
 * @returns {{ min: number, max: number }}
 */
export function parseRange(params, minKey, maxKey) {
  let min = parseFloat(params.get(minKey)) || 0
  let max = parseFloat(params.get(maxKey)) || Infinity

  // min > max のバリデーション（ユーザーが逆に設定した場合のフォールバック）
  if (min > max && max !== Infinity) {
    ;[min, max] = [max, min]
  }

  return { min, max }
}

// ----------------------------------------------------------------
// 個別フィルタ判定（純粋関数）
// ----------------------------------------------------------------

/**
 * 間取りフィルタの一致判定
 * 「3LDK+」選択時は 3LDK / 4LDK / 5LDK 等すべてマッチ
 * @param {string[]} selected  フォームで選択された間取り値
 * @param {string}   layout    物件の間取り
 * @returns {boolean}
 */
export function matchLayout(selected, layout) {
  if (selected.length === 0) return true
  if (selected.includes(layout)) return true

  // 3LDK+ が選択されていれば、部屋数 3 以上の LDK をマッチ
  if (selected.includes('3LDK+')) {
    const m = layout.match(/^(\d+)/)
    if (m && Number(m[1]) >= 3 && layout.includes('LDK')) return true
  }

  return false
}

/**
 * こだわり条件の一致判定（AND 条件）
 * 配列の .some() + .includes() による部分一致で照合
 * @param {string[]} requiredLabels  マッピング済みの条件ラベル配列
 * @param {string[]} propFeatures    物件の features 配列
 * @returns {boolean}
 */
export function matchFeatures(requiredLabels, propFeatures) {
  return requiredLabels.every((label) =>
    propFeatures.some((f) => f.includes(label)),
  )
}

/**
 * 築年数フィルタの閾値を計算
 * 「指定なし」が含まれる場合は Infinity を返す
 * @param {string[]} ages  選択された築年数値の配列
 * @returns {number}
 */
export function calcAgeThreshold(ages) {
  if (ages.length === 0 || ages.includes('any')) return Infinity
  return Math.max(...ages.map(Number))
}

// ----------------------------------------------------------------
// フィルタリング
// ----------------------------------------------------------------

/**
 * URLSearchParams からフィルタ条件をパースする
 * @param {URLSearchParams} params
 * @returns {Object} パース済みフィルタ条件オブジェクト
 */
export function parseFilterParams(params) {
  const area    = params.get('area') || ''
  const rent    = parseRange(params, 'rent_min', 'rent_max')
  const size    = parseRange(params, 'area_min', 'area_max')
  const layouts = getAll(params, 'layout')
  const types   = getAll(params, 'type')
  const ages    = getAll(params, 'age')
  const features = getAll(params, 'feature')

  // 路線・駅パラメータ（station.html からの遷移時）
  const lineKeys    = (params.get('lines') || '').split(',').filter(Boolean)
  const stationRaws = (params.get('stations') || '').split(',').filter(Boolean)
  const { stationNames: targetStations, linesWithStations } = buildTargetStations(lineKeys, stationRaws)

  // 事前にマッピング変換（フィルタループ外で1度だけ計算）
  const typeLabels    = types.map((t) => TYPE_MAP[t]).filter(Boolean)
  const featureLabels = features.map((f) => FEATURE_MAP[f]).filter(Boolean)
  const ageThreshold  = calcAgeThreshold(ages)

  return {
    area, rent, size, layouts,
    typeLabels, featureLabels, ageThreshold,
    lineKeys, targetStations, linesWithStations,
  }
}

/**
 * フィルタ条件に基づいて物件配列をフィルタリングする
 * @param {Object[]} properties  全物件配列（_age, _stationName, _lineKeys 付き）
 * @param {Object}   filters     parseFilterParams() の戻り値
 * @returns {Object[]}
 */
export function filterProperties(properties, filters) {
  const {
    area, rent, size, layouts,
    typeLabels, featureLabels, ageThreshold,
    lineKeys, targetStations, linesWithStations,
  } = filters

  return properties.filter((p) => {
    if (area && p.areaKey !== area) return false
    if (!matchStationLine(p, targetStations, lineKeys, linesWithStations)) return false
    if (p.price < rent.min || p.price > rent.max) return false
    if (!matchLayout(layouts, p.layout)) return false
    if (typeLabels.length > 0 && !typeLabels.includes(p.type)) return false
    if (p.area < size.min || p.area > size.max) return false
    if (p._age > ageThreshold) return false
    if (featureLabels.length > 0 && !matchFeatures(featureLabels, p.features)) return false
    return true
  })
}

// ----------------------------------------------------------------
// ソート
// ----------------------------------------------------------------

/**
 * フィルタ結果をソートキーに基づいてソートした新しい配列を返す
 * 元の配列は変更しない
 * @param {Object[]} properties  フィルタ済み物件配列
 * @param {string}   sortKey     ソートキー
 * @returns {Object[]}
 */
export function sortProperties(properties, sortKey) {
  const sorted = [...properties]

  switch (sortKey) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price || a.id - b.id)
      break
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price || a.id - b.id)
      break
    case 'age-asc':
      sorted.sort((a, b) => a._age - b._age || a.id - b.id)
      break
    case 'area-desc':
      sorted.sort((a, b) => b.area - a.area || a.id - b.id)
      break
    default:
      // おすすめ順 — badge ありを優先、ID 昇順
      sorted.sort((a, b) => {
        const aBadge = a.badge ? 0 : 1
        const bBadge = b.badge ? 0 : 1
        return aBadge - bBadge || a.id - b.id
      })
  }

  return sorted
}
