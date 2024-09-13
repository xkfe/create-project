/* Vite */
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_NODE_ENV: 'development' | 'production' | 'test'
  VITE_PUBLIC_PATH: string
  VITE_DROP_CONSOLE: boolean
  VITE_DEVTOOLS: boolean
  VITE_REPORT: boolean
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_API_URL: string
  VITE_PROXY: [string, string][]
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown
}
