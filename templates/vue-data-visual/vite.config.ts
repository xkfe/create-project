/*
 * @Author: xkfe
 * @Date: 2024-08-31 20:46:06
 * @LastEditors: xkfe
 * @LastEditTime: 2024-09-13 16:37:30
 * @Description: vite配置文件
 */
import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createProxy } from './src/utils/proxy'
import { vitePlugins } from './src/utils/vitePlugins'
import { wrapperEnv } from './src/utils/getEnv'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'env')
  const viteEnv = wrapperEnv(env)

  return {
    plugins: vitePlugins(viteEnv),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    envDir: 'env',
    server: {
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      host: true,
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
  }
})
