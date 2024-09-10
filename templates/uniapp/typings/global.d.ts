/* Vite */
declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {

}

interface ImportMetaEnv extends ViteEnv {
  __: unknown
}
