/*
 * @Author: xkfe
 * @Date: 2024-09-10 22:35:12
 * @LastEditors: 小凯同学
 * @LastEditTime: 2024-11-28 22:59:00
 * @Description: vite 插件配置
 */
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueDevTools from 'vite-plugin-vue-devtools'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

/**
 * @description: Vite plugin list
 * @param {*} PluginOption
 * @return {*}
 */
export function vitePlugins(viteEnv: ViteEnv): (PluginOption | PluginOption[])[] {
  const { VITE_DEVTOOLS, VITE_REPORT } = viteEnv
  return [
    VueRouter({
      dts: './typings/typed-router.d.ts',
    }),
    vue({
      template: {
        compilerOptions: {
          // 将 micro-app 标记为 自定义元素，避免 Vue 对这些标签进行默认的解析和处理。
          isCustomElement: tag => ['micro-app'].includes(tag),
        },
      },
    }),
    vueJsx(),
    UnoCSS(),
    // https://github.com/unplugin/unplugin-auto-import 配置自动导入 vue相关函数
    AutoImport({
      imports: ['vue', VueRouterAutoImports],
      dirs: [
        'src/stores/modules/*',
        'src/components/*',
        'src/hooks/*',
      ],
      dts: './typings/auto-imports.d.ts',
    }),
    // 引入 iconfont
    Icons({
      autoInstall: true,
    }),
    // 创建打包压缩配置
    createCompression(viteEnv),

    // 是否启用 vue 调试工具
    VITE_DEVTOOLS && VueDevTools(),

    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && (visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true }) as PluginOption),
  ]
};

/**
 * @description 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv
 */
function createCompression(viteEnv: ViteEnv): PluginOption | PluginOption[] {
  const { VITE_BUILD_COMPRESS = 'none', VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv
  const compressList = VITE_BUILD_COMPRESS.split(',')
  const plugins: PluginOption[] = []
  if (compressList.includes('gzip')) {
    plugins.push(
      viteCompression({
        ext: '.gz',
        algorithm: 'gzip',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      }),
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      viteCompression({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      }),
    )
  }
  return plugins
}
