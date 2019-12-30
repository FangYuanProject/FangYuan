<template>
  <div :id="id" :style="{width:width,height:height}"></div>
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
export default {
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
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      data: ''
    }
  },
  mounted() {
    this.drawBar()
  },
  methods: {
    drawBar() {
      const chartBar = echarts.init(document.getElementById(this.id))
      chartBar.setOption({
        title: { show: false },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
