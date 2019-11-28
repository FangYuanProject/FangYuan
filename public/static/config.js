// 应用全局配置文件使用用例
; (function (win) {
  win.APP_CONFIG = {
    BASE_URL: 'http://' + win.location.host + '/web/',
  }
})(window)