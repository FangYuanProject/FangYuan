<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
.app-main {
  position: relative;
  width: 100%;

  /* 50 = navbar  */
  min-height: calc(100vh - 50px);
  overflow: hidden;
  background: #f0f0f0;

  & > div {
    width: 97%;
    padding-bottom: 30px;
    margin: 30px auto;
    overflow: hidden;
    background-color: #fff;

    .title {
      height: 56px;
      padding: 26px 0 0 30px;
      font-size: 20px;
      line-height: 0;
      color: #202431;
      border-bottom: 1px solid #ebeef5;
    }
  }
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
.app-main {
  & > div {
    & > .el-form {
      padding: 0 30px;
    }
  }
}
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #455a64;
  border-color: #455a64;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #757575;
}

.el-dialog__body {
  .el-form-item__label {
    width: 85px;
    font-size: 14px;
    color: #757575;
    text-align: right;
  }

  .el-input,
  .el-input-group,
  .el-textarea {
    width: 80%;
  }

  .el-select .el-input {
    width: 377px;
  }

  .el-form-item__error {
    left: 42%;
  }
}

.el-dialog__header {
  height: 56px;
  border-bottom: 1px solid #ebeef5;
}

.el-dialog__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  color: rgba(32, 36, 49, 1);
}

.el-dialog__footer {
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-top: 1px solid #ebeef5;

  .submit-data-btn {
    width: 86px;
    height: 40px;
    padding: 0;
    font-size: 14px;
    color: #fff;
    background: rgba(69, 90, 100, 1);
    border-color: rgba(69, 90, 100, 1);
    border-radius: 4px;

    span.iconfabu {
      font-size: 14px;
    }
  }

  .edit-data-btn {
    width: 88px;
    height: 40px;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 40px;
    color: rgba(69, 90, 100, 1);
    text-align: center;
    background: rgba(241, 241, 241, 1);
    border: 1px solid rgba(69, 90, 100, 1);
    border-radius: 4px;
  }
}
</style>
