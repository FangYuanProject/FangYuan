import axios from 'axios'
import { AlertBox } from '@/utils/util.js'
import router from '@/router'
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
const loadingArray = []
const openLoading = () => {
  loading = Loading.service({
    target: document.querySelector('#table-render'),
    text: '加载中'
  })
}

service.interceptors.request.use(
  config => {
    loadingCount++
    openLoading()
    loadingArray.push(loading)
    return config
  },
  err => {
    loadingCount--
    if (!loadingCount) {
      loadingArray.forEach(item => item.close())
    }
    return Promise(err)
  })

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    loadingCount--
    if (!loadingCount) {
      loadingArray.forEach(item => item.close())
    }
    // 白名单路径不需要任何code判断
    for (let urlA = 0; urlA < allowUrls.length; urlA++) {
      if (response.config.url.indexOf(allowUrls[urlA]) > -1) {
        return res
      }
    }
    if (res.code !== 0) {
      if (res.code === 10 && res.message === '业务异常,根据token查询用户异常' || res.message === '无权限' && res.code === 40) {
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
    loadingCount--
    if (!loadingCount) {
      loadingArray.forEach(item => item.close())
    }
    AlertBox('error', error.message)
    return Promise.reject(error)
  }
)

export const baseURLFileUpload = baseURL
export default service
