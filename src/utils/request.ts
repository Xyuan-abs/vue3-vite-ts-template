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
export interface ResponseData<T> {
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
