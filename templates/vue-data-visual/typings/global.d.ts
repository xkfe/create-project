/* Vite */
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_PORT: number
  VITE_NODE_ENV: 'development' | 'production' | 'test'
  VITE_PUBLIC_PATH: string
  VITE_DROP_CONSOLE: boolean
  VITE_API_URL: string
  VITE_PROXY: [string, string][]
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown
}
