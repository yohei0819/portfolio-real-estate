/**
 * スクロールロック管理ユーティリティ
 *
 * 複数コンポーネント（MobileMenu / DrawerController）が
 * 並行して body のスクロールロックを制御する際の競合を防止する。
 *
 * ロック要求カウンタ方式で、全コンポーネントが解除するまでロックを維持する。
 */

/** @type {number} 現在のロック要求数 */
let lockCount = 0

/** スクロールロックを1つ追加 */
export function acquireScrollLock() {
  lockCount++
  if (lockCount === 1) {
    document.body.style.overflow = 'hidden'
  }
}

/** スクロールロックを1つ解除（全解除時のみ overflow を復元） */
export function releaseScrollLock() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = ''
  }
}
