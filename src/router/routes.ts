import { RouteRecordRaw } from 'vue-router'

/**
 * 固定路由
 *  所有的用户都可以访问
 */
const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
  },
]

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '首页',
    },
  },
]

/**
 * 结尾路由
 */
const endRoutes: RouteRecordRaw[] = [
  // 没有匹配地址，跳转到 404，要放在最后
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404',
    meta: {
      hidden: true,
    },
  },
]

const routes: RouteRecordRaw[] = [...staticRoutes, ...asyncRoutes, ...endRoutes]

export default routes
