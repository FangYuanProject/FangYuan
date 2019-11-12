<template>
  <div class="status" :style="{'display':isInline}">
    <el-form-item label="状态">
      <el-select v-model="statusValue" placeholder="请选择">
        <el-option v-for="(item,index) in statusOptions" :key="index" :label="item.value" :value="item.key" @click.native="emitChange" />
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
import { status } from '@/api/index'
export default {
  props: {
    isInline: {
      type: String,
      default: () => {
        'inline'
      }
    }
  },
  data() {
    return {
      statusOptions: [],
      statusValue: ''
    }
  },
  mounted() {
    this.getStatus()
  },
  methods: {
    getStatus() {
      status().then(res => {
        this.statusOptions = res.data
      })
    },
    emitChange() {
      this.$emit('change', this.statusValue)
    }
  }
}
</script>
