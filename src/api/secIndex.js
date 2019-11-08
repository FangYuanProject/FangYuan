import request from '@/utils/request'
import { clearNullValue } from '@/utils/util.js'

/** **********
 *  学校接口
********** **/
// 学校列表
export async function schoolList(data) {
  return request({
    url: '/school/search',
    method: 'post',
    data: clearNullValue(data)
  })
}

// 新建学校
export async function schoolAdd(data) {
  return request({
    url: '/school/add',
    method: 'post',
    data: clearNullValue(data)
  })
}

// 删除学校
export async function schoolDel(data) {
  return request({
    url: '/school/delete',
    method: 'post',
    data: clearNullValue(data)
  })
}

// 学校详情
export async function schoolDetail(data) {
  return request({
    url: '/school/detail',
    method: 'post',
    data: clearNullValue(data)
  })
}

// 学校编辑
export async function schoolEdit(data) {
  return request({
    url: '/school/edit',
    method: 'post',
    data: clearNullValue(data)
  })
}

// 发布学校
export async function schoolRelease(data) {
  return request({
    url: '/school/release',
    method: 'post',
    data: clearNullValue(data)
  })
}

// 下架学校
export async function schoolUnshelve(data) {
  return request({
    url: '/school/unshelve',
    method: 'post',
    data: clearNullValue(data)
  })
}
