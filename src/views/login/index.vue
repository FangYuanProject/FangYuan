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
          <span class="text_tip">使用邮箱登录</span>
        </div>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="请输入邮箱"
          name="email"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          name="password"
          autocomplete="on"
        />
      </el-form-item>
      <!-- <el-checkbox :checked="isAutoLogin" label="自动登录" fill="#455A64" /> -->

      <el-button :loading="loading" type="primary" class="login-btn" @click.native.prevent="handleLogin" @keyup.enter.native="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import { login, userMenu } from '@/api/index'
//  validPhone, validEmail,
// import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  // components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (validEmail(value)) {
        callback()
      } else {
        callback(new Error('请输入正确格式的邮箱'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('请输入至少8位密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      showDialog: false,
      isAutoLogin: true
    }
  },
  destroyed() {
  },
  methods: {
    handleLogin() {
      const data = this.loginForm
      login(data).then(res => {
        localStorage.setItem('userName', res.data.username)
        userMenu({ roleCode: res.data.roleCode }).then(resList => {
          if (resList.data && resList.data.menuList) {
            localStorage.setItem('_menu', JSON.stringify(resList.data.menuList))
            this.$router.push({ path: '/' })
          } else {
            // 没菜单权限退出登录
          }
        })
      })
    }
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
