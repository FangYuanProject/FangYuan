<template>
  <div>
    <h2 class="title">用户分析</h2>
    <tableComponents :table-data="tableData" />
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
export default {
  components: {
    tableComponents
  },
  data() {
    return {
      tableData: [
        {
          label: '新闻标题ID',
          prop: '1'
        },
        {
          label: '标题',
          prop: '1'
        },
        {
          label: '类型',
          prop: '1'
        },
        {
          label: '新建时间',
          prop: '1'
        },
        {
          label: '发布时间',
          prop: '1'
        },
        {
          label: '下架时间',
          prop: '1'
        },
        {
          label: '状态',
          prop: '1'
        },
        {
          label: '操作',
          prop: '1'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
    .title{
        font-size: 20px;
        color:#202431;
        margin: 26px 0 69px 30px;
    }
</style>

