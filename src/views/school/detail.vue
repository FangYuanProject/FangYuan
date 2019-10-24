<template>
  <div>
    <h2 class="title">学校主页</h2>
    <div>
      <p>{{ schoolName }}</p>
    </div>
  </div>
</template>
<script>
// import tableComponents from '@/components/tableComponents'
export default {
  components: {},
  data() {
    return {
      schoolName: '华农'
    }
  }
}
</script>

<style lang="scss" scoped>
    .title{
        font-size: 20px;
        color:#202431;
        margin: 26px 0 69px 30px;
    }
</style>

