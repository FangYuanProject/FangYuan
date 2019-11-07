import axios from '@/utils/request.js'
// 登录
export const login = data => axios.post('/login', data)
// 退出登录
export const loginOut = data => axios.post('/logout', data)
// 新增用户
export const addUser = data => axios.post('/auth/add', data)
