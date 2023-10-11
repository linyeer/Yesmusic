import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//引入windicss框架
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 创建别名，将@重定向到 /src
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  server: {
    port: 5173,
    proxy: {
      // 代理配置
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  plugins: [vue(), WindiCSS()]
})
