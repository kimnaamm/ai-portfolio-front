/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    server: env.VITE_API_BASE
      ? {
        proxy: {
          '/api': {
            target: env.VITE_API_BASE,
            changeOrigin: true,
            rewrite: p => p.replace(/^\/api/, ''),
          },
        },
      }
      : undefined,
    // ← 여기 추가
    test: {
      environment: 'jsdom',
      // setupFiles: ['./src/test/setup.ts'],
    },
  }
})
