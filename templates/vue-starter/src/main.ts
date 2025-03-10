/*
 * @Author: 小凯同学
 * @Date: 2024-10-18 20:16:29
 * @LastEditors: 小凯同学
 * @LastEditTime: 2025-03-10 22:31:15
 * @Description: 主文件
 */

import router from '@/router' // vue Router
import pinia from '@/stores' // pinia store
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // Element Plus 图标
import { createApp } from 'vue'
import App from './App.vue'
import './styles' // global styles

import 'virtual:svg-icons-register' // svg icons

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(pinia).mount('#app')
