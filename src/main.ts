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
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
