<template>
  <div id="table-render">
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column v-for="(item,index) in tableData" :key="index" :label="item.label" :prop="item.prop">
        <!-- <template slot-scope="scope">
          {{ scope.row[0] }}
        </template> -->
        <template slot-scope="scope">
          <span>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'TableComponents',
  props: ['tableData'],
  data() {
    return {

    }
  },

  mounted() {
    console.log(this.tableData)
  }
}
</script>
