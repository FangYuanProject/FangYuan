<template>
  <div class="user-home">
    <h2 class="title">用户主页</h2>
    <div class="float-left user-info">123</div>
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
  border-right: 1px solid #ebeef5;
}
</style>

