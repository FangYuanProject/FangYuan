<template>
  <p class="ul-folder">
    <span class="w dib">
      <a href="javascript:;" @click="showOrHide()" :class="{'ml20': folder.level === 1, 'ml40': folder.level === 2, 'ml60': folder.level === 3, 'ml80': folder.level === 4}" class="pr">
      <i :class="{'arrow-down': ulShow, 'arrow-up': !ulShow}"></i>{{ folder.name }}
      </a>
      <span class="dib fr pr100">
        <a v-if="folder.level === 1" href="javascript:;" class="list-btn ml20">新增年份</a>
        <a v-if="folder.level === 2" href="javascript:;" class="list-btn ml20">新增专业</a>
        <a v-if="folder.level === 3" href="javascript:;" class="list-btn ml20">新增方向</a>
        <a href="javascript:;" class="list-btn ml20">编辑</a>
        <a href="javascript:;" class="list-btn ml20">删除</a>
      </span>
    </span>
    <tree-folder :children="folder.children" :class="{'mh0': !ulShow, 'mh2000': ulShow}" :ref="folder.id"></tree-folder>
  </p>
</template>
<script>
export default {
  data() {
    return {
      ulShow: false
    }
  },
  props: {
    folder: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    showOrHide() {
      this.ulShow = !this.ulShow
      // if (this.ulShow) {
      //   const height = this.$refs[this.folder.id].$el.scrollHeight
      //   this.$refs[this.folder.id].$el.style.height = height + 'px'
      // } else {
      //   this.$refs[this.folder.id].$el.style.height = '0px'
      // }
    }
  },
  beforeCreate() {
    this.$options.components.TreeFolder = () => import('./TreeFolder.vue')
  }
}
</script>

<style lang="scss" scoped>
.ul-folder .w {
  a,
  span {
    display: inline-block;
    height: 35px;
    font-size: 14px;
    line-height: 35px;
  }
}

.ul-folder .w:hover {
  background: rgba(69, 90, 100, .1);
}

.arrow-down {
  position: absolute;
  top: 15px;
  left: -15px;
  border-top: 6px solid #3d546f;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  transform: translateX(-50%);
}

.arrow-up {
  position: absolute;
  top: 12px;
  left: -15px;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 6px solid #3d546f;
  transform: translateX(-50%);
}
</style>
