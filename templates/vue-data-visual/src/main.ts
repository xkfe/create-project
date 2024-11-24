import { createApp } from 'vue'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '@/styles/index.scss'
import '@/utils/microApp'

import { router } from '@/router'

createApp(App).use(router).mount('#app')
