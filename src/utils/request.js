import axios from 'axios'
import { AlertBox, delCookies } from '@/utils/util.js'
import router from '../router/index.js'
import { Loading } from 'element-ui'

// const baseURL = window.APP_CONFIG.BASE_URL
const baseURL = process.env.VUE_APP_BASE_API

// create an axios instance
const service = axios.create({
  baseURL: baseURL, // url = base url + request url

  timeout: 30000 // request timeout
})

const allowUrls = [
  '/file/download'
]
// 因为loading加上target将变为数组
let loading
let loadingCount = 0
const openLoading = () => {
  loading = Loading.service({
    text: '加载中',
    background: 'rgba(0, 0, 0,0)'
  })
}
const endLoading = () => {
  loading.close()
}

const showLoading = () => {
  if (loadingCount === 0) {
    openLoading()
  }
  loadingCount += 1
}
const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}
console.log(router)

// 切换路由时关闭loading
// router.beforeEach((to, from, next) => {
//   hideLoading()
//   next()
// })
service.interceptors.request.use(
  config => {
    if (!router.history.current.name === 'user-analysis') {
      showLoading()
    }
    return config
  },
  err => {
    hideLoading()
    return Promise(err)
  })

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    hideLoading()
    // 白名单路径不需要任何code判断
    for (let urlA = 0; urlA < allowUrls.length; urlA++) {
      if (response.config.url.indexOf(allowUrls[urlA]) > -1) {
        return res
      }
    }
    if (res.code !== 0) {
      if (res.code === 10 && res.message === '业务异常,根据token查询用户异常' || res.message === '无权限' && res.code === 40) {
        router.push({ path: '/login' })
        delCookies('Admin-Token', '', -1)
      } else {
        AlertBox('error', res.message || 'Error')
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    hideLoading()
    AlertBox('error', error.message)
    return Promise.reject(error)
  }
)

export const baseURLFileUpload = baseURL
export default service
