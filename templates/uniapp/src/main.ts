import { createSSRApp } from 'vue'
import 'core-js/actual/array/iterator'
import 'core-js/actual/promise'
import 'core-js/actual/object/assign'
import 'core-js/actual/promise/finally'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/index.scss'

import App from './App.vue'
import pinia from '@/stores'

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  return {
    app,
  }
}
