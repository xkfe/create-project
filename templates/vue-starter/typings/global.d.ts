/*
 * @Author: 小凯同学
 * @Date: 2025-03-10 20:51:56
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 20:51:56
 * @Description: 全局类型声明
 */

declare global {
  /* Vite */
  type Recordable<T = any> = Record<string, T>
  interface ViteEnv {
    readonly VITE_USER_NODE_ENV: 'development' | 'production' | 'test'
    readonly VITE_GLOB_APP_TITLE: string
    readonly VITE_PORT: number
    readonly VITE_PREVIEW_PORT: number
    readonly VITE_OPEN: boolean
    readonly VITE_REPORT: boolean
    readonly VITE_PROXY_CONSOLE: boolean
    readonly VITE_ROUTER_MODE: 'hash' | 'history'
    readonly VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'gzip,brotli' | 'none'
    readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
    readonly VITE_DROP_CONSOLE: boolean
    readonly VITE_DEVTOOLS: boolean
    readonly VITE_PUBLIC_PATH: string
    readonly VITE_API_URL: string
    readonly VITE_PROXY: [string, string][]
    readonly VITE_CODEINSPECTOR: boolean
  }

}
