/**
 * localStorage ラッパーユーティリティ
 * お気に入り・最近見た物件・検索履歴を安全に読み書きする
 *
 * - JSON パース失敗時の安全なフォールバック
 * - 上限件数の自動管理（FIFO）
 * - localStorage 非対応環境でのフォールバック
 */

import { STORAGE_KEY } from './Config.js'

/** 最近見た物件の保持上限 */
const RECENT_MAX = 20

/** 検索履歴の保持上限 */
const SEARCH_HISTORY_MAX = 10

// ----------------------------------------------------------------
// 低レベル IO
// ----------------------------------------------------------------

/**
 * localStorage から JSON 配列を安全に読み出す
 * @param {string} key  ストレージキー
 * @returns {any[]}
 */
function load(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * localStorage に JSON 配列を保存
 * @param {string} key   ストレージキー
 * @param {any[]}  data  保存するデータ
 */
function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // QuotaExceededError — 容量不足時は無視
  }
}

// ----------------------------------------------------------------
// お気に入り
// ----------------------------------------------------------------

/**
 * お気に入り一覧を取得
 * @returns {number[]}  物件IDの配列
 */
export function getFavorites() {
  return load(STORAGE_KEY.favorites)
}

/**
 * お気に入りに含まれるか判定
 * @param {number} id  物件ID
 * @returns {boolean}
 */
export function isFavorite(id) {
  return getFavorites().includes(id)
}

/**
 * お気に入りをトグル（追加 or 削除）
 * @param {number} id  物件ID
 * @returns {boolean}  トグル後の状態（true = 追加された）
 */
export function toggleFavorite(id) {
  const list = getFavorites()
  const idx = list.indexOf(id)

  if (idx === -1) {
    list.push(id)
    save(STORAGE_KEY.favorites, list)
    return true
  }

  list.splice(idx, 1)
  save(STORAGE_KEY.favorites, list)
  return false
}

/**
 * お気に入りの件数
 * @returns {number}
 */
export function getFavoriteCount() {
  return getFavorites().length
}

// ----------------------------------------------------------------
// 最近見た物件
// ----------------------------------------------------------------

/**
 * 最近見た物件IDの一覧を取得（新しい順）
 * @returns {number[]}
 */
export function getRecentlyViewed() {
  return load(STORAGE_KEY.recentlyViewed)
}

/**
 * 最近見た物件に追加（重複排除、上限 RECENT_MAX）
 * @param {number} id  物件ID
 */
export function addRecentlyViewed(id) {
  const list = getRecentlyViewed().filter((v) => v !== id)
  list.unshift(id) // 先頭に追加
  save(STORAGE_KEY.recentlyViewed, list.slice(0, RECENT_MAX))
}

// ----------------------------------------------------------------
// 検索履歴
// ----------------------------------------------------------------

/**
 * @typedef {Object} SearchHistoryEntry
 * @property {string} query    URLクエリ文字列（例: "area=tokyo&rent_max=10"）
 * @property {string} label    表示用ラベル（例: "東京都 / 10万円以下"）
 * @property {number} savedAt  保存日時（Date.now()）
 */

/**
 * 検索履歴を取得（新しい順）
 * @returns {SearchHistoryEntry[]}
 */
export function getSearchHistory() {
  return load(STORAGE_KEY.searchHistory)
}

/**
 * 検索条件を保存（同一クエリは上書き、上限 SEARCH_HISTORY_MAX）
 * @param {string} query  URLクエリ文字列
 * @param {string} label  表示用ラベル
 */
export function saveSearchHistory(query, label) {
  const list = getSearchHistory().filter((e) => e.query !== query)
  list.unshift({ query, label, savedAt: Date.now() })
  save(STORAGE_KEY.searchHistory, list.slice(0, SEARCH_HISTORY_MAX))
}

/**
 * 検索履歴を1件削除
 * @param {string} query  削除対象のクエリ文字列
 */
export function removeSearchHistory(query) {
  const list = getSearchHistory().filter((e) => e.query !== query)
  save(STORAGE_KEY.searchHistory, list)
}

/**
 * 検索履歴を全件削除
 */
export function clearSearchHistory() {
  save(STORAGE_KEY.searchHistory, [])
}
