/*
 * @Author: 小凯同学
 * @Date: 2025-01-08 20:46:46
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 22:01:16
 * @Description:
 */
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { wrapperEnv } from './build/viteEnv'
import { createVitePlugins } from './build/vitePlugins'
import { createProxy } from './build/viteProxy'

export default defineConfig(({ mode }) => {
  const root = path.join(process.cwd(), 'env')
  const envDir = 'env'
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  return {
    envDir,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@icons': fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "@/styles/variables.scss" as *; @use "@/styles/element-theme.scss" as *;',
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY, viteEnv.VITE_PROXY_CONSOLE),
    },
    preview: {
      port: viteEnv.VITE_PREVIEW_PORT,
    },
    plugins: createVitePlugins(viteEnv),
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      // minify: "terser",
      // terserOptions: {
      //  compress: {
      //   drop_console: viteEnv.VITE_DROP_CONSOLE, // 生产环境去除 console
      //   drop_debugger: true // 生产环境去除 debugger
      //  }
      // },
      sourcemap: false,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // 第三方库打包
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia', 'element-plus'],
          },
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  }
})
