/*
 * @Author: 小凯同学
 * @Date: 2025-03-10 20:56:10
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 20:56:12
 * @Description:
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// pinia persist
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
