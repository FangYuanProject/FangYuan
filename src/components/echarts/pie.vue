<template>
  <div :id="id" :style="{width:width,height:height}"></div>
</template>
<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/component/legend')
require('echarts/lib/chart/pie')
export default {
  name: 'PieCharts',
  props: {
    id: {
      type: String,
      default: 'ePie'
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
      type: Array,
      default: () => { return [] }
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
      const that = this
      const myChart = echarts.init(document.getElementById(this.id))
      const option = {
        title: { show: false },
        grid: {
          bottom: 20
        },
        legend: {
          orient: 'vertical',
          top: 'middle',
          right: 10,
          icon: 'circle',
          itemWidth: 7,
          itemHeight: 7,
          data: (() => {
            const arr = []
            this.opt.forEach(da => {
              arr.push(da.name)
            })
            return arr
          })(),
          formatter: function(da) {
            let daStr = ''
            that.opt.forEach(arr => {
              if (arr.name === da) {
                daStr = '{a|' + da + '}{b|' + arr.pro + '%}{c|' + arr.value + '}'
              }
            })
            return daStr
          },
          textStyle: {
            rich: {
              a: {
                width: 70,
                color: '#4a4a4a',
                fontSize: 16
              },
              b: {
                width: 70,
                color: '#969696',
                fontSize: 16
              },
              c: {
                width: 50,
                color: '#4a4a4a',
                fontSize: 16
              }
            }
          }
        },
        series: [{
          radius: ['40%', '60%'],
          center: ['30%', '50%'],
          type: 'pie',
          data: this.opt
        }],
        color: ['#2E269D', '#4D80E3', '#46B4E6', '#EE8240', '#FBDC8A']
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
