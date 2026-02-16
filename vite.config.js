import { defineConfig } from 'vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ESM環境では __dirname が使えないため手動で定義
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  // GitHub Pages デプロイ時は /<リポジトリ名>/ がベースパスになる
  // 環境変数 GITHUB_PAGES=true でビルドするとサブパスを自動設定
  base: process.env.GITHUB_PAGES ? './' : '/',
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        search: resolve(__dirname, 'src/search.html'),
        property: resolve(__dirname, 'src/property.html'),
        station: resolve(__dirname, 'src/station.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
