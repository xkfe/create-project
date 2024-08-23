/*
 * @Author: xkfe xkfe16@gmail.com
 * @Date: 2024-10-01 15:53:39
 * @LastEditors: xkfe xkfe16@gmail.com
 * @LastEditTime: 2024-10-01 15:53:39
 */

import type { PluginOption } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'

/**
 * @description: Vite plugin list
 * @param {*} PluginOption
 * @return {*}
 */
export function vitePlugins(): (PluginOption | PluginOption[])[] {
  return [
    // 为 uni-app 提供类 nuxt 的 layouts 系统
    UniHelperLayouts(),

    // 为 manifest.json 提供ts类型支持
    UniHelperManifest(),

    // 基于文件的路由插件(docs: https://uni-helper.js.org/vite-plugin-uni-pages)
    UniHelperPages({
      dts: './typings/uni-pages.d.ts',
      homePage: 'pages/index', /** @default 'pages/index' or 'pages/index/index' */
      subPackages: [],
    }),

    UniHelperComponents({
      dts: './typings/components.d.ts',
      // 允许子目录作为组件的命名空间前缀。例如：/components/uni/uni-badge.vue -> <uni-badge />
      directoryAsNamespace: true,
      resolvers: [WotResolver()],
    }),

    Uni(),

    // https://github.com/unplugin/unplugin-auto-import 配置自动导入 vue相关函数, uni-app相关函数。ref, reactive，onLoad等
    AutoImport({
      imports: ['vue', 'uni-app', 'pinia'],
      dirs: [
        'src/stores/*',
        'src/components/*',
        'src/hooks/*',
      ],
      dts: './typings/auto-imports.d.ts',
    }),
  ]
};
