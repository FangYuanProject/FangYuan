<template>
  <div class="user-analysis">
    <h2 class="title">用户分析</h2>
    <div class="nav">
      <ul class="tabs">
        <li :class="{'actived': active===1}" @click="chooseTab(1)">用户注册数</li>
        <li :class="{'actived': active===2}" @click="chooseTab(2)">用户登录地区分布</li>
        <li :class="{'actived': active===3}" @click="chooseTab(3)">用户活跃度</li>
      </ul>
      <div class="time-picker">
        <ul v-if="false" class="time-btn">
          <li :class="{'active':acTime===1}" @click="chooseTime(1,'daterange','yyyy-MM-dd')">日</li>
          <li :class="{'active':acTime===2}" @click="chooseTime(2,'week','yyyy第WW周')">周</li>
          <li :class="{'active':acTime===3}" @click="chooseTime(3,'monthrange','yyyy-MM')">月</li>
          <li :class="{'active':acTime===4}" @click="chooseTime(4,'year','yyyy')">年</li>
        </ul>
        <el-date-picker
          v-show="acTime===1||acTime===3"
          v-model="timeRange"
          :type="timeType"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :value-format="valueFormat"
        />
        <el-date-picker
          v-show="acTime===2||acTime===4"
          v-model="timeRange[0]"
          class="w100"
          :type="timeType"
          start-placeholder="开始日期"
          :format="valueFormat"
        />
        <span v-show="acTime===2||acTime===4">-</span>
        <el-date-picker
          v-show="acTime===2||acTime===4"
          v-model="timeRange[1]"
          class="w100"
          :type="timeType"
          end-placeholder="结束日期"
          :format="valueFormat"
        />
        <el-button class="btn btn-submit" @click="goSearch">确定</el-button>
        <el-button class="btn btn-clear" @click="goClear">清空</el-button>
      </div>
    </div>
    <div>
      <bar-chart v-show="active===1" id="bar" ref="barCharts" width="100%" :opt="options" />
      <line-chart v-show="active===3" id="line" ref="lineCharts" width="100%" :opt="optLine" />
      <map-chart v-show="active===2" id="map" ref="mapCharts" width="100%" :opt="optMap" />
    </div>
    <ul class="pies">
      <li>
        <h6>用户跨考比例</h6>
        <pie-chart id="pie-cross" ref="pieCross" width="100%" height="300px" :opt="optCross" />
      </li>
      <li>
        <h6>用户年级分布</h6>
        <pie-chart id="pie-grade" ref="pieGrade" width="100%" height="300px" :opt="optGrade" />
      </li>
      <li>
        <h6>用户本科院校分布</h6>
        <pie-chart id="pie-school" ref="pieSchool" width="100%" height="300px" :opt="optSchool" />
      </li>
    </ul>
  </div>
</template>
<script>
import { analysisRegister, analysisLocation, analysisActive, analysisCross, analysisGrade, analysisSchool } from '@/api/secIndex'
import BarChart from '@/components/echarts/bar'
import LineChart from '@/components/echarts/line'
import PieChart from '@/components/echarts/pie'
import MapChart from '@/components/echarts/map'
import { timeStr } from '@/utils/util'
export default {
  components: {
    BarChart,
    LineChart,
    PieChart,
    MapChart
  },
  data() {
    return {
      active: 1,
      acTime: 1,
      options: {},
      optLine: {},
      optMap: {},
      timeRange: ['2010-01-01', '2019-12-30'],
      valueFormat: 'yyyy-MM-dd',
      timeType: 'daterange',
      optCross: [],
      optGrade: [],
      optSchool: []
    }
  },
  created() {
    this.goGetBar()
    this.getCross()
    this.getGrade()
    this.getSchool()
  },
  methods: {
    chooseTab(ind) {
      this.active = ind
      if (this.active === 1) {
        this.goGetBar()
      } else if (this.active === 3) {
        this.goGetLine()
      } else {
        this.goGetMap()
      }
    },
    chooseTime(index, type, format) {
      this.acTime = index
      this.timeType = type
      this.valueFormat = format
      let date = ['', '']
      if (index === 1) {
        date = ['2010-01-01', '2019-12-31']
      } else if (index === 2) {
        date = ['2010-01-08', '2019-01-08']
      } else if (index === 3) {
        date = ['2010-01', '2019-12']
      } else {
        date = ['2010', '2019']
      }
      this.timeRange = [new Date(date[0]), new Date(date[1])]
    },
    goSearch() {
      if (this.active === 1) {
        this.goGetBar()
      } else if (this.active === 3) {
        this.goGetLine()
      } else {
        this.goGetMap()
      }
    },
    goGetMap() {
      const data1 = {
        searchTime: timeStr(this.timeRange[0] || new Date('2000-01-01')) + '~' + timeStr(this.timeRange[1] || new Date())
      }
      this.$nextTick(() => {
        this.$refs.mapCharts.myChart.showLoading({
          text: '加载中...',
          color: '#97a8be'
        })
      })
      analysisLocation(data1).then(res => {
        const province = res.data
        const data = []
        for (const key in province) {
          data.push({
            // value: province[key],
            value: parseInt(Math.random() * 100),
            name: key
          })
        }
        data.sort(function(o1, o2) {
          if (isNaN(o1.value) || o1.value == null) return -1
          if (isNaN(o2.value) || o2.value == null) return 1
          return o1.value - o2.value
        })
        const yData = []
        for (var i = 0; i < data.length; i++) {
          yData.push(data[i].name)
        }
        this.optMap = {
          title: { show: false },
          tooltip: {
            show: true,
            formatter: function(params) {
              return params.name + '：' + params.data['value']
            }
          },
          visualMap: {
            type: 'continuous',
            text: ['', ''],
            calculable: true,
            showLabel: true,
            seriesIndex: [0],
            min: 0,
            max: data[data.length - 1].value,
            inRange: {
              color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096']
            },
            textStyle: {
              color: '#000'
            },
            bottom: 20,
            left: 80
          },
          grid: {
            right: 80,
            left: '60%',
            top: 40,
            bottom: 10
          },
          xAxis: {
            type: 'value',
            position: 'top',
            splitNumber: 3,
            minInterval: 1,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 2,
              textStyle: {
                color: '#aaa'
              }
            }
          },
          yAxis: {
            type: 'category',
            nameGap: 14,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            },
            data: yData
          },
          geo: {
            roam: true,
            map: 'china',
            left: 180,
            layoutSize: '40%',
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                areaColor: '#fff464'
              }
            },
            regions: [{
              name: '南海诸岛',
              value: 0,
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false
                  }
                }
              }
            }]
          },
          dataZoom: [{
            type: 'slider',
            id: 'dataZoomX',
            show: true,
            width: 20,
            yAxisIndex: 0,
            orient: 'vertical',
            left: '53%',
            top: 'middle',
            start: 40,
            end: 100,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '70%',
            handleStyle: {
              color: '#455a64'
            },
            textStyle: {
              color: '#455a64'
            },
            fillerColor: '#dde8ed',
            backgroundColor: '#f9f9f9',
            borderColor: '#90979c'
          }],
          series: [
            {
              name: 'mapSer',
              type: 'map',
              roam: false,
              geoIndex: 0,
              label: {
                show: false
              },
              data: data
            },
            {
              name: 'barSer',
              type: 'bar',
              roam: false,
              visualMap: false,
              zlevel: 2,
              barMaxWidth: 20,
              itemStyle: {
                normal: {
                  color: '#40a9ed'
                },
                emphasis: {
                  color: '#3596c0'
                }
              },
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  offset: [0, 10]
                },
                emphasis: {
                  show: true,
                  position: 'right',
                  offset: [10, 0]
                }
              },
              data: data
            }
          ]
        }
        this.$nextTick(() => {
          this.$refs.mapCharts.drawChart()
        })
      })
    },
    goGetBar() {
      const data = {
        searchTime: timeStr(this.timeRange[0] || new Date('2000-01-01')) + '~' + timeStr(this.timeRange[1] || new Date())
      }
      this.$nextTick(() => {
        this.$refs.barCharts.myChart.showLoading({
          text: '加载中...',
          color: '#97a8be'
        })
      })
      analysisRegister(data).then(res => {
        const data = res.data
        this.options = {
          title: { show: false },
          grid: {
            left: 120,
            right: 80,
            bottom: 80
          },
          tooltip: {},
          xAxis: {
            data: (() => {
              const arr = []
              for (const key in data) {
                arr.push(key)
              }
              return arr
            })(),
            axisLine: {
              lineStyle: {
                color: '#e6e6e6'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: '10px',
              color: '#9b9b9b',
              padding: [10, 0]
            }
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: '10px',
              color: '#9b9b9b',
              padding: [0, 20]
            },
            splitLine: {
              lineStyle: {
                color: '#e6e6e6'
              }
            }
          },
          dataZoom: [{
            type: 'slider',
            id: 'dataZoomX',
            show: true,
            height: 30,
            xAxisIndex: 0,
            orient: 'horizontal',
            bottom: 0,
            start: 10,
            end: 90,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#455a64'
            },
            textStyle: {
              color: '#455a64'
            },
            fillerColor: '#dde8ed',
            backgroundColor: '#f9f9f9',
            borderColor: '#90979c'
          }],
          series: [{
            name: '用户注册数',
            type: 'bar',
            barWidth: '32',
            emphasis: {
              itemStyle: {
                color: '#445a64'
              }
            },
            data: (() => {
              const arr = []
              for (const key in data) {
                arr.push(data[key])
              }
              return arr
            })()
          }],
          color: ['#dde8ed']
        }
        this.$nextTick(() => {
          this.$refs.barCharts.drawChart()
        })
      })
    },
    goGetLine() {
      const data = {
        searchTime: timeStr(this.timeRange[0] || new Date('2000-01-01')) + '~' + timeStr(this.timeRange[1] || new Date())
      }
      this.$nextTick(() => {
        this.$refs.lineCharts.myChart.showLoading({
          text: '加载中...',
          color: '#97a8be'
        })
      })
      analysisActive(data).then(res => {
        // const userData = res.data
        this.optLine = {
          title: { show: false },
          grid: {
            left: 120,
            right: 80,
            bottom: 80
          },
          legend: {
            top: 20,
            right: 80,
            icon: 'circle',
            itemWidth: 7,
            itemHeight: 7,
            data: ['用户PV', '用户UV']
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
            axisLine: {
              lineStyle: {
                color: '#e6e6e6'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: '10px',
              color: '#9b9b9b',
              padding: [10, 0]
            }
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: '10px',
              color: '#9b9b9b',
              padding: [0, 20]
            },
            splitLine: {
              lineStyle: {
                color: '#e6e6e6'
              }
            }
          },
          dataZoom: [{
            type: 'slider',
            id: 'dataZoomX',
            show: true,
            height: 30,
            xAxisIndex: 0,
            orient: 'horizontal',
            bottom: 0,
            start: 10,
            end: 90,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#455a64'
            },
            textStyle: {
              color: '#455a64'
            },
            fillerColor: '#dde8ed',
            backgroundColor: '#f9f9f9',
            borderColor: '#90979c'
          }],
          series: [{
            name: '用户PV',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20, 30, 50, 40, 22, 31]
          },
          {
            name: '用户UV',
            type: 'line',
            data: [15, 2, 6, 1, 1, 2, 33, 10, 46, 2, 33]
          }],
          color: ['#108ee9', '#2fc25b']
        }
        this.$nextTick(() => {
          this.$refs.lineCharts.drawChart()
        })
      })
    },
    getCross() {
      this.$nextTick(() => {
        this.$refs.pieCross.myChart.showLoading({
          text: '加载中...',
          color: '#97a8be'
        })
      })
      analysisCross().then(res => {
        const data = res.data
        this.optCross = []
        data.forEach(da => {
          this.optCross.push({
            value: da.number,
            name: da.crossProfession,
            pro: da.proportion
          })
        })
        this.$nextTick(() => {
          this.$refs.pieCross.drawChart()
        })
      })
    },
    getGrade() {
      this.$nextTick(() => {
        this.$refs.pieGrade.myChart.showLoading({
          text: '加载中...',
          color: '#97a8be'
        })
      })
      analysisGrade().then(res => {
        const data = res.data
        this.optGrade = []
        data.forEach(da => {
          this.optGrade.push({
            value: da.number,
            name: da.grade,
            pro: da.proportion
          })
        })
        this.$nextTick(() => {
          this.$refs.pieGrade.drawChart()
        })
      })
    },
    getSchool() {
      this.$nextTick(() => {
        this.$refs.pieSchool.myChart.showLoading({
          text: '加载中...',
          color: '#97a8be'
        })
      })
      analysisSchool().then(res => {
        const data = res.data
        this.optSchool = []
        data.forEach(da => {
          this.optSchool.push({
            value: da.number,
            name: da.property,
            pro: da.proportion
          })
        })
        this.$nextTick(() => {
          this.$refs.pieSchool.drawChart()
        })
      })
    },
    goClear() {
      this.timeRange = ['', '']
    }
  }
}
</script>

<style lang="scss" scoped>
  .w100 {
    width: 140px;
  }

  .user-analysis {
    .title {
      height: 84px;
      padding: 0 30px;
      margin: 0;
      font-size: 20px;
      line-height: 84px;
      color: #202431;
      border-bottom: 1px solid #ebeef5;
    }

    .pies {
      padding: 20px 0;
      margin: 20px 30px;
      border-top: 1px solid #ebeef5;

      & > li {
        display: inline-block;
        width: 33%;
        list-style: none;

        &:nth-child(2) {
          border-right: 1px solid #ebeef5;
          border-left: 1px solid #ebeef5;
        }

        h6 {
          padding-left: 30px;
          margin: 0;
          font-size: 16px;
          font-weight: bold;
          color: #455a64;
        }
      }
    }

    .nav {
      height: 76px;
      padding: 0;
      margin: 0 30px;
      border-bottom: 1px solid #ebeef5;

      .tabs {
        float: left;
        width: 35%;

        li {
          display: inline-block;
          float: left;
          padding: 0 5px;
          overflow: hidden;
          font-size: 16px;
          font-weight: bold;
          line-height: 75px;
          color: #455a64;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
          list-style: none;
          cursor: pointer;

          &:first-child,
          &:nth-child(3) {
            width: 30%;
          }

          &:nth-child(2) {
            width: 38%;
          }

          &:hover,
          &.actived {
            color: #0266d6;
            border-bottom: 2px solid #0266d6;
          }
        }
      }

      .time-picker {
        float: right;
        width: 60%;
        line-height: 75px;
        text-align: right;

        .time-btn {
          display: inline-block;
          width: 275px;
          line-height: 75px;

          li {
            display: inline-block;
            width: 55px;
            height: 33px;
            margin-right: 10px;
            font-size: 14px;
            line-height: 33px;
            color: #455a64;
            text-align: center;
            vertical-align: middle;
            list-style: none;
            cursor: pointer;
            border: 1px solid #fff;

            &:hover,
            &.active {
              border: 1px solid #455a64;
              border-radius: 17px;
            }
          }
        }

        .btn {
          width: 55px;
          height: 33px;
          padding: 0;
          font-weight: bold;
          line-height: 31px;
          text-align: center;
          border: 1px solid #455a64;
          border-radius: 17px;
        }

        .btn-submit {
          margin-left: 20px;
          color: #fff;
          background-color: #455a64;
        }

        .btn-clear {
          color: #455a64;

          &:active {
            background-color: #fff;
          }
        }
      }
    }
  }
</style>

