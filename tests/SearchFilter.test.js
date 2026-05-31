import { describe, it, expect } from 'vitest'
import {
  getAll,
  parseRange,
  matchLayout,
  matchFeatures,
  calcAgeThreshold,
  filterProperties,
  sortProperties,
} from '../src/js/utils/SearchFilter.js'

describe('getAll', () => {
  it('指定キーの値を配列で返し、空文字を除外する', () => {
    const params = new URLSearchParams('layout=1K&layout=&layout=2LDK')
    expect(getAll(params, 'layout')).toEqual(['1K', '2LDK'])
  })

  it('キーが存在しなければ空配列を返す', () => {
    expect(getAll(new URLSearchParams(''), 'layout')).toEqual([])
  })
})

describe('parseRange', () => {
  it('min/max を数値として取得する', () => {
    const params = new URLSearchParams('rent_min=5&rent_max=10')
    expect(parseRange(params, 'rent_min', 'rent_max')).toEqual({ min: 5, max: 10 })
  })

  it('未指定時は min=0, max=Infinity を返す', () => {
    expect(parseRange(new URLSearchParams(''), 'rent_min', 'rent_max')).toEqual({
      min: 0,
      max: Infinity,
    })
  })

  it('min > max のときはスワップする', () => {
    const params = new URLSearchParams('rent_min=10&rent_max=5')
    expect(parseRange(params, 'rent_min', 'rent_max')).toEqual({ min: 5, max: 10 })
  })
})

describe('matchLayout', () => {
  it('未選択なら常に true', () => {
    expect(matchLayout([], '1LDK')).toBe(true)
  })

  it('完全一致でマッチする', () => {
    expect(matchLayout(['1K', '2LDK'], '2LDK')).toBe(true)
    expect(matchLayout(['1K'], '2LDK')).toBe(false)
  })

  it('3LDK+ は 3部屋以上の LDK にマッチする', () => {
    expect(matchLayout(['3LDK+'], '3LDK')).toBe(true)
    expect(matchLayout(['3LDK+'], '4LDK')).toBe(true)
    expect(matchLayout(['3LDK+'], '2LDK')).toBe(false)
    expect(matchLayout(['3LDK+'], '3K')).toBe(false)
  })
})

describe('matchFeatures', () => {
  it('すべての条件を満たすと true（AND 条件）', () => {
    const features = ['オートロック', 'バス・トイレ別', 'エアコン']
    expect(matchFeatures(['オートロック', 'エアコン'], features)).toBe(true)
    expect(matchFeatures(['ペット可'], features)).toBe(false)
  })

  it('部分一致で照合する', () => {
    expect(matchFeatures(['オートロック'], ['オートロック付き'])).toBe(true)
  })

  it('条件が空なら true', () => {
    expect(matchFeatures([], ['エアコン'])).toBe(true)
  })
})

describe('calcAgeThreshold', () => {
  it('未選択なら Infinity', () => {
    expect(calcAgeThreshold([])).toBe(Infinity)
  })

  it('"any" を含むと Infinity', () => {
    expect(calcAgeThreshold(['5', 'any'])).toBe(Infinity)
  })

  it('最大の数値を閾値として返す', () => {
    expect(calcAgeThreshold(['3', '10', '5'])).toBe(10)
  })

  it('数値化できない値は無視する', () => {
    expect(calcAgeThreshold(['foo', '5'])).toBe(5)
    expect(calcAgeThreshold(['foo'])).toBe(Infinity)
  })
})

describe('filterProperties', () => {
  const props = [
    { id: 1, areaKey: 'tokyo', price: 8, layout: '1K', type: 'マンション', area: 25, _age: 2, features: ['オートロック'] },
    { id: 2, areaKey: 'tokyo', price: 15, layout: '2LDK', type: 'アパート', area: 50, _age: 12, features: ['ペット可'] },
    { id: 3, areaKey: 'osaka', price: 10, layout: '1LDK', type: 'マンション', area: 40, _age: 5, features: ['オートロック', 'エアコン'] },
  ]

  const baseFilters = {
    area: '',
    rent: { min: 0, max: Infinity },
    size: { min: 0, max: Infinity },
    layouts: [],
    typeLabels: [],
    featureLabels: [],
    ageThreshold: Infinity,
    lineKeys: [],
    targetStations: [],
    linesWithStations: [],
  }

  it('条件なしなら全件返す', () => {
    expect(filterProperties(props, baseFilters)).toHaveLength(3)
  })

  it('エリアで絞り込む', () => {
    const result = filterProperties(props, { ...baseFilters, area: 'osaka' })
    expect(result.map((p) => p.id)).toEqual([3])
  })

  it('賃料範囲で絞り込む', () => {
    const result = filterProperties(props, { ...baseFilters, rent: { min: 9, max: 16 } })
    expect(result.map((p) => p.id)).toEqual([2, 3])
  })

  it('築年数の閾値で絞り込む', () => {
    const result = filterProperties(props, { ...baseFilters, ageThreshold: 5 })
    expect(result.map((p) => p.id)).toEqual([1, 3])
  })

  it('こだわり条件で絞り込む', () => {
    const result = filterProperties(props, { ...baseFilters, featureLabels: ['エアコン'] })
    expect(result.map((p) => p.id)).toEqual([3])
  })
})

describe('sortProperties', () => {
  const props = [
    { id: 1, price: 10, area: 40, _age: 5, badge: null },
    { id: 2, price: 8, area: 25, _age: 2, badge: 'おすすめ' },
    { id: 3, price: 15, area: 50, _age: 12, badge: null },
  ]

  it('元の配列を変更しない', () => {
    const original = [...props]
    sortProperties(props, 'price-asc')
    expect(props).toEqual(original)
  })

  it('賃料昇順', () => {
    expect(sortProperties(props, 'price-asc').map((p) => p.id)).toEqual([2, 1, 3])
  })

  it('賃料降順', () => {
    expect(sortProperties(props, 'price-desc').map((p) => p.id)).toEqual([3, 1, 2])
  })

  it('築年数昇順', () => {
    expect(sortProperties(props, 'age-asc').map((p) => p.id)).toEqual([2, 1, 3])
  })

  it('面積降順', () => {
    expect(sortProperties(props, 'area-desc').map((p) => p.id)).toEqual([3, 1, 2])
  })

  it('おすすめ順は badge ありを優先', () => {
    expect(sortProperties(props, 'recommended').map((p) => p.id)).toEqual([2, 1, 3])
  })
})
