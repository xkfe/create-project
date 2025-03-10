/*
 * @Author: 小凯同学
 * @Date: 2025-03-10 20:56:29
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 21:08:47
 * @Description:
 */
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config/app'
import NProgress from '@/config/nprogress'
import { errorRouter, staticRouter } from '@/router/modules/staticRouter'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const mode = import.meta.env.VITE_ROUTER_MODE

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory(),
}

const router = createRouter({
  history: routerMode[mode](),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/**
 * @description 路由拦截 beforeEach
 */
router.beforeEach(async (to, from) => {
  const userStore = useUserStore()

  // NProgress 开始
  NProgress.start()

  // 动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title

  // 判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (userStore.token)
      return from.fullPath
    return true
  }

  // 判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
  if (ROUTER_WHITE_LIST.includes(to.path))
    return true

  // 判断是否有 Token，没有重定向到 login 页面
  if (!userStore.token) {
    return { path: `${LOGIN_URL}?redirect=${to.fullPath}`, replace: true }
  }

  // 正常访问页面
  return true
})

/**
 * @description 路由跳转错误
 */
router.onError((error) => {
  NProgress.done()
  console.warn('路由错误', error.message)
})

/**
 * @description 路由跳转结束
 */
router.afterEach(() => {
  NProgress.done()
})

export default router
