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
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['userName'],
      },
    ],
  },
})
