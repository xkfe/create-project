import { resolve } from 'node:path'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

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
