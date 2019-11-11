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
// 用户新闻收藏列表
export const collectNews = data => axios.post('/collection/news/list', clearNullValue(data))
// 用户学校收藏列表
export const collectSchool = data => axios.post('/collection/school', clearNullValue(data))
// 用户真题收藏列表
export const collectExamList = data => axios.post('/collection/exam/list', clearNullValue(data))
// 用户帖子收藏列表
export const collectPostList = data => axios.post('/collection/post/list', clearNullValue(data))
// 新闻列表
export const newsList = data => axios.post('/news/search', clearNullValue(data))
// 发布新闻
export const publishNews = data => axios.post('/news/release', clearNullValue(data))
// 保存新闻
export const saveNews = data => axios.post('/news/add', clearNullValue(data))
// 下架新闻
export const unshelveNews = data => axios.post('/news/unshelve', clearNullValue(data))
// 删除新闻
export const deleteNews = data => axios.post('/news/delete', clearNullValue(data))
// 新闻详情
export const newsDetail = data => axios.post('/news/detail', clearNullValue(data))
// 更新新闻
export const editNews = data => axios.post('/news/edit', clearNullValue(data))
// 文件上传
export const uploadImg = data => axios.post('/file/upload', clearNullValue(data))
