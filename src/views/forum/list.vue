<template>
  <div class="forum-list">
    <h2 class="title">论坛列表</h2>
    <el-form ref="ruleForm" :model="searchForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="帖子ID" prop="id">
        <el-input v-model="searchForm.id" @input="change($event)" />
      </el-form-item>
      <el-form-item label="帖子类型" prop="type">
        <el-select v-model="searchForm.type" placeholder="请选择">
          <el-option v-for="(item,index) in forumTypeOption" :key="item+index" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="帖子标题" prop="title">
        <el-input v-model="searchForm.title" @input="change($event)" />
      </el-form-item>
      <el-form-item label="创建人" prop="createName">
        <el-input v-model="searchForm.createName" @input="change($event)" />
      </el-form-item>
      <el-form-item label="上传时间" prop="uploadTime">
        <el-date-picker
          v-model="uploadTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="帖子状态" prop="status">
        <el-select v-model="searchForm.status" placeholder="请选择">
          <el-option v-for="(item,index) in statusOptions" :key="item+index" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <search-form-btn @click="searchFormEvent" />
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <add-method-btn name="帖子" @click="addForum" />
      </el-form-item>
    </el-form>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :total="total"
      @handleClick="chooseOperation"
      @cell-click="editForum"
      @pagination="changePage"
    />
    <el-dialog :title="publishDialogTitle" width="508px" :visible.sync="publishDialogVisible" class="add-document-modal" :close-on-click-modal="false" @close="closeModal">
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
        <div v-if="btnStatus==='发布中'" style="display: inline-block;">
          <el-button type="primary" class="submit-data-btn" @click="cancelSetTop('publishForm',2005)">
            置顶
          </el-button>
          <el-button type="primary" class="submit-data-btn" @click="comfirmOutSell('publishForm')">确认下架</el-button>
        </div>
        <div v-else-if="btnStatus==='置顶'" style="display: inline-block;">
          <el-button type="primary" class="submit-data-btn" @click="cancelSetTop('publishForm',2002)">
            取消置顶
          </el-button>
        </div>
        <div v-else style="display: inline-block;">
          <el-button v-if="btnStatus===''" type="primary" class="submit-data-btn" @click="submitForm('publishForm','publish')">
            <span class="iconfont iconfabu">&nbsp;发布</span>
          </el-button>
        </div>

      </span>
    </el-dialog>
    <el-dialog :title="outSellDialogTitle" :visible.sync="outSellDialogVisible" width="508px" class="out-sell-modal" :close-on-click-modal="false" @close="closeModal">
      <el-form ref="outSellForm" :model="outSellForm" :rules="outSellFormRules">
        <el-form-item label="帖子ID" prop="id">
          <el-input v-model="outSellForm.id" autocomplete="off" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="帖子类型" prop="type">
          <el-select v-model="outSellForm.type" placeholder="请选择" :disabled="isDisabled">
            <el-option v-for="(item,index) in forumTypeOption" :key="index+10" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="帖子标题" prop="title">
          <el-input v-model="outSellForm.title" autocomplete="off" rows="5" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="下架原因" prop="reason">
          <el-input v-model="outSellForm.reason" type="textarea" rows="5" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div v-if="status==='checkReason'">
          <el-button @click="delForum('outSellForm')">删除</el-button>
          <el-button type="primary" class="submit-data-btn" @click="submitForm('outSellForm','comfirmPublish')">重新上架</el-button>
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
import { comfirmBox, AlertBox, dateTimeStr, vaildForm } from '@/utils/util'
import { addForum, delForum, forumDeatil, publishForum, forumList, setTopForum, forumType, unsellForum, forumStatus } from '@/api/index'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn
  },
  data() {
    return {
      outSellDialogVisible: false,
      outSellDialogTitle: '下架帖子',
      publishDialogVisible: false,
      publishDialogTitle: '发布帖子',
      publishFormRules: {
        type: [{ required: true, message: '请输入帖子类型', trigger: 'change' }],
        title: [{ required: true, message: '请输入帖子标题', trigger: 'blur' }]
      },
      status: 'checkReason', // 判断帖子是否已下架
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
        id: '1',
        type: '334',
        title: '333',
        reason: '3333'
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
      forumTypeOption: [],
      statusOptions: [],
      isDisabled: false,
      btnStatus: '' // 根据状态判断弹窗的操作按钮
    }
  },
  mounted() {
    this.getForumList()
    this.getForumType()
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    change(event) {
      this.$forceUpdate()
    },
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
            this.publishForum('', type)
          }
        }
      })
    },
    closeModal() {
      if (this.$refs['outSellForm']) {
        this.$refs['outSellForm'].resetFields()
      }
      if (this.$refs['publishForm']) {
        this.$refs['publishForm'].resetFields()
      }
    },
    publishForum(id, type) {
      // 根据弹窗类型判断是否发布
      const params = this.publishForm.type ? this.publishForm : { id: this.outSellForm.id || id }
      if (this.publishForm.type !== '') {
        vaildForm(this.$refs['publishForm']).then(res => {
          if (res) {
            publishForum(params).then(res => {
              this.publishDialogVisible = false
              AlertBox('success', '发布成功')
              this.getForumList()
            })
          }
        })
      } else {
        publishForum(params).then(res => {
          AlertBox('success', '发布成功')
          this.publishDialogVisible = false
          this.outSellDialogVisible = false
          this.getForumList()
        })
      }
      this.isDisabled = false
    },
    searchFormEvent() {
      this.getForumList()
    },
    changePage(pageData) {
      this.searchForm.page = pageData.page
      this.searchForm.pageSize = pageData.limit
      this.getForumList()
    },
    outSellForum(status) {
      vaildForm(this.$refs['outSellForm']).then(res => {
        if (res) {
          unsellForum(this.outSellForm).then(res => {
            AlertBox('success', '下架成功')
            this.getForumList()
          })
        }
      })
    },
    comfirmOutSell() {
      unsellForum({ id: this.outSellForm.id, reason: this.outSellForm.reason }).then(res => {
        AlertBox('success', '发布成功')
        this.outSellDialogVisible = false
        this.getForumList()
      })
    },
    addForum() {
      this.publishDialogVisible = true
      this.publishDialogTitle = '发布帖子'
      this.status = 'add'
      this.btnStatus = ''
      setTimeout(() => {
        this.resetForm('publishForm')
      }, 10)
    },
    editForum(row, colum) {
      this.forumId = row.id
      if (colum.label === '帖子ID') {
        this.publishDialogVisible = true
        this.publishDialogTitle = '编辑帖子'
        this.formumDetail(row.id, 'edit')
        this.btnStatus = row.status
      }
    },
    formumDetail(id, type) {
      forumDeatil({ id: id }).then(res => {
        if (type) {
          this.publishForm.title = res.data.title
          this.publishForm.type = res.data.type.key
          this.publishForm.content = res.data.content
          this.publishForm.id = res.data.id
        } else {
          this.outSellForm = {
            id: id,
            type: res.data.type.key,
            title: res.data.title,
            reason: res.data.reason
          }
        }
      })
    },
    delForum() {
      const _this = this
      comfirmBox('warning', '是否确认删除该条数据', () => {
        delForum({ id: _this.outSellForm.id }).then(res => {
          AlertBox('success', '删除成功')
          _this.outSellDialogVisible = false
          _this.getForumList()
        })
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
          list.operation = []
          switch (list.status.key) {
            case 2001:
              list.operation.push({ name: '发布', clickEvent: 'publish' })
              break
            case 2002:
              list.operation.push({ name: '下架', clickEvent: 'outSell' }, { name: '置顶', clickEvent: 'setTop' })
              break
            case 2003:
              list.operation.push({ name: '查看', clickEvent: 'check' })
              break
            case 2005:
              list.operation.push({ name: '取消置顶', clickEvent: 'cancelTop' })
          }
          list.status = list.status.value
          list.type = list.type.value
        })
        this.tableData = res.data
        // this.closeModal()
      })
    },
    selectStatus(val) {
      this.searchForm.status = val
    },
    getForumType() {
      forumType().then(res => {
        res.data.unshift({ value: '请选择', key: '' })
        this.forumTypeOption = res.data
      })
      forumStatus().then(res => {
        res.data.unshift({ value: '请选择', key: '' })
        this.statusOptions = res.data
      })
    },
    chooseOperation(type, data) {
      if (type === 'setTop' || type === 'cancelTop') {
        const operation = type === 'setTop' ? 2005 : 2002
        const text = type === 'setTop' ? '置顶' : '取消置顶'
        setTopForum({ id: data.id, operation: operation }).then(res => {
          AlertBox('success', text + '成功')
          this.getForumList()
        })
      } else if (type === 'outSell') {
        this.outSellDialogVisible = true
        this.outSellDialogTitle = '下架帖子'
        this.status = 'outsell'
        this.formumDetail(data.id)
        // this.outSellForum('outsell')
      } else if (type === 'publish') {
        this.publishForum(data.id, type)
      } else if (type === 'check') {
        this.outSellDialogVisible = true
        this.outSellDialogTitle = '查看帖子'
        this.status = 'checkReason'
        this.isDisabled = true
        this.formumDetail(data.id)
      }
    },
    cancelSetTop(formName, operation) {
      vaildForm(this.$refs[formName]).then((res) => {
        if (res) {
          setTopForum({ id: this.publishForm.id, operation: operation }).then(res => {
            AlertBox('success', '取消成功')
            this.getForumList()
          })
        }
      })
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

.forum-list .el-table__body tr td:first-child {
  color: #0266d6;
}
</style>
