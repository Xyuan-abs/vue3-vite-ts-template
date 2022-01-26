import request from '@/utils/request'

/* 登录 */
export type loginParams = {
  account: string
  password: string
}
export function login(data: loginParams) {
  return request({
    url: '/xxx/xxx/xxx',
    method: 'post',
    data,
  })
}
