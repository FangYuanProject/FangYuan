<template>
  <div class="user-analysis">
    <h2 class="title">用户分析</h2>
    <div class="nav">
      <ul class="tabs">
        <li :class="{'active': active===1}" @click="chooseTab(1)">用户注册数</li>
        <li :class="{'active': active===2}" @click="chooseTab(2)">用户登录地区分布</li>
        <li :class="{'active': active===3}" @click="chooseTab(3)">用户活跃度</li>
      </ul>
      <div class="time-picker">
        <ul class="time-btn">
          <li :class="{'active':acTime===1}" @click="chooseTime(1,'daterange','yyyy-MM-dd')">日</li>
          <li :class="{'active':acTime===2}" @click="chooseTime(2,'weekrange','yyyy 第WW周')">周</li>
          <li :class="{'active':acTime===3}" @click="chooseTime(3,'monthrange','yyyy-MM')">月</li>
          <li :class="{'active':acTime===4}" @click="chooseTime(4,'yearrange','yyyy')">年</li>
        </ul>
        <el-date-picker
          v-model="timeRange"
          :type="timeType"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :value-format="valueFormat"
        />
      </div>
    </div>
    <bar-chart id="bar" width="100%" :option="option" />
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
      option: {},
      timeRange: ['2010-01-01', '2019-12-30'],
      valueFormat: 'yyyy-MM-dd',
      timeType: 'daterange'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    chooseTab(index) {
      this.active = index
    },
    chooseTime(index, type, format) {
      this.acTime = index
      this.timeType = type
      this.valueFormat = format
      if (index === 1) {
        this.timeRange = ['2010-01-01', '2019-12-30']
      } else if (index === 2) {
        this.timeRange = ['2010 第01周', '2019 第40周']
      } else if (index === 3) {
        this.timeRange = ['2010-01', '2019-12']
      } else {
        this.timeRange = ['2010', '2019']
      }
    },
    getData() {
      this.option = {
        tooltip: { show: false }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
      height: 75px;
      padding: 0;
      margin: 0 30px;
      overflow: hidden;
      border-bottom: 1px solid #ebeef5;

      .tabs {
        float: left;
        width: 45%;

        li {
          display: inline-block;
          padding: 0 36px;
          font-size: 16px;
          font-weight: bold;
          line-height: 75px;
          color: #455a64;
          list-style: none;
          cursor: pointer;

          &:hover,
          &.active {
            color: #0266d6;
            border-bottom: 2px solid #0266d6;
          }
        }
      }

      .time-picker {
        float: right;
        width: 45%;

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
      }
    }
  }
</style>

