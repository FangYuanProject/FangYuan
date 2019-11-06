<template>
  <ul>
    <li v-for="child in children" :key="child.id">
      <ul-folders v-if="child.children" :folder="child"></ul-folders>
      <span v-else>{{ child.name }}</span>
    </li>
  </ul>
</template>
<script>
import UlFolders from './UlFolders.vue'
export default {
  components: {
    UlFolders
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
