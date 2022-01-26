import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 路由模式一共有三种 createWebHistory  / createWebHashHistory / createMemoryHistory
 * 这里使用的是路由的hash模式
 */

import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router
