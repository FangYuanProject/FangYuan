<template>
  <div>
    <h2 class="title">用户主页</h2>
    <div>
      {{ userInfo.name }}
    </div>
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
      margin: 26px 0 69px 30px;
      font-size: 20px;
      color: #202431;
    }
</style>

