import process from 'node:process'
import { defineConfig, presetAttributify, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import type { Preset, SourceCodeTransformer } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

import { presetApplet, presetRemRpx, transformerAttributify } from 'unocss-applet'

// uni-app
const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') ?? false
const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []

if (isApplet) {
  presets.push(presetApplet())
  presets.push(presetRemRpx({ baseFontSize: 4 }))
  transformers.push(transformerAttributify({ ignoreAttributes: ['block'] }))
}
else {
  presets.push(presetUno())
  presets.push(presetAttributify())
  presets.push(presetRemToPx({ baseFontSize: 4 }))
}

export default defineConfig({
  // 快捷方式
  shortcuts: [
    { center: 'flex items-center justify-center' },
    { 'col-center': 'flex items-center' },
    { 'row-center': 'flex justify-center' },
  ],

  // 预设
  presets: [
    ...presets,
  ],
  transformers: [
    // https://alfred-skyblue.github.io/unocss-docs-cn/transformers/directives
    transformerDirectives(),
    transformerVariantGroup(),
    ...transformers,
  ],
  rules: [],
})
