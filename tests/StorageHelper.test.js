import { describe, it, expect, beforeEach } from 'vitest'
import {
  getFavorites,
  isFavorite,
  toggleFavorite,
  getFavoriteCount,
} from '../src/js/utils/StorageHelper.js'

beforeEach(() => {
  localStorage.clear()
})

describe('お気に入り (StorageHelper)', () => {
  it('初期状態は空配列', () => {
    expect(getFavorites()).toEqual([])
    expect(getFavoriteCount()).toBe(0)
  })

  it('toggleFavorite で追加すると true を返し件数が増える', () => {
    expect(toggleFavorite(1)).toBe(true)
    expect(isFavorite(1)).toBe(true)
    expect(getFavoriteCount()).toBe(1)
  })

  it('同じ ID を再度トグルすると削除され false を返す', () => {
    toggleFavorite(1)
    expect(toggleFavorite(1)).toBe(false)
    expect(isFavorite(1)).toBe(false)
    expect(getFavoriteCount()).toBe(0)
  })

  it('複数の ID を独立して管理する', () => {
    toggleFavorite(1)
    toggleFavorite(2)
    toggleFavorite(3)
    expect(getFavorites().sort()).toEqual([1, 2, 3])

    toggleFavorite(2)
    expect(getFavorites().sort()).toEqual([1, 3])
    expect(isFavorite(2)).toBe(false)
  })
})
