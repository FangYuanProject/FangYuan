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
    if (param[i] === '') {
      delete param[i]
    }
  }
  return param
}
