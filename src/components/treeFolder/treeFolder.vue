<template>
  <ul>
    <li v-for="child in children" :key="child.id">
      <ulFolders v-if="child.children" :folder="child"></ulFolders>
      <span v-else>{{ child.name }}</span>
    </li>
  </ul>
</template>
<script>
  import ulFolders from './ulFolders.vue'
  export default {
    components: {
      ulFolders
    },
    props: {
      children: {
        type: Array,
        default: () => {
          return []
        }
      }
    }
  }
</script>