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

      login(params).then(() => {
        this.userName = '张三'
        this.type = 1
      })
    },
  },
})
