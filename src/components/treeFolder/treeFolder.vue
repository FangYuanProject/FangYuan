<template>
  <ul class="tree-folder">
    <li v-for="child in children" :key="child.id">
      <ul-folders v-if="child.children" :folder="child" />
      <span v-else class="w dib">
        <a href="javascript:;" :class="{'ml40': child.level === 2, 'ml60': child.level === 3, 'ml80': child.level === 4}">
          {{ child.name }}
        </a>
        <span class="dib fr pr100">
          <!-- <a v-if="child.level === 1" href="javascript:;" class="list-btn ml20" @click="adds('year', child.id)">新增年份</a> -->
          <a v-if="child.level === 2" href="javascript:;" class="list-btn ml20" @click="adds('major', child.id)">新增专业</a>
          <a v-if="child.level === 3" href="javascript:;" class="list-btn ml20" @click="adds('direction', child.id)">新增方向</a>
          <a href="javascript:;" class="list-btn ml20" @click="editor(child.level, child.id)">编辑</a>
          <a href="javascript:;" class="list-btn ml20" @click="delList(child.level, child.id)">删除</a>
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
  },
  created() {
    this.init()
  },
  methods: {
    init() {

    },
    adds(type, id) {
      let methods = ''
      if (type === 'year') { // 新增年份
        methods = 'newYear'
      } else if (type === 'direction') { // 新增方向
        methods = 'newDirection'
      } else { // 新增专业
        methods = 'newMajor'
      }
      this.$emit(methods, id)
    },
    editor(level, id) { // 编辑
      console.log('editorlevelid', level, id)
    },
    delList(level, id) { // 删除
      console.log('dellevelid', level, id)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-folder {
  overflow: hidden;
  transition: max-height ease-in-out s;
}

.tree-folder .w {
  a,
  span {
    display: inline-block;
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
