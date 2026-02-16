/**
 * 新着物件セクション動的生成モジュール
 *
 * index.html の「新着のおすすめ物件」セクションを
 * PropertyData から動的に描画する。
 *
 * 表示ロジック:
 * 1. badge='NEW' の物件を優先
 * 2. buildDate が新しい順にソート
 * 3. 最大 6 件をカード形式で表示
 */

import PROPERTIES from '../data/PropertyData.js'
import { buildAge, extractYear } from '../data/PropertyFactory.js'
import { $ } from '../utils/DOMHelper.js'
import { getFavorites } from '../utils/StorageHelper.js'
import { buildPropertyCard } from '../utils/CardBuilder.js'

/** 表示する最大件数 */
const MAX_ITEMS = 6

export default class NewProperties {
  constructor() {
    this.#init()
  }

  #init() {
    const container = $('.new-properties__list')
    if (!container) return

    const items = this.#selectProperties()
    const favIds = new Set(getFavorites())
    container.innerHTML = items
      .map(({ id, prop }) => {
        const age = prop.age || buildAge(prop.buildDate)
        return buildPropertyCard(id, prop, favIds, {
          location: `${prop.prefecture}${prop.city}`,
          age,
        })
      })
      .join('')
  }

  /**
   * 新着物件を選出
   * @returns {Array<{id: number, prop: Object}>}
   */
  #selectProperties() {
    const all = Object.entries(PROPERTIES).map(([id, prop]) => ({
      id: Number(id),
      prop,
      _year: extractYear(prop.buildDate),
    }))

    // NEW バッジ持ちを優先 → 築年が新しい順 → ID 昇順（安定ソート保証）
    all.sort((a, b) => {
      const aNew = a.prop.badge === 'NEW' ? 0 : 1
      const bNew = b.prop.badge === 'NEW' ? 0 : 1
      if (aNew !== bNew) return aNew - bNew
      if (b._year !== a._year) return b._year - a._year
      return a.id - b.id
    })

    return all.slice(0, MAX_ITEMS)
  }

}
