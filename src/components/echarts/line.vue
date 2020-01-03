<template>
  <div :id="id" :style="{width:width,height:height}"></div>
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/component/dataZoom')
export default {
  name: 'LineCharts',
  props: {
    id: {
      type: String,
      default: 'eLine'
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
    drawChart() {
      const myChart = echarts.init(document.getElementById(this.id))
      myChart.setOption(this.opt)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
