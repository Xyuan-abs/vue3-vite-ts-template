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
