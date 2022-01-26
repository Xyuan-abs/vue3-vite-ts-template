import { createApp } from 'vue'
import App from './App.vue'

import './styles/index.scss'

const app = createApp(App)

// router
import router from '@/router'
import './permission'
app.use(router)

// pinia
import { createPinia } from 'pinia'
import * as a from 'pinia'
console.log('%c [ a ]-16', 'font-size:13px; background:pink; color:#bf2c9f;', a)
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
