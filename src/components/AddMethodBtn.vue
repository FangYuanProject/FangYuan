<template>
  <el-button type="primary" class="add-btn" @click="addClickBtn">+&nbsp;新增{{ name }}</el-button>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    addClickBtn() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
.add-btn {
  width: 109px;
  height: 40px;
  margin-left: 123px;
  font-size: 14px;
  color: #fff;
  background: rgba(69, 90, 100, 1);
  border-color: rgba(69, 90, 100, 1);
  border-radius: 4px;
}

</style>
