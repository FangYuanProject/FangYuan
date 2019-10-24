<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <div class="logo_img">
          <img src="@/assets/logo.png" alt="">
        </div>
      </div>
      <el-form-item prop="username">
        <div class="sub-title-container">
          <p class="sub_title">登录</p>
          <span class="text_tip">使用手机号或邮箱登录</span>
        </div>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入手机号或邮箱"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-tooltip>
      <el-checkbox :checked="isAutoLogin" label="自动登录" fill="#455A64" />

      <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
//  validPhone, validEmail,
// import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  // components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!validEmail(value) && !validPhone(value)) {
      //   callback(new Error('请输入手机号码或邮箱'))
      // } else {
      //   callback()
      // }
      if (validUsername(value)) {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入至少6位密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      isAutoLogin: true
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
$bg:#efefef;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: relative;
  width: 100%;
  min-height: 100%;
  margin: 0 auto;
  overflow: hidden;
  background-color: $bg;

  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 388px;
    height: 536px;
    padding: 0 40px;
    margin-top: -269px;
    margin-left: -194px;
    background-color: #fff;
    border-radius: 0 6px 6px 0;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, .15);
  }

  .title-container {
    position: relative;

    .logo_img {
      margin: 40px auto 50px;
      text-align: center;
    }
  }

  .sub-title-container {
    margin-bottom: 40px;

    .sub_title {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: rgba(32, 36, 49, 1);
    }

    .text_tip {
      font-size: 16px;
      color: #333;
    }
  }

  .login-btn {
    width: 294px;
    height: 36px;
    margin-top: 35px;
    font-size: 14px;
    color: #fff;
    background: #455a64;
    border: 1px solid #455a64;
    border-radius: 18px;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
<style lang="scss">
  .login-container .el-checkbox__input.is-checked + .el-checkbox__label,
  .el-checkbox__input.is-checked .el-checkbox__inne {
    color: #676767;
  }

  .login-container .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #676767;
    border-color: #676767;
  }

  .login-container .el-checkbox {
    margin-top: 34px;
  }

  .login-container .el-input__inner,
  .login-container .el-form-item.is-error .el-input__inner,
  .login-container .el-form-item.is-error .el-input__inner:focus,
  .login-container .el-form-item.is-error .el-textarea__inner,
  .login-container .el-form-item.is-error .el-textarea__inner:focus {
    border-top: none;
    border-right: none;
    border-left: none;
    border-radius: 0;
  }
</style>
