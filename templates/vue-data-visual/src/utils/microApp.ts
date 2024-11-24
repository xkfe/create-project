import microApp from '@micro-zoe/micro-app'
import { MicroAppName } from '@/config'

microApp.start({
  preFetchApps: [
    { name: MicroAppName, url: '/unity-model/index.html' }, // 加载资源并解析
  ],
  plugins: {
    modules: {
      [MicroAppName]: [{
        loader(code, url) {
          if (url.includes('lty') && url.includes('loader.js')) {
            code = code.replace(
              /function\s+createUnityInstance\s*/,
              'window.createUnityInstance = function',
            )
          }
          if (url.includes('lty') && url.includes('framework.js')) {
            code = code.replace('var unityFramework', 'window.unityFramework')
          }
          return code
        },
      }],
    },
  },
})
