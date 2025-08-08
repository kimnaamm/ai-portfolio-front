// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  // .env / .env.development / .env.production 값 읽기
  const env = loadEnv(mode, process.cwd(), '') // 접두사 필터 비우면 VITE_ 포함 전부 로드

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE, // 예: https://ai-backend-xxxxxx-xx.a.run.app
          changeOrigin: true,
          rewrite: p => p.replace(/^\/api/, ''),
        },
      },
    },
  }
})
