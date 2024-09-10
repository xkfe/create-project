/*
 * @Author: xkfe
 * @Date: 2024-09-10 22:35:12
 * @LastEditors: xkfe
 * @LastEditTime: 2024-09-10 22:36:59
 * @Description: vite 插件配置
 */
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

/**
 * @description: Vite plugin list
 * @param {*} PluginOption
 * @return {*}
 */
export function vitePlugins(): (PluginOption | PluginOption[])[] {
  return [
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
      dts: './typings/auto-imports.d.ts',
    }),
    // 引入 iconfont
    Icons({
      autoInstall: true,
    }),
    VueDevTools(),
  ]
};
