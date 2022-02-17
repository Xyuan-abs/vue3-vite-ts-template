import { createApp } from 'vue'
import App from './App.vue'

import './styles/index.scss'

const app = createApp(App)

// router
import router from '@/router'
import './permission'
app.use(router)

// store
import store from '@/store'
app.use(store)

app.mount('#app')
