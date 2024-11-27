import preloadAssets from 'ufuse/src/utils/preloadAssets'
import YouSheBiaoTiHei from '@/assets/fonts/YouSheBiaoTiHei.ttf?url'
import DINBold from '@/assets/fonts/DidBold.otf?url'

interface ImageModule {
  default: string
}

export const ready = Promise.all([
  preloadAssets({
    images: [
      ...Object.entries(
        import.meta.glob(
          [
            '@/assets/images/*.png',
          ],
          { eager: true },
        ),
      )
        .map(([, module]) => (module as ImageModule).default),
    ],
    fonts: [
      // 通用数字
      ['DIN-Bold', DINBold],
      // 文字
      ['YouSheBiaoTiHei', YouSheBiaoTiHei],
    ],
  }),
])
