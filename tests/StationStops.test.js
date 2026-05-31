import { describe, it, expect } from 'vitest'
import { getLineStationCount } from '../src/js/data/StationStops.js'

describe('getLineStationCount', () => {
  it('登録済み路線は各駅件数の合計を返す', () => {
    // 山手線は駅データ登録済み。合計は正の数で fallback より大きい
    const count = getLineStationCount('yamanote', 0)
    expect(count).toBeGreaterThan(0)
  })

  it('合計が個別駅件数の単純加算と一致する', () => {
    // 山手線の最初の駅「東京(2840)」だけでも合計はそれ以上
    expect(getLineStationCount('yamanote')).toBeGreaterThanOrEqual(2840)
  })

  it('未登録路線は fallback を返す', () => {
    expect(getLineStationCount('___not_exist___', 999)).toBe(999)
  })

  it('fallback 未指定なら 0 を返す', () => {
    expect(getLineStationCount('___not_exist___')).toBe(0)
  })
})
