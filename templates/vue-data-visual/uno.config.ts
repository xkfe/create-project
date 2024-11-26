/*
 * @Author: 小凯同学
 * @Date: 2024-11-25 11:54:31
 * @LastEditors: 小凯同学
 * @LastEditTime: 2024-11-26 14:32:38
 * @Description: uno 配置文件
 */

import { resolve } from 'node:path'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

// loader helpers
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

const iconDirectory = resolve(__dirname, 'src/assets/icons')

export default defineConfig({
  shortcuts: [
    // ...
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetRemToPx({ baseFontSize: 4 }),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        custom: FileSystemIconLoader(iconDirectory),
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
