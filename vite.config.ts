import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  /* assetsディレクトリ に入れた音源への相対パスを有効にするため。
  参考：https://qiita.com/d2cid-kimura/items/765f629dbdcfff1499bb */
  base: "./",
})
