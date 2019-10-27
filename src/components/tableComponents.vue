<template>
  <div id="table-render">
    <el-table :data="tableData" highlight-current-row style="width: 100%;" :header-cell-style="{backgroundColor:'#FBFBFB',color:'rgba(51,51,51,1)',fontSize:'16px',height:'53px'}">
      <el-table-column v-for="(item,index) in thData" :key="index" :label="item.name" :prop="item.indexs" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row[item.indexs] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template>
          <el-button v-for="(item,index) in tableOperation" :key="index+1" type="primary" class="submit-data-btn" @click="clickEvent">{{ item.name }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="1000">
    </el-pagination> -->
  </div>
</template>
<script>
export default {
  name: 'TableComponents',
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    thData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableOperation: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      currentPage2: 1
    }
  },

  mounted() {
    console.log(this.tableOperation)
  },
  methods: {
    handleCurrentChange() {

    },
    handleSizeChange() {

    },
    clickEvent() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss">

#table-render {
  margin-top:40px;

  .el-table__header-wrapper,
  .el-table__footer-wrapper {
    height: 53px;
    background: rgba(251, 251, 251, 1);
  }

  .el-table tbody tr {
    height: 58px;
    line-height: 58px;
  }

  .el-pagination {
    position: absolute;
    left: 50%;
    width: 100%;
    margin-left: -50%;
    line-height: 39px;
    text-align: center;
  }

  .el-input--mini .el-input__inner {
    width: 100px;
    height: 39px;
  }

  .el-pager,
  .btn-next,
  .btn-prev {
    vertical-align: sub !important;
  }

  .el-pager li {
    margin-right: 43px;
    font-size: 14px;
    color: #606266;
  }

  .el-table .cell {
    font-size: 14px;
  }

  .el-button--primary {
    color: #0266d6;
    background-color: transparent;
    border-color: transparent;
    padding: 0;
  }
}

</style>
