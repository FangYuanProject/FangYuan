<template>
  <div class="opinion-list">
    <h2 class="title">意见列表</h2>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :total="total"
      @handleClick="chooseOperation"
      @pagination="changePage"
    />
    <el-dialog :title="titleReply ? '短信回复' : '邮件回复'" :visible.sync="changeVisible" width="508px" class="change-user-role" :close-on-click-modal="false">
      <el-form v-if="titleReply" ref="formTextReply" :model="formText" :rules="ruleText">
        <el-form-item label="回复内容" prop="content">
          <el-input v-model="formText.content" type="textarea" placeholder="请输入" autocomplete="off" />
        </el-form-item>
      </el-form>
      <el-form v-else ref="formEmailReply" :model="formEmail" :rules="ruleEmail">
        <el-form-item label="回复内容" prop="replyContent">
          <el-input v-model="formEmail.replyContent" type="textarea" placeholder="请输入" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitReply">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import SearchFormBtn from '@/components/SearchFormBtn'
import { feedbackList, feedbackDetail, emailFeedback, messageFeedBack } from '@/api/index'
import { AlertBox, dateTimeStr } from '@/utils/util'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn
  },
  data() {
    return {
      thData: [
        { name: '意见标题', indexs: 'title' },
        { name: '内容详情', indexs: 'content' },
        { name: '提交人', indexs: 'userName' },
        { name: '提交时间', indexs: 'createTimeStr' },
        { name: '状态', indexs: 'statusStr' },
        { name: '操作', indexs: 'operation' }
      ],
      tableData: [],
      total: 0,
      params: {
        page: 1,
        pageSize: 20
      },
      changeVisible: false,
      titleReply: true, // true： 短信回复 false：邮件回复
      formText: {
        content: '',
        // phoneNumber: '',
        id: ''
      },
      formEmail: {
        id: '',
        replyContent: ''
      },
      ruleText: {
        content: [{ required: true, trigger: 'blur', message: '请输入回复内容' }]
        // phoneNumber: [{ required: true, trigger: 'blur', message: '请输入电话号码' }]
      },
      ruleEmail: {
        replyContent: [{ required: true, trigger: 'blur', message: '请输入回复内容' }]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addDocument() {
      this.dialogVisible = true
    },
    chooseOperation(type, data) {
      this[type](data)
    },
    textReply(data) {
      this.titleReply = true
      this.changeVisible = true
      this.$nextTick(() => {
        this.$refs['formTextReply'].resetFields()
        this.formText.id = data.id
      })
    },
    emailReply(data) {
      this.titleReply = false
      this.changeVisible = true
      this.$nextTick(() => {
        this.$refs['formEmailReply'].resetFields()
        this.formEmail.id = data.id
      })
    },
    submitReply() {
      const formType = this.titleReply ? 'formTextReply' : 'formEmailReply'
      this.$refs[formType].validate((valid) => {
        if (valid) {
          if (this.titleReply) { // 短信回复
            messageFeedBack(this.formText).then(res => {
              this.changeVisible = false
              AlertBox('success', '回复成功！')
              this.getList()
            })
          } else { // 邮箱回复
            emailFeedback(this.formEmail).then(res => {
              this.changeVisible = false
              AlertBox('success', '回复成功！')
              this.getList()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getList() {
      feedbackList(this.params).then(res => {
        res.data.forEach(list => {
          list.createTimeStr = dateTimeStr(list.createTime)
          list.statusStr = list.status.value
          if (list.status.value === '未回复') {
            list.operation = [
              { name: '短信回复', clickEvent: 'textReply' },
              { name: '邮件回复', clickEvent: 'emailReply' }
            ]
          } else {
            list.operation = []
          }
        })
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
