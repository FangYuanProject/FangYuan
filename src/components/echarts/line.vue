<template>
  <div :id="id" :style="{width:width,height:height}" />
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/tooltip')
export default {
  name: 'LineCharts',
  props: {
    id: {
      type: String,
      default: 'eLine'
    },
    width: {
      type: String,
      default: '100%'
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
      myChart: ''
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById(this.id))
  },
  methods: {
    drawChart() {
      this.myChart.hideLoading()
      this.myChart.setOption(this.opt)
      this.myChart.resize()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
