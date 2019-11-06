<template>
  <ul class="tree-folder">
    <li v-for="child in children" :key="child.id">
      <ul-folders v-if="child.children" :folder="child"></ul-folders>
      <span v-else class="w dib">
        <a href="javascript:;" :class="{'ml40': child.level === 2, 'ml60': child.level === 3, 'ml80': child.level === 4}">
          {{ child.name }}
        </a>
        <span class="dib fr pr100">
          <a v-if="child.level === 1" href="javascript:;" class="list-btn ml20">新增年份</a>
          <a v-if="child.level === 2" href="javascript:;" class="list-btn ml20">新增专业</a>
          <a v-if="child.level === 3" href="javascript:;" class="list-btn ml20">新增方向</a>
          <a href="javascript:;" class="list-btn ml20">编辑</a>
          <a href="javascript:;" class="list-btn ml20">删除</a>
        </span>
      </span>
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

<style lang="scss" scoped>
.tree-folder {
  overflow: hidden;
  transition: max-height ease-in-out .2s;
}

.tree-folder .w {
  a,
  span {
    height: 35px;
    font-size: 14px;
    line-height: 35px;
  }
}

.tree-folder .w > span {
  cursor: pointer;
}

.tree-folder .w:hover {
  background: rgba(69, 90, 100, .1);
}
</style>
