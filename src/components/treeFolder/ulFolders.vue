<template>
  <p>
    <span>{{folder.name}}</span>
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
      this.$options.components.TreeFolder = () => import('./treeFolder.vue')
    }
  }
</script>