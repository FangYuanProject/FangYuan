<template>
  <div :id="id" :style="{width:width,height:height}"></div>
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/dataZoom')
export default {
  name: 'BarCharts',
  props: {
    id: {
      type: String,
      default: 'eBar'
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '400px'
    },
    opt: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    return {
      data: ''
    }
  },
  mounted() {
  },
  methods: {
    drawBar() {
      const chartBar = echarts.init(document.getElementById(this.id))
      chartBar.setOption(this.opt)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
