<template>
  <el-button type="primary" class="search-btn" @click="searchList">查询</el-button>
</template>
<style lang="scss">
.search-btn {
  width: 87px;
  height: 40px;
  margin-left: 30px;
  font-size: 14px;
  color: #455a64;
  background: rgba(241, 241, 241, 1);
  border: 1px solid rgba(69, 90, 100, 1);
  border-radius: 4px;
}

</style>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    searchList() {
      this.$emit('click')
    }
  }
}
</script>
