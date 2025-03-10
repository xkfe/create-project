import type { PersistenceOptions } from 'pinia-plugin-persistedstate'

/**
 * @description pinia 持久化参数配置
 * @param {string} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 */
function piniaPersistConfig(key: string, paths?: string[]) {
  const persist: PersistenceOptions = {
    key,
    storage: localStorage,
    // storage: sessionStorage,
    pick: paths,
    debug: import.meta.env.DEV,
  }
  return persist
}

export default piniaPersistConfig
