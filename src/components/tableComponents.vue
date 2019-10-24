<template>
  <div id="table-render">
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column v-for="(item,index) in thData" :key="index" :label="item.name" :prop="item.indexs">
        <!-- <template slot-scope="scope">
          {{ scope.row[0] }}
        </template> -->
        <template slot-scope="scope">
          <span>{{ scope.row[item.indexs] }}</span>
        </template>
      </el-table-column>
    </el-table>
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
