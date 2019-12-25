import { MessageBox, Message } from 'element-ui'
/**
 * @param {string} type
 * @param {string} title
 * @param {function} successCallBack,failCallBack
 * @returns {Object}
 */
export function comfirmBox(type, title, successCallBack, failCallBack) {
  MessageBox.confirm(title, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  }).then(() => {
    successCallBack()
  }).catch(() => {
    failCallBack()
  })
}
/**
   * @param {string} type
   * @param {string} message
   * @returns {Object}
   */
export function AlertBox(type, message) {
  Message({
    showClose: true,
    message: message,
    type: type
  })
}

/** 清除参数中的空值
   * @param {object} param
   * @returns {Object}
   */
export function clearNullValue(param) {
  for (const i in param) {
    if (param[i] === '' || param[i] === null) {
      delete param[i]
    }
  }
  return param
}
/** 7
 * 时间格式转换
 */
export function dateTimeStr(time) {
  if (!time) {
    return ''
  }
  let timeStr = ''
  const dateStr = new Date(time)
  const year = dateStr.getFullYear()
  const month = dateStr.getMonth() + 1
  const day = dateStr.getDate()
  const hour = dateStr.getHours()
  const min = dateStr.getMinutes()
  const sec = dateStr.getSeconds()
  timeStr = year + '-' + (month > 9 ? month : ('0' + month)) + '-' + (day > 9 ? day : ('0' + day)) + ' ' + (hour > 9 ? hour : ('0' + hour)) + ':' + (min > 9 ? min : ('0' + min)) + ':' + (sec > 9 ? sec : ('0' + sec))
  return timeStr
}
/** 验证表单参数是否通过
   * @param {String} formName
   * @returns {Function} callback
   */
export async function vaildForm(form) {
  let flag = false
  form.validate((vaild) => {
    flag = vaild
  })

  return flag
}

export function calcWordLength(str, length) {

}
