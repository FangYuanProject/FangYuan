<template>
  <div :id="id" :style="{width:width,height:height}" />
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/map')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/visualMap')
require('echarts/lib/component/geo')
import chinaMap from 'echarts/map/json/china.json'
export default {
  name: 'MapCharts',
  props: {
    id: {
      type: String,
      default: 'eMap'
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
    echarts.registerMap('china', chinaMap)
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
