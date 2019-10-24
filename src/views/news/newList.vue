<template>
  <div id="news">
    <h2 class="title">新闻列表</h2>
    <tableComponents :table-data="data" />
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
export default {
  name: 'News',
  components: {
    tableComponents
  },
  data() {
    return {
      data: [
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
    .title {
      margin: 26px 0 69px 30px;
      font-size: 20px;
      color: #202431;
    }
</style>

