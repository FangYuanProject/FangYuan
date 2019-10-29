<template>
  <div class="user-home">
    <h2 class="title">用户主页</h2>
    <div class="float-left user-info">
      <div class="top">
        <p>
          <span class="user-head">
            <img src="@/assets/user-head-default.png" alt="">
          </span>
          <el-button type="primary" class="change-user-photo">更换头像</el-button>
        </p>
        <p>
          <span class="user-name">张一凡</span>
          <span class="edit-user-info">编辑资料</span>
        </p>
      </div>
    </div>
    <div class="float-right user-collect">456</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userInfo: {
        name: 'Mr.Zhange'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 56px;
  padding: 26px 0 0 30px;
  font-size: 20px;
  line-height: 0;
  color: #202431;
  border-bottom: 1px solid #ebeef5;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.user-info {
  width: 40%;
  height: 100%;
  text-align: center;
  border-right: 1px solid #ebeef5;

  .user-head {
    display: block;
    width: 132px;
    height: 132px;
    line-height: 132px;
    text-align: center;
    background: #fff;
    border-radius: 10px;
    opacity: .5;
  }

  .user-name {
    font-size: 24px;
    font-weight: 600;
    color: rgba(32, 36, 49, 1);
  }
}
</style>
<style>
.change-user-photo {
  width: 87px;
  height: 28px;
  padding: 0;
  line-height: 28px;
  text-align: center;
  background: rgba(69, 90, 100, 1);
  border: 1px solid rgba(69, 90, 100, 1);
  border-radius: 4px;
}
</style>

