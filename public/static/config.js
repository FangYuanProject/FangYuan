// 应用全局配置文件使用用例
; (function (win) {
  // var pathName = win.location.pathname.split('/')[1]
  win.APP_CONFIG = {
    BASE_URL: win.location.protocol + '//' + win.location.host + '/' + 'cms' + '/'
    // BASE_URL: 'http://defunction.cn/cms/'
  }
})(window)