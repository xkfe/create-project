/*
 * @Author: xkfe
 * @Date: 2024-08-31 20:46:06
 * @LastEditors: xkfe
 * @LastEditTime: 2024-09-01 13:50:25
 * @Description: vite配置文件
 */
import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env')

  return {
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      // https://github.com/unplugin/unplugin-auto-import 配置自动导入 vue相关函数
      AutoImport({
        imports: ['vue', 'vue-router'],
        dirs: [
          'src/stores/modules/*',
          'src/components/*',
          'src/hooks/*',
        ],
        dts: 'types/auto-imports.d.ts',
      }),
      // 引入 iconfont
      Icons({
        autoInstall: true,
      }),
      VueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    envDir: 'env',
    server: {
      port: env.VITE_PORT,
      host: true,
      proxy: {
        [env.VITE_API_URL]: {
          target: env.VITE_PROXY,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_API_URL}`), ''),
        },
      },
    },
  }
})
