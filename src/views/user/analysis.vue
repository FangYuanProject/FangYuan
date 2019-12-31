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
        <ul class="time-btn">
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
    <bar-chart id="bar" ref="barCharts" width="100%" :opt="options" />
  </div>
</template>
<script>
import BarChart from '@/components/echarts/bar'
export default {
  components: {
    BarChart
  },
  data() {
    return {
      active: 1,
      acTime: 1,
      options: {},
      timeRange: ['2010-01-01', '2019-12-30'],
      valueFormat: 'yyyy-MM-dd',
      timeType: 'daterange',
      dataFade: 20
    }
  },
  created() {
    this.goGetBar()
  },
  methods: {
    chooseTab(ind) {
      this.active = ind
      if (this.active === 1) {
        this.dataFade *= 2
        this.goGetBar()
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
        this.dataFade = 30
        this.goGetBar()
      }
    },
    goGetBar() {
      // 优先时间判断
      this.options = {
        title: { show: false },
        grid: {
          left: 120,
          right: 80,
          bottom: 80
        },
        tooltip: {},
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
          name: '销量',
          type: 'bar',
          barWidth: '32',
          emphasis: {
            itemStyle: {
              color: '#445a64'
            }
          },
          data: [5, 20, 36, 10, 10, this.dataFade, 30, 50, 40, 22, 31]
        }],
        color: ['#dde8ed']
      }
      this.$nextTick(() => {
        this.$refs.barCharts.drawBar()
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
          padding: 0 36px;
          font-size: 16px;
          font-weight: bold;
          line-height: 75px;
          color: #455a64;
          list-style: none;
          cursor: pointer;

          &:hover,
          &.actived {
            color: #0266d6;
            border-bottom: 2px solid #0266d6;
          }
        }
      }

      .time-picker {
        float: right;
        width: 51%;

        .time-btn {
          display: inline-block;
          width: 300px;
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

