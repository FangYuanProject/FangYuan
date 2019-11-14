import axios from '@/utils/request.js'
import { clearNullValue } from '@/utils/util.js'

// 登录
export const login = data => axios.post('/login', data)
// 退出登录
export const loginOut = data => axios.post('/logout', data)
/*
    **** 用户模块 *****
*/
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
/*
    **** 新闻模块 *****
*/
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
// 新闻类型
export const newsType = data => axios.post('/news/type', clearNullValue(data))
// 相关学校
export const schoolCorrelation = data => axios.post('/school/correlation', data)
/*
    **** 角色模块 *****
*/
// 新增角色
export const addRole = data => axios.post('/role/add', clearNullValue(data))
// 删除角色
export const delRole = data => axios.post('/role/delete', clearNullValue(data))
// 编辑角色
export const editRole = data => axios.post('/role/edit', clearNullValue(data))
// 角色列表
export const roleList = () => axios.post('/role/list')
/*
    **** 课程模块 *****
*/
// 新增课程
export const addGoods = data => axios.post('/goods/add', clearNullValue(data))
// 删除课程
export const delGoods = data => axios.post('/goods/delete', clearNullValue(data))
// 编辑课程
export const editGoods = data => axios.post('/goods/edit', clearNullValue(data))
// 课程列表
export const goodseList = data => axios.post('/goods/search', clearNullValue(data))
// 发布课程
export const publishGoods = data => axios.post('/goods/release', clearNullValue(data))
// 下架课程
export const unshelveGoods = data => axios.post('/goods/unshelve', clearNullValue(data))
// 课程详情
export const goodsDetail = data => axios.post('/goods/detail', clearNullValue(data))
// 课程类型
export const goodsType = () => axios.post('/goods/type')
/*
    **** 意见反馈 *****
*/
// 意见列表
export const feedbackList = data => axios.post('/feedback/search', clearNullValue(data))
// 反馈详情
export const feedbackDetail = data => axios.post('/feedback/detail', clearNullValue(data))
// 邮箱回复
export const emailFeedback = data => axios.post('/feedback/email', clearNullValue(data))
// 短信回复
export const messageFeedBack = data => axios.post('/feedback/message', clearNullValue(data))
/*
    **** 菜单管理 *****
*/
// 菜单列表
export const menuList = data => axios.post('/menu/list', clearNullValue(data))
// 编辑菜单
export const editMenu = data => axios.post('/menu/edit', clearNullValue(data))
// 新增菜单
export const addMenu = data => axios.post('/menu/add', clearNullValue(data))
// 删除菜单
export const deleteMenu = data => axios.post('/menu/delete', clearNullValue(data))
/*
    **** 论坛管理 *****
*/
// 新增
export const addForum = data => axios.post('/forum/add', clearNullValue(data))
// 删除
export const delForum = data => axios.post('/forum/delete', clearNullValue(data))
// 详情
export const forumDeatil = data => axios.post('/forum/detail', clearNullValue(data))
// 发布
export const publishForum = data => axios.post('/forum/release', clearNullValue(data))
// 回复
export const replyForum = data => axios.post('/forum/reply', clearNullValue(data))
// 列表
export const forumList = data => axios.post('/forum/search', clearNullValue(data))
// 置顶
export const setTopForum = data => axios.post('/forum/top', clearNullValue(data))
// 类型
export const forumType = data => axios.post('/forum/type', clearNullValue(data))
// 下架
export const unsellForum = data => axios.post('/forum/unshelve', clearNullValue(data))
/*
    **** 公共模块 *****
*/
// 状态
export const status = () => axios.post('/status/list')
// 文件上传
export const uploadFile = () => axios.post('/file/upload?privilege=PUBLIC')

