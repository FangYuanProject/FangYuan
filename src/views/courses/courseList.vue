<template>
  <div class="course-list">
    <h2 class="title">课程列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="70px" inline class="new-list-ruleForm">
      <el-form-item label="课程ID" prop="goodsId">
        <el-input v-model="ruleForm.goodsId" />
      </el-form-item>
      <el-form-item label="课程名称" prop="goodsName">
        <el-input v-model="ruleForm.goodsName" />
      </el-form-item>
      <el-form-item label="课程类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择">
          <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <StatusSelect v-model="ruleForm.status" is-inline="inline" prop="status" @change="selectStatus" />
      <el-form-item>
        <search-form-btn @click="searchGoodsList" />
        <add-method-btn name="课程" @click="AddCourse" />
      </el-form-item>
    </el-form>
    <tableComponents :table-data="tableData" :th-data="thData" :total="total" @cell-click="editGoods" @pagination="changePage" />
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="508px" class="add-course-modal">
      <el-form ref="courseModal" :model="editForm" :rules="validForm">
        <el-form-item label="课程类型" prop="type">
          <el-select v-model="editForm.type" placeholder="请选择">
            <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称" prop="goodsName">
          <el-input v-model="editForm.goodsName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="课程内容" class="active-origin" prop="content">
          <el-input v-model="editForm.content" autocomplete="off" />

        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="editForm.price" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="淘宝链接" prop="taobaoUrl">
          <el-input v-model="editForm.taobaoUrl" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div v-if="dialogTitle==='新增商品'">
          <el-button type="primary" class="edit-data-btn" @click="submitCourseData('courseModal')">
            保存
          </el-button>
          <el-button type="primary" class="submit-data-btn" @click="publishGoods()">
            <span class="iconfont iconfabu">&nbsp;发布</span>
          </el-button>
        </div>
        <div v-else>
          <el-button class="del-document" @click="delDocument('courseModal')">
            删除
          </el-button>
          <el-button type="primary" class="edit-data-btn" @click="submitCourseData('courseModal')">
            更新
          </el-button>
          <el-button type="primary" class="submit-data-btn" @click="unsellGoods()">
            <span class="iconfont iconxiajia">&nbsp;下架</span>
          </el-button>

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
import { AlertBox, dateTimeStr, vaildForm } from '@/utils/util'
import { addGoods, delGoods, editGoods, goodseList, publishGoods, unshelveGoods, goodsDetail, goodsType } from '@/api/index'
import { validURL } from '@/utils/validate'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn,
    StatusSelect
  },
  data() {
    const vaildUrl = (rule, value, callback) => {
      if (validURL(value)) {
        callback()
      } else {
        callback(new Error('请输入正确格式的链接'))
        return
      }
    }
    return {
      tableOperation: [{ name: '发布' }, { name: '下架' }],
      dialogVisible: false, // 弹窗判断显示
      dialogTitle: '新增商品', // 弹窗标题
      // 查询表单
      ruleForm: {
        goodsId: '',
        goodsName: '',
        startUpload: '',
        status: '',
        type: '',
        page: 1,
        pageSize: 20
      },
      editForm: {
        content: '',
        goodsName: '',
        price: 0,
        taobaoUrl: '',
        type: '',
        goodsId: ''
      },
      validForm: {
        goodsName: [{ required: true, message: '请输入商品名称', trigger: 'blur', max: 32 }],
        price: [{ required: true, message: '请输入正确格式的商品价格', trigger: 'blur' }],
        taobaoUrl: [{ required: true, validator: vaildUrl, trigger: 'blur' }],
        type: [{ required: true, message: '请选择课程类型', trigger: 'change' }]
      },
      thData: [
        { name: '课程ID', indexs: 'id' },
        { name: '课程名称', indexs: 'goodsName' },
        { name: '课程类型', indexs: 'type' },
        { name: '状态', indexs: 'status' },
        { name: '创建时间', indexs: 'createTime' },
        { name: '操作', indexs: 'operation' }
      ],
      tableData: [],
      total: 0, // 列表总数
      goodsId: '',
      typeOptions: [] // 课程类型
    }
  },
  mounted() {
    this.getCourseList()
    this.getCourseType()
  },
  methods: {
    searchGoodsList() {
      this.getCourseList()
    },
    AddCourse() {
      this.dialogVisible = true
    },
    // 课程列表
    getCourseList() {
      goodseList(this.ruleForm).then(res => {
        this.total = res.total
        res.data.forEach(list => {
          list.createTime = dateTimeStr(list.createTime)
          list.operation = (list.status === '2002' || list.status === '2001') ? '下架' : (list.status === '2003' || list.status === '2004' ? '发布' : '')
        })
        this.tableData = res.data
      })
    },
    submitCourseData(formName) {
      this.$refs[formName].validate((vaild) => {
        if (vaild) {
          addGoods(this.editForm).then(res => {
            this.dialogVisible = false
            this.getCourseList()
          })
        }
      })
    },
    // 发布商品
    publishGoods(id) {
      id = id || this.goodsId
      const params = id || this.editForm
      // this.$refs['courseModal'].validate((vaild) => {
      //   if (vaild) {
      //     publishGoods(params).then(res => {
      //       AlertBox('success', '发布成功')
      //       this.getCourseList()
      //     })
      //   }
      // })
      vaildForm(this.$refs['courseModal'], this.getCourseList())
    },
    // 下架商品
    unsellGoods(id) {
      id = id || this.goodsId
      unshelveGoods({ goodsId: id }).then(res => {
        AlertBox('success', '下架成功')
        this.getCourseList()
      })
    },
    // 分页操作
    changePage(pageData) {
      this.ruleForm.page = pageData.page
      this.ruleForm.pageSize = pageData.limit
      this.getCourseList()
    },
    editGoods(row, colum) {
      if (colum.label === '课程ID') {
        this.dialogVisible = true
        this.dialogTitle = '编辑商品'
        this.goodsId = row.id
        goodsDetail({ goodsId: row.id }).then(res => {
          this.editForm = {
            content: res.data.content,
            goodsName: res.data.goodsName,
            price: res.data.price,
            taobaoUrl: res.data.taobaoUrl,
            type: res.data.type,
            goodsId: res.data.id
          }
        })
      } else if (colum.label === '操作') {
        if (row.operation === '下架') {
          this.unsellGoods(row.id)
        } else {
          this.publishGoods(row.id)
        }
      }
    },
    delDocument() {
      delGoods({ goodsId: this.goodsId }).then(res => {
        this.dialogVisible = false
        AlertBox('success', '删除成功')
        this.getCourseList()
      })
    },
    getCourseType() {
      goodsType().then(res => {
        this.typeOptions = res.data
      })
    },
    selectStatus(value) {
      this.ruleForm.status = value
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

.submit-data-btn {
  width: 86px;
  height: 40px;
  font-size: 14px;
  color: #fff;
  background: rgba(69, 90, 100, 1);
  border-color: rgba(69, 90, 100, 1);
  border-radius: 4px;
}

</style>

<style lang='scss'>
/* 修改elemnt-ui样式 */
.new-list-ruleForm .el-input--medium .el-input__inner {
  width: 170px;
  height: 40px;
}

.add-course-modal .el-form-item__content:not(:first-child) {
  height: 40px;
}

.add-course-modal .el-form-item__label {
  width: 85px;
  font-size: 14px;
  color: #757575;
  text-align: right;
}

.add-course-modal .el-input {
  width: 80%;
}

.add-course-modal .el-form-item.el-form-item--medium {
  margin-right: 0;
  margin-bottom: 20px;
  margin-left: 30px;
}

.add-course-modal .course-price .el-input {
  width: 377px;
}

.add-course-modal .el-dialog__header {
  height: 56px;
  border-bottom: 1px solid #ebeef5;
}

.add-course-modal .el-dialog__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  color: rgba(32, 36, 49, 1);
}

.add-course-modal .el-dialog__footer {
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-top: 1px solid #ebeef5;
}

.add-course-modal .el-form-item--medium .el-form-item__label {
  width: 61px;
  font-size: 14px;
  color: #757575;
}

.course-list .el-table__body tr td:first-child {
  color: #0266d6;
}

</style>
