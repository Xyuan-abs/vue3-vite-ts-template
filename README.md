# 从零开始构建一个 Vue 3 + Typescript + Vite 项目

项目地址

- [github 地址](https://github.com/Xyuan-abs/vue3-vite-ts-template)
- [gitee 地址](https://gitee.com/xie_yuan_jiang/vue3-vite-ts-template)

## 一、创建基本项目

参考 [vite 官网](https://vitejs.cn/guide/#scaffolding-your-first-vite-project)

```sh
// 使用 npm
npm init vite@latest

// 使用 yarn
yarn create vite

// 使用 pnpm
pnpm create vite
```

选择 vue ，再选择 vue-ts

## 二、 配置 eslint + prettier

### 1、安装依赖

```sh
// 1.安装 eslint 相关依赖
yarn add eslint eslint-plugin-vue  @vue/eslint-config-typescript -D

// 2.安装 prettier 相关依赖
yarn add prettier eslint-plugin-prettier @vue/eslint-config-prettier -D

// 3.安装解析器
yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

### 2、配置 eslint

根目录下创建 .eslintrc.js 文件

```js
// .eslintrc.js

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
  ],
  parserOptions: {
    ecmaVersion: 2022,
    parser: '@typescript-eslint/parser',
    requireConfigFile: false,
    sourceType: 'module',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', '404'],
      },
    ],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
}
```

使用`<script setup>`语法糖时， `defineProps`、`defineEmits`等方法会报`no-undef`错误，需要在`.eslintrc.js`中添加以下代码。

```js
// .eslintrc.js

module.exports = {
  // ... 其他配置
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
}
```

### 3、 配置 prettier

根目录下创建 .prettierrc 文件

```json
{
  "semi": false,
  "singleQuote": true,
  "endOfLine": "auto",
  "printWidth": 100
}
```

如果配置完没有效果，重启 vscode 即可

## 三、设置 alias

```js
// vite.config.ts

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
})
```

```json
// tsconfig.json

{
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  }
}
```

## 四、基础目录结构

```
|-- vue3-vite-ts-template
    |-- public
    |-- src
        |-- api // 接口文件
        |-- assets // 静态文件
        |-- components // 全局组件
        |-- hooks // hooks
        |-- router // 路由
        |-- store // 状态管理器
        |-- styles // 全局样式
        |-- utils // 公共方法
        |-- views // 视图文件
        |-- App.vue
        |-- env.d.ts
        |-- main.ts
    |-- .env.development
    |-- .env.production
    |-- .env.staging
    |-- .eslintrc.js
    |-- .gitignore
    |-- .prettierrc
    |-- index.html
    |-- package.json
    |-- README.md
    |-- tsconfig.json
    |-- vite.config.ts
    |-- yarn.lock
```

## 五、添加 sass 和 全局样式

### 1、添加依赖

```sh
yarn add sass sass-loader -D
```

### 2、添加 全局样式

在 `/src/styles` 下创建 `index.scss` 文件，根据自己习惯修改，以下提供一个模板

```scss
// index.scss

html {
  box-sizing: border-box;
}

body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: PingFangSC-Regular, PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft
      YaHei, Arial, sans-serif;
}

html,
body {
  height: 100%;
}

label {
  font-weight: 700;
}

#app {
  min-height: 100%;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

* {
  margin: 0;
  padding: 0;
}

a:focus,
a:active {
  outline: none;
}

a,
a:focus,
a:hover {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}

div:focus {
  outline: none;
}

.clearfix {
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: ' ';
    clear: both;
    height: 0;
  }
}

ul li {
  list-style-type: none;
}

// main-container global css
.app-container {
  padding: 16px;
}
```

在 `main.ts` 引入

```ts
import { createApp } from 'vue'
import App from './App.vue'

import './styles/index.scss'

const app = createApp(App)

app.mount('#app')
```

### 3、添加 全局 mixin

在 `/src/styles` 下创建 `mixin.scss` 文件，根据自己习惯添加

```scss
// mixin.scss

// 单行省略 、 多行省略
@mixin ellipsis($rowNum: 1) {
  @if ($rowNum == 1) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: $rowNum;
    overflow: hidden;
    word-break: break-all;
  }
}
```

在 `vite.config.js` 引入

```ts
// vite.config.js

export default defineConfig({
  // ... 其他配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/mixin.scss";`,
      },
    },
  },
})
```

## 六、配置环境

根目录下创建 `.env.development`、 `.env.production`、 `.env.staging`

```env
# .env.development 开发环境

# just a flag
ENV = 'development'

# 命名规范 `VITE_为前缀的变量才会暴露给经过vite`处理的代码

# base api
VITE_APP_BASE_API = 'http://xxxx.xxx'

```

```env
# .env.production 生产环境

# just a flag
ENV = 'production'
NODE_ENV =  'production'

# base api
VITE_APP_BASE_API = 'http://xxxx.xxx'

```

```env
# .env.staging  测试环境

# just a flag
ENV = 'staging'
NODE_ENV =  'production'

# base api
VITE_APP_BASE_API = 'http://xxxx.xxx'

```

```json
// package.json
{
  "build:stage": "vite build --mode staging", //测试环境 打包
  "build": "vite build" //生产环境 打包
}
```

## 七、添加接口 Api

这里还是使用 `axios` 来处理，有个 `vue-request`看上去还可以，之后再研究

### 1、安装依赖

```sh
yarn add axios
```

### 2、封装 axios

```ts
import axios, { AxiosRequestConfig } from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API as string, // url = base url + request url
  timeout: 1000 * 30, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    // if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    // config.headers['X-Token'] = getToken()

    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

/* 接口统一返回格式 */
interface ResponseData<T> {
  code: number
  success: boolean
  msg: string
  data?: T
}

const request = <T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>> => {
  return new Promise((resolve, reject) => {
    service
      .request<ResponseData<T>>(config)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })
}

export default request
```

### 3、创建 api 文件（示例）

在 `/src/api/types` 下创建 `user.d.ts`

```ts
// user.d.ts

/* 登录 */
export interface loginParams {
  account: string
  password: string
}
export interface loginResult {
  token: string
}
```

在 `/src/api` 下创建 `user.ts`

```ts
// user.ts

import request from '@/utils/request'

import { loginParams, loginResult } from './types/user'

/* 登录 */
export function login(data: loginParams) {
  return request<loginResult>({
    url: '/xxx/xxx/xxx',
    method: 'post',
    data,
  })
}
```

## 八、添加路由

参考 [vue-router 官网](https://next.router.vuejs.org/zh/introduction.html)

### 1、添加依赖

```sh
yarn add vue-router@4

yarn add nprogress // 加载进度条 非必须
```

### 2、配置路由

`/src/router` 下创建 `index.ts` 、 `routes.ts`  
`/src/views` 下创建 `dashboard/index.vue` 、 `404.vue`

```ts
// index.ts
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

/**
 * 路由模式一共有三种：
 *    createWebHistory
 *    createWebHashHistory
 *    createMemoryHistory
 * 这里使用的是路由的 hash 模式
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router
```

```ts
// routes.ts
import { RouteRecordRaw } from 'vue-router'

/**
 * 固定路由
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

/**
 * 权限路由
 */
const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '首页',
    },
  },
  // ... 其他具体路由页面
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
```

### 3、配置全局路由守卫

`/src` 下添加全局路由守卫 `permission.ts`

```ts
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  // do something

  next()
})

router.afterEach(() => {
  NProgress.done()
})
```

如果 `nprogress` 提示无法找到模块的声明文件，在 npm 上下载一个就行

```sh
yarn add @types/nprogress -D
```

### 4、在 main.ts 引入

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// router
import router from '@/router'
import './permission'
app.use(router)

app.mount('#app')
```

### 5、配置路由入口

```vue
<!-- app.vue -->

<router-view v-slot="{ Component }">
  <component :is="Component" />
</router-view>
```

## 九、添加状态管理器（pinia）

参考 [pinia 官网](https://pinia.vuejs.org/introduction.html)

### 1、添加依赖

```sh
yarn add pinia
```

### 2、配置 pinia(示例)

在 `/src/store` 下创建 `index.ts`

```ts
// index.ts

import { createPinia } from 'pinia'
const store = createPinia()

export default store
```

在 `/src/store` 下创建 `user.ts`

```ts
// user.ts

import { defineStore } from 'pinia'

import { login } from '@/api/user'
import { loginParams } from '@/api/types/user'

// useUserStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userName: 'Admin',
      type: 0,
      token: '',
    }
  },
  getters: {
    isAdmin(state) {
      return state.type === 0
    },
  },
  actions: {
    login(account: string, password: string) {
      const params: loginParams = {
        account,
        password,
      }

      login(params).then((res) => {
        if (res?.data) {
          this.userName = '张三'
          this.type = 1
          this.token = res.data.token
        }
      })
    },
  },
})
```

### 3、在 main.ts 引入

```ts
// main.ts

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// store
import store from '@/store'
app.use(store)

app.mount('#app')
```

### 4、调用示例

```vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const store = useUserStore()
// 属性
const { userName, isAdmin } = storeToRefs(store)
// 方法
store.login('1515123445', '*******')
</script>

<template>
  <div>
    <p>userName：{{ userName }}</p>
    <p>isAdmin：{{ isAdmin }}</p>
  </div>
</template>
```

### 5、数据持久化

插件 pinia-plugin-persist 可以辅助实现数据持久化功能。

1. 安装

```sh
yarn add pinia-plugin-persist
```

2. 使用

```ts
// src/store/index.ts

import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist)

export default store
```

```ts
// user.ts

import { defineStore } from 'pinia'

import { loginParams, login } from '@/api/user'

// useUserStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userName: 'Admin',
      type: 0,
    }
  },
  // ... 其他配置
  persist: {
    enabled: true, // 开启数据缓存
    strategies: [
      {
        storage: localStorage, //持久化存储位置
        paths: ['userName'], //持久化字段
      },
    ],
  },
})
```

## 十、打包配置

### 1、打包时删除 console 和 debugger

```ts
// vite.config.js

import { defineConfig } from 'vite'

export default defineConfig({
  //...
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
```
