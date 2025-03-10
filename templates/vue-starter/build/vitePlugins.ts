/*
 * @Author: 小凯同学
 * @Date: 2024-10-18 20:16:29
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 22:00:51
 * @Description: vite 插件配置
 */
import type { PluginOption } from 'vite'
import path from 'node:path'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ViteComponents from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueDevTools from 'vite-plugin-vue-devtools'

/**
 * 创建 vite 插件
 * @param viteEnv
 */
export function createVitePlugins(viteEnv: ViteEnv): (PluginOption | PluginOption[])[] {
  const { VITE_REPORT, VITE_DEVTOOLS, VITE_CODEINSPECTOR } = viteEnv
  return [
    vue(),
    vueJsx(),
    UnoCSS(),
    // https://github.com/unplugin/unplugin-auto-import 配置自动导入 vue相关函数
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', 'vue-i18n', '@vueuse/core'],
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
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    ViteComponents({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      dts: './typings/auto-components.d.ts',
    }),
    // 是否启用 vue 调试工具
    VITE_DEVTOOLS && VueDevTools(),

    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && (visualizer({ filename: 'stats.html', gzipSize: true, brotliSize: true, open: true })),

    // 自动 IDE 并将光标定位到 DOM 对应的源代码位置。see: https://inspector.fe-dev.cn/guide/start.html
    VITE_CODEINSPECTOR && codeInspectorPlugin({ bundler: 'vite' }),

    // 压缩
    viteCompression({
      verbose: true, // 是否在控制台输出压缩结果
      disable: false, // 是否禁用
      algorithm: 'gzip', // 压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz', // 压缩后的文件名后缀
      threshold: 10240, // 只有大小大于该值的资源会被处理 10240B = 10KB
      deleteOriginFile: false, // 压缩后是否删除原文件
    }),

    // 图片压缩
    viteImagemin({
      verbose: true, // 是否在控制台输出压缩结果
      // 图片压缩配置
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ]
}
