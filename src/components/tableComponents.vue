<template>
  <div id="table-render">
    <el-table :data="tableData" highlight-current-row style="width: 100%" :header-cell-style="{backgroundColor:'#FBFBFB',color:'rgba(51,51,51,1)',fontSize:'16px',height:'53px'}">
      <el-table-column v-for="(item,index) in thData" :key="index" :label="item.name" :prop="item.indexs" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row[item.indexs] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage2"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
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
    }
  },
  data() {
    return {

    }
  },

  mounted() {
    console.log(this.tableData)
  }
}
</script>
<style>
.el-table__header-wrapper,
 .el-table__footer-wrapper{
  height:53px;
  background:rgba(251,251,251,1);
}
.el-table tbody tr{
  height: 58px;
  line-height:58px;
}
.el-pagination{
  text-align: center;
  margin-top:41px;
  line-height: 39px;
}
.el-input--mini .el-input__inner{
  width:100px;
  height:39px;
}
.el-pager,.btn-next,.btn-prev{
  vertical-align: sub!important;
}
.el-pager li {
  color:#606266;
  font-size:14px;
  margin-right: 43px;
}

</style>
