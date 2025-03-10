/*
 * @Author: 小凯同学
 * @Date: 2025-03-10 21:00:10
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 21:00:26
 * @Description: 全局配置
 */
// ? 全局默认配置项

// 首页地址（默认）
export const HOME_URL: string = '/home'

// 登录页地址（默认）
export const LOGIN_URL: string = '/login'

// 路由白名单地址（本地存在的路由 staticRouter.ts 中）
export const ROUTER_WHITE_LIST: string[] = ['/500']

// pinia store 前缀
export const STORE_PREFIX = 'store-'
