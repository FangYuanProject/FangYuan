<template>
  <div class="opinion-list">
    <h2 class="title">意见列表</h2>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :total="total"
      @pagination="changePage"
    />
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import SearchFormBtn from '@/components/SearchFormBtn'
import { feedbackList, feedbackDetail, emailFeedback, messageFeedBack } from '@/api/index'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn
  },
  data() {
    return {
      // tableOperation: [{ name: '短信回复' }, { name: '邮件回复' }],
      thData: [
        { name: '意见标题', indexs: 'title' },
        { name: '内容详情', indexs: 'content' },
        { name: '提交人', indexs: 'pone' },
        { name: '提交时间', indexs: 'publish' },
        { name: '操作', indexs: 'operation' }
      ],
      tableData: [],
      total: 0,
      params: {
        page: 1,
        pageSize: 20
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    submitForm(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //     } else {
      //     console.log('error submit!!')
      //       return false
      //     }
      // })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addDocument() {
      this.dialogVisible = true
    },
    getList() {
      feedbackList(this.params).then(res => {
        //         res.data.forEach(list => {
        // // list.operation =
        //         })
        this.tableData = res.data
        this.total = res.total
      })
    },
    changePage(pageData) {
      this.params = {
        page: pageData.page,
        pageSize: pageData.limit
      }
      this.getList()
    }
  }
}
</script>

<style lang='scss' scoped>
.title {
  height: 56px;
  padding: 26px 0 0 30px;
  font-size: 20px;
  line-height: 0;
  color: #202431;
  border-bottom: 1px solid #ebeef5;
}
</style>
