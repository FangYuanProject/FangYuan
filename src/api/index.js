import axios from '@/utils/request.js'
import { clearNullValue } from '@/utils/util.js'

// 登录
export const login = data => axios.post('/login', data)
// 退出登录
export const loginOut = data => axios.post('/logout', data)
// 新增用户
export const addUser = data => axios.post('/auth/add', clearNullValue(data))
// 用户列表
export const userList = data => axios.post('/auth/search', clearNullValue(data))
// 用户详情
export const userDetail = data => axios.post('/auth/detail', clearNullValue(data))
