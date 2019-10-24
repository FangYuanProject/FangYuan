<template>
  <div>
    <h2 class="title">用户列表</h2>
    <tableComponents :table-data="tableData" :th-data="thData" />
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
      thData: [
        { name: '新闻标题ID', indexs: 'id' },
        { name: '标题', indexs: 'title' },
        { name: '类型', indexs: 'type' },
        { name: '新建时间', indexs: 'createTime' },
        { name: '发布时间', indexs: 'publish' },
        { name: '下架时间', indexs: 'undercarriage' },
        { name: '状态', indexs: 'status' },
        { name: '操作', indexs: 'operate' }
      ],
      tableData: [
        {
          id: '新闻标题ID1',
          title: '新闻标题1',
          type: '类型1',
          createTime: '新建时间1',
          publish: '发布时间1',
          undercarriage: '下架时间1',
          status: '状态1',
          operate: '操作1'
        },
        {
          id: '新闻标题ID2',
          title: '新闻标题2',
          type: '类型2',
          createTime: '新建时间2',
          publish: '发布时间2',
          undercarriage: '下架时间2',
          status: '状态2',
          operate: '操作2'
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

