import { URL, fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { createProxy } from './src/utils/proxy'
import { vitePlugins } from './src/utils/vitePlugins'
import { wrapperEnv } from './src/utils/getEnv'

export default defineConfig(async ({ mode }) => {
  const UnoCSS = (await import('unocss/vite')).default
  const env = loadEnv(mode, 'env')
  const viteEnv = wrapperEnv(env)

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [...vitePlugins(), UnoCSS()],
    envDir: 'env',
    server: {
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
    build: {
      target: 'es6',
      cssTarget: 'chrome61',
    },
    optimizeDeps: {
      exclude: [
        'vue-demi',
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variable.scss";`,
        },
      },
    },
  }
})
