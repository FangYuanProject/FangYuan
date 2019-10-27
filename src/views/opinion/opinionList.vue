<template>
  <div class="opinion-list">
    <h2 class="title">意见列表</h2>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
      :dialog-type="changeRoleVisible"
    />
  </div>
</template>
<script>
import tableComponents from "@/components/tableComponents";
import AddMethodBtn from "@/components/AddMethodBtn";
import SearchFormBtn from "@/components/SearchFormBtn";
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn
  },
  data() {
    return {
      tableOperation: [{ name: "短信回复" }, { name: "邮件回复" }],
      thData: [
        { name: "意见标题", indexs: "id" },
        { name: "内容详情", indexs: "title" },
        { name: "提交人", indexs: "pone" },
        { name: "提交时间", indexs: "publish" }
      ],
      tableData: [
        {
          id: "0001",
          title: "新闻标题1",
          pone: "18825055554",
          publish: "2019-10-21 10:00"
        },
        {
          id: "0001",
          title: "新闻标题1",
          pone: "18825055554",

          publish: "2019-10-21 10:00"
        },
        {
          id: "0001",
          title: "新闻标题1",
          pone: "18825055554",

          publish: "2019-10-21 10:00"
        }
      ]
    };
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
      this.$refs[formName].resetFields();
    },
    addDocument() {
      this.dialogVisible = true;
    }
  }
};
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
