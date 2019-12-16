import axios from 'axios'
import { AlertBox } from '@/utils/util.js'
import router from '@/router'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
const baseURL = window.APP_CONFIG.BASE_URL || process.env.VUE_APP_BASE_API
// const baseURL = process.env.VUE_APP_BASE_API

// create an axios instance
const service = axios.create({
  baseURL: baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})
console.log(router)

const allowUrls = [
  '/file/download'
]

// service.interceptors.request.use(
//   config => {
//     if (config.url.indexOf('/file/download') > -1) {
//       config.responseType = 'blob'
//     }
//     return config
//   }
// )

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // 白名单路径不需要任何code判断
    for (let urlA = 0; urlA < allowUrls.length; urlA++) {
      if (response.config.url.indexOf(allowUrls[urlA]) > -1) {
        return res
      }
    }
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 10 && res.message === '业务异常,根据token查询用户异常' || res.message === '无权限' && res.code === 40) {
        // // to re-login
        // AlertBox('error', '登录超时，请重新登录')
        router.push({ path: '/login' })
      } else {
        AlertBox('error', res.message || 'Error')
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    AlertBox('error', error.message)
    return Promise.reject(error)
  }
)

export const baseURLFileUpload = baseURL
export default service
