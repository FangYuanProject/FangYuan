import request from '@/utils/request'
import { clearNullValue } from '@/utils/util'

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
    data: data
  })
}

// 学校详情
export async function schoolDetail(data) {
  return request({
    url: '/school/detail',
    method: 'post',
    data: data
  })
}

// 学校编辑
export async function schoolEdit(data) {
  return request({
    url: '/school/edit/university',
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
    data: data
  })
}

/**
 * 学院
 *
 */
// 获取学校的所有学院
export async function collegeSearch(data) {
  return request({
    url: '/college/search',
    method: 'post',
    data: data
  })
}

// 新建学院
export async function collegeAdd(data) {
  return request({
    url: '/college/add',
    method: 'post',
    data: clearNullValue(data)
  })
}

// 删除学院
export async function collegeDel(data) {
  return request({
    url: '/college/delete',
    method: 'post',
    data: data
  })
}

// 学院详情
export async function collegeDetail(data) {
  return request({
    url: '/college/detail',
    method: 'post',
    data: data
  })
}

// 编辑学院
export async function collegeEdit(data) {
  return request({
    url: '/college/edit',
    method: 'post',
    data: clearNullValue(data)
  })
}

/**
 * 地区列表
 */
export async function regionList() {
  return request({
    url: '/region/list',
    method: 'post'
  })
}
/**
 * 学校特性列表
 */
export async function propertyList() {
  return request({
    url: '/school/property',
    method: 'post'
  })
}

/**
 * 学校状态
 */
export async function status() {
  return request({
    url: '/school/status',
    method: 'post'
  })
}

// 学校logo图片上传
export async function schoolLogoUpload(data) {
  return request({
    url: '/file/upload?privilege=PUBLIC',
    method: 'post',
    data: data,
    processData: false,
    contentType: false
  })
}
