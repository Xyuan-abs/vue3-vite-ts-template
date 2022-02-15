import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/mixin.scss";`,
      },
    },
  },
  build: {
    terserOptions: {
      compress:{
        drop_console: true,
        drop_debugger: true,
      }
    },
  },
})
