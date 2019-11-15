<template>
  <div class="forum-list">
    <h2 class="title">论坛列表</h2>
    <el-form ref="ruleForm" :model="searchForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="帖子ID" prop="id">
        <el-input v-model="searchForm.id" />
      </el-form-item>
      <el-form-item label="帖子类型" prop="type">
        <el-select v-model="searchForm.type" placeholder="请选择">
          <el-option v-for="(item,index) in forumTypeOption" :key="item+index" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="帖子标题" prop="title">
        <el-input v-model="searchForm.title" />
      </el-form-item>
      <el-form-item label="创建人" prop="createName">
        <el-input v-model="searchForm.createName" />
      </el-form-item>
      <el-form-item label="上传时间" prop="createName">
        <el-date-picker
          v-model="searchForm.createName"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <StatusSelect v-model="searchForm.status" is-inline="inline" prop="status" @change="selectStatus" />
      <el-form-item>
        <search-form-btn />
        <add-method-btn name="帖子" @click="addForum" />
      </el-form-item>
    </el-form>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :total="total"
      @handleClick="chooseOperation"
      @cell-click="editForum"
    />
    <el-dialog :title="publishDialogTitle" width="508px" :visible.sync="publishDialogVisible" class="add-document-modal">
      <el-form ref="publishForm" :model="publishForm" :rules="publishFormRules">
        <el-form-item label="帖子类型" prop="type">
          <el-select v-model="publishForm.type" placeholder="请选择">
            <el-option v-for="(item,index) in forumTypeOption" :key="index+10" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="帖子标题" prop="title">
          <el-input v-model="publishForm.title" autocomplete="off" rows="5" />
        </el-form-item>
        <el-form-item label="帖子内容" prop="content">
          <el-input v-model="publishForm.content" type="textarea" autocomplete="off" rows="5" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="edit-data-btn" @click="submitForm('publishForm','save')">
          保存
        </el-button>
        <el-button type="primary" class="submit-data-btn" @click="submitForm('publishForm','publish')">
          <span class="iconfont iconfabu">&nbsp;发布</span>
        </el-button>
      </span>
    </el-dialog>
    <el-dialog title="下架帖子" :visible.sync="outSellDialogVisible" width="508px" class="out-sell-modal">
      <el-form ref="outSellForm" :model="outSellForm" :rules="outSellFormRules">
        <el-form-item label="帖子ID" prop="id">
          <el-input v-model="outSellForm.id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="帖子类型" prop="type">
          <el-select v-model="outSellForm.type" placeholder="请选择">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="帖子标题" prop="title">
          <el-input v-model="outSellForm.title" autocomplete="off" rows="5" />
        </el-form-item>
        <el-form-item label="下架原因" prop="reason">
          <el-input v-model="outSellForm.reason" type="textarea" rows="5" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div v-if="status==='checkReason'">
          <el-button @click="delForum('outSellForm')">删除</el-button>
          <el-button type="primary" class="submit-data-btn" @click="comfirmOutSell('outSellForm')">重新上架</el-button>
        </div>
        <div v-else>
          <el-button type="primary" class="submit-data-btn" @click="comfirmOutSell('outSellForm')">确认下架</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import SearchFormBtn from '@/components/SearchFormBtn'
import StatusSelect from '@/components/StatusOptions'
import { comfirmBox, AlertBox, dateTimeStr, vaildForm } from '@/utils/util'
import { addForum, delForum, forumDeatil, publishForum, replyForum, forumList, setTopForum, forumType, unsellForum } from '@/api/index'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn,
    StatusSelect
  },
  data() {
    return {
      outSellDialogVisible: false,
      publishDialogVisible: false,
      publishDialogTitle: '发布帖子',
      publishFormRules: {
        type: [{ required: true, message: '请输入帖子类型', trigger: 'change' }],
        title: [{ required: true, message: '请输入帖子标题', trigger: 'blur' }]
      },
      status: 'checkReason',
      searchForm: {
        id: '',
        type: '',
        status: '',
        uploadTime: '',
        title: '',
        page: 1,
        pageSize: 20
      },
      uploadTime: '', // 处理查询的时间插件
      publishForm: {
        title: '',
        type: '',
        content: '',
        id: ''
      },
      outSellForm: {
        id: '',
        type: '',
        title: '',
        reason: ''
      },
      outSellFormRules: {
        reason: [{ required: true, message: '请输入下架原因', trigger: 'blur' }]
      },
      thData: [
        { name: '帖子ID', indexs: 'id' },
        { name: '帖子类型', indexs: 'type' },
        { name: '帖子标题', indexs: 'title' },
        { name: '帖子链接', indexs: 'url' },
        { name: '创建人', indexs: 'createName' },
        { name: '创建时间', indexs: 'createTime' },
        { name: '状态', indexs: 'status' },
        { name: '操作', indexs: 'operation' }

      ],
      tableData: [],
      total: 0,
      forumTypeOption: []
    }
  },
  mounted() {
    this.getForumList()
    this.getForumType()
  },
  methods: {
    submitForm(formName, type) {
      vaildForm(this.$refs[formName]).then(res => {
        if (res) {
          if (type === 'save') {
            addForum(this.publishForm).then(res => {
              this.publishDialogVisible = false
              AlertBox('success', '保存成功')
              this.getForumList()
            })
          } else {
            publishForum(this.publishForm).then(res => {
              this.publishDialogVisible = false
              AlertBox('success', '保存成功')
              this.getForumList()
            })
          }
        }
      })
    },
    comfirmOutSell(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addForum() {
      this.publishDialogVisible = true
      this.publishDialogTitle = '发布帖子'
      this.status = 'add'
    },
    editForum() {},
    delForum() {
      const _this = this
      comfirmBox('warning', '是否确认删除该条数据', () => {
        AlertBox('success', '删除成功')
        _this.outSellDialogVisible = false
      }, () => {
        console.log('456')
      })
    },
    getForumList() {
      this.searchForm.uploadTime = this.uploadTime ? this.uploadTime[0] + '~' + this.uploadTime[1] : ''
      forumList(this.searchForm).then(res => {
        this.total = res.total
        res.data.forEach(list => {
          list.createTime = dateTimeStr(list.createTime)
          list.operation = [{ name: '置顶', clickEvent: 'setTop' }, { name: '取消置顶', clickEvent: 'cancelTop' }, { name: '下架', clickEvent: 'outSell' }, { name: '发布', clickEvent: 'publish' }, { name: '查看', clickEvent: 'check' }]
        })
        this.tableData = res.data
      })
    },
    selectStatus(val) {
      this.searchForm.status = val
    },
    getForumType() {
      forumType().then(res => {
        this.forumTypeOption = res.data
      })
    },
    chooseOperation(type, data) {
      if (type === 'setTop') {
        // setTopForum({})
      }
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

.add-new {
  width: 109px;
  height: 40px;
  margin-left: 123px;
  font-size: 14px;
  color: #fff;
  background: rgba(69, 90, 100, 1);
  border-color: rgba(69, 90, 100, 1);
  border-radius: 4px;
}

</style>

<style lang='scss'>
/* 修改elemnt-ui样式 */
.list-ruleForm .el-input--medium .el-input__inner {
  width: 170px;
  height: 40px;
}

.add-forum-modal {
  .el-form-item.el-form-item--medium {
    margin-right: 0;
    margin-bottom: 20px;
    margin-left: 30px;
  }

  .el-form-item--medium .el-form-item__label {
    width: 61px;
    font-size: 14px;
    color: #757575;
  }
}

.forum-list .el-table__body tr td:first-child,
.forum-list .el-table__body tr td:nth-child(3) {
  color: #0266d6;
}
</style>
