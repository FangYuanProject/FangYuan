<template>
  <div class="user-home">
    <h2 class="title">用户主页</h2>
    <div class="float-left user-info">
      <div class="top">
        <div class="change-user-head">
          <span class="user-head">
            <img src="@/assets/user-head-default.png" alt="">
          </span>
          <el-button type="primary" class="change-user-photo">更换头像</el-button>
        </div>
        <div class="edit-user-info">
          <p>
            <span class="user-name">张一凡</span>
            <span class="edit-user-btn">编辑资料</span>
          </p>
          <p>
            <span class="label-name">邮箱：</span>
            <span class="label-value">zhangyifan@yy.com</span>
          </p>
          <p>
            <span class="label-name">手机：</span>
            <span class="label-value">18825055554</span>
          </p>
          <p>
            <span class="label-name">本科院校：</span>
            <span class="label-value">天津大学</span>
          </p>
          <p>
            <span class="label-name">考研院校：</span>
            <span class="label-value">北京大学</span>
          </p>
          <p>
            <span class="label-name">是否跨考：</span>
            <span class="label-value">否</span>
          </p>
          <p>
            <span class="label-name">本科入学年份</span>
            <span class="label-value">2012</span>
          </p>
        </div>
      </div>
      <div class="bottom">
        <div class="recommand-code">
          <p class="">我的推荐码</p>
          <p>NUGBASJF &nbsp;<span class="iconfont iconfuzhi" /></p>
        </div>
        <div class="my-score">
          <p>我的积分</p>
          <p>100</p>
        </div>
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

.top {
  border-bottom: 1px solid #ebeef5;
}

.user-info {
  width: 40%;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #ebeef5;

  .change-user-head {
    display: inline-block;
    width: 200px;

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
  }

  .edit-user-info {
    display: inline-block;

    .user-name {
      font-size: 24px;
      font-weight: 600;
      color: rgba(32, 36, 49, 1);
    }

    .edit-user-btn {
      font-size: 14px;
      font-weight: 400;
      color: rgba(2, 102, 214, 1);
    }

    .label-name {
      font-size: 14px;
      color: #202431;
    }

    .label-value {
      font-size: 14px;
      color: #757575;
    }
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

