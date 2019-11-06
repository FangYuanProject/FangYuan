<template>
  <p>
    <span class="w dib">
      {{folder.name}}
      <span class="dib fr">
        <el-button type="primary" class="ml20 submit-data-btn" >编辑</el-button>
        <el-button type="primary" class="ml20 submit-data-btn" >删除</el-button>
      </span>
    </span>
    <tree-folder :children="folder.children"></tree-folder>
  </p>
</template>
<script>
  export default {
    props: {
      folder: {
        type: Array,
        default: () => {
          return []
        }
      },
    },
    beforeCreate() {
      this.$options.components.TreeFolder = () => import('./TreeFolder.vue')
    }
  }
</script>
