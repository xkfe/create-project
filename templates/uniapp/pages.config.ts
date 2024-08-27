import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  tabBar: {
    color: '#AAA',
    selectedColor: '#20BD6F',
    borderStyle: 'white',
    // backgroundColor: '#FFF',
    backgroundColor: 'rgba(255,255,255,0.3)' as any,
    fontSize: '12px',
    blurEffect: 'extralight',
    height: '56px',
    list: [
      {
        pagePath: 'pages/index',
        text: '首页',
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/home-selected.png',
      },
      {
        pagePath: 'pages/components/index',
        text: '组件',
        iconPath: 'static/tabbar/components.png',
        selectedIconPath: 'static/tabbar/components-selected.png',
      },
      {
        pagePath: 'pages/hooks/index',
        text: 'hooks',
        iconPath: 'static/tabbar/hooks.png',
        selectedIconPath: 'static/tabbar/hooks-selected.png',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'static/tabbar/my.png',
        selectedIconPath: 'static/tabbar/my-selected.png',
      },
    ],
  },
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'uniapp',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8',
    // navigationStyle: 'custom',
  },
  subPackages: [],
})
