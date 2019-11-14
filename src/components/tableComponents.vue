<template>
  <div id="table-render">
    <el-table :data="tableData" highlight-current-row style="width: 100%;" :header-cell-style="{backgroundColor:'#FBFBFB',color:'rgba(51,51,51,1)',fontSize:'16px',height:'53px'}" :cell-style="cellStyle" @cell-click="handleCellClick">
      <el-table-column v-for="(item,index) in thData" :key="index" :label="item.name" :prop="item.indexs" align="center" :formatter="item.formatter">
        <template slot-scope="scope">
          <span>{{ scope.row[item.indexs] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
// import Pagination from '@/components/Pagination'
export default {
  name: 'TableComponents',
  // components: { Pagination },
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
    },
    operationType: {
      type: String,
      default: () => {

      }
    },
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'sizes, prev, pager, next'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    },
    updateTableData: {
      get() {
        return this.tableData
      }
    }
  },

  mounted() {
    // console.log(this.tableOperation)
    // this.formatterThead()
  },

  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      // if (this.autoScroll) {
      //   scrollTo(0, 800)
      // }
    },
    clickEvent(type, data) {
      this.$emit('click', type, data)
    },
    handleCellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    formatter(row) {
      console.log(row)
      console.log('row')
      return '123'
    },
    formatterThead(row, column) {
      console.log(row)
      console.log('456')
    },
    cellStyle(data) {
      if (data.columnIndex === 0) {
        return 'cursor:pointer;'
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss">

#table-render {
  margin-top: 40px;
  text-align: center;

  .el-table__header-wrapper,
  .el-table__footer-wrapper {
    height: 53px;
    background: rgba(251, 251, 251, 1);
  }

  .el-table tbody tr {
    height: 58px;
    line-height: 58px;
  }

  .el-input--mini .el-input__inner {
    width: 100px;
    height: 39px;
  }

  .el-table .cell {
    font-size: 14px;
  }

  .el-table__row td:last-child .cell {
    color: #0266d6;
    cursor: pointer;
  }

  .el-button--primary {
    padding: 0;
    color: #0266d6;
    background-color: transparent;
    border-color: transparent;
  }

  .el-pagination {
    margin-top: 30px;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    font-size: 14px;
    color: #0266d6;
    background-color: transparent !important;
  }

  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    font-size: 14px;
    font-weight: normal;
    color: #606266;
    background-color: transparent;
  }

  .el-pagination .el-select .el-input {
    width: 83px;
    height: 39px;
  }

  .el-pagination button,
  .el-pagination span:not([class*=suffix]) {
    vertical-align: baseline;
  }

  .el-pager {
    vertical-align: bottom;
  }
}

</style>
