<template>
  <div class="course-list">
    <h2 class="title">商品列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="70px" inline class="new-list-ruleForm">
      <el-form-item label="商品ID" prop="goodsId">
        <el-input v-model="ruleForm.goodsId" />
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="ruleForm.goodsName" />
      </el-form-item>
      <el-form-item label="商品类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择">
          <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择">
          <el-option v-for="(item,index) in statusOptions" :key="index+item" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="上传时间" prop="uploadTime" label-width="70px">
        <el-date-picker
          v-model="uploadTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <search-form-btn @click="searchGoodsList" />
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <add-method-btn name="商品" @click="AddCourse" />
      </el-form-item>
    </el-form>
    <tableComponents :table-data="tableData" :th-data="thData" :total="total" @cell-click="editGoods" @pagination="changePage" @handleClick="chooseOperation" />
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="508px" class="add-course-modal" :close-on-click-modal="false">
      <el-form ref="courseModal" :model="editForm" :rules="validForms">
        <el-form-item label="商品类型" prop="type">
          <el-select v-model="editForm.type" placeholder="请选择">
            <el-option v-for="(item,index) in typeOptions" :key="index" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="editForm.goodsName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="商品内容" class="active-origin" prop="content">
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
        <div v-if="status==='已下架'">
            <el-button class="del-document" @click="delDocument('courseModal')">
            删除
            </el-button>
           <el-button type="primary" class="submit-data-btn" @click="publishGoods()">
            <span class="iconfont iconfabu">&nbsp;发布</span>
          </el-button>
        </div>
        <div v-else-if="status==='发布中'">
          <el-button type="primary" class="edit-data-btn" @click="submitCourseData('courseModal')">
            保存
          </el-button>
          <el-button type="primary" class="submit-data-btn" @click="unsellGoods()">
            <span class="iconfont iconxiajia">&nbsp;下架</span>
          </el-button>
        </div>
        <div v-else>
          <el-button type="primary" class="edit-data-btn" @click="submitCourseData('courseModal')">
            保存
          </el-button>
          <el-button type="primary" class="submit-data-btn" @click="publishGoods()">
            <span class="iconfont iconfabu">&nbsp;发布</span>
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
import { AlertBox, dateTimeStr, vaildForm } from '@/utils/util'
import { addGoods, delGoods, editGoods, goodseList, publishGoods, unshelveGoods, goodsDetail, goodsType, goodsStatus } from '@/api/index'
import { validURL } from '@/utils/validate'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn
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
      dialogVisible: false, // 弹窗判断显示
      dialogTitle: '新增商品', // 弹窗标题
      // 查询表单
      ruleForm: {
        goodsId: '',
        goodsName: '',
        status: '',
        type: '',
        uploadTime: '',
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
      validForms: {
        goodsName: [{ required: true, message: '请输入商品名称', trigger: 'blur', max: 32 }],
        price: [{ required: true, message: '请输入正确格式的商品价格', trigger: 'blur' }],
        taobaoUrl: [{ required: true, validator: vaildUrl, trigger: 'blur' }],
        type: [{ required: true, message: '请选择课程类型', trigger: 'change' }]
      },
      thData: [
        { name: '商品ID', indexs: 'id' },
        { name: '商品名称', indexs: 'goodsName' },
        { name: '商品类型', indexs: 'type' },
        { name: '状态', indexs: 'status' },
        { name: '创建时间', indexs: 'createTime' },
        { name: '操作', indexs: 'operation' }
      ],
      uploadTime: '',
      tableData: [],
      total: 0, // 列表总数
      goodsId: '',
      typeOptions: [], // 课程类型
      statusOptions: [],
      status:''//判断编辑弹窗操作按钮
    }
  },
  mounted() {
    this.getCourseList()
    this.getCourseOptions()
  },
  methods: {
    searchGoodsList() {
      this.getCourseList()
    },
    AddCourse() {
      this.dialogVisible = true
      this.$refs['courseModal'].resetFields()
    },
    // 课程列表
    getCourseList() {
      this.ruleForm.uploadTime = this.uploadTime ? (this.uploadTime[0] + '~' + this.uploadTime[1]) : ''
      goodseList(this.ruleForm).then(res => {
        this.total = res.total
        res.data.forEach(list => {
          list.createTime = dateTimeStr(list.createTime)
          list.type = list.type.value
          list.operation = []
          switch (list.status.key){
            case 2001:
            case 2003:
            list.operation.push({ name: '发布', clickEvent: 'publish' })
            break;
            case 2002:
            list.operation.push({ name: '下架', clickEvent: 'outSell' })
            break
          }
          list.status = list.status.value
        })
        this.tableData = res.data
      })
    },
    submitCourseData(formName) {
      this.$refs[formName].validate((vaild) => {
        if (vaild) {
          if (this.goodsId) {
            editGoods(this.editForm).then(res => {
              this.dialogVisible = false
              this.getCourseList()
            })
          } else {
            addGoods(this.editForm).then(res => {
              this.dialogVisible = false
              this.getCourseList()
            })
          }
        }
      })
    },
    // 发布商品
    publishGoods(id) {
      id = id || this.goodsId
      console.log(id)
      // 根据是否在弹窗中发布设置参数
      const params = id ? { goodsId: id } : this.editForm
      // 在弹窗中发布需验证参数
      if (!id) {
        vaildForm(this.$refs['courseModal']).then(res => {
          console.log(res)
          if (res) {
            publishGoods(params).then(res => {
              AlertBox('success', '发布成功')
              this.getCourseList()
              this.dialogVisible = false
            })
          }
        })
      } else {
        publishGoods(params).then(res => {
          AlertBox('success', '发布成功')
          this.getCourseList()
          this.dialogVisible = false
        })
      }
    },
    // 下架商品
    unsellGoods(id) {
      id = id || this.goodsId
      // 在弹窗中下架需验证参数
      if (this.goodsId) {
        vaildForm(this.$refs['courseModal']).then(res => {
          unshelveGoods({ goodsId: id }).then(res => {
            AlertBox('success', '下架成功')
            this.getCourseList()
          })
        })
      } else {
        unshelveGoods({ goodsId: id }).then(res => {
          AlertBox('success', '下架成功')
          this.getCourseList()
        })
      }
    },
    // 分页操作
    changePage(pageData) {
      this.ruleForm.page = pageData.page
      this.ruleForm.pageSize = pageData.limit
      this.getCourseList()
    },
    editGoods(row, colum) {
      if (colum.label === '商品ID') {
        this.dialogVisible = true
        this.dialogTitle = '编辑商品'
        this.goodsId = row.id
        this.status = row.status
        goodsDetail({ goodsId: row.id }).then(res => {
          this.editForm = {
            content: res.data.content,
            goodsName: res.data.goodsName,
            price: res.data.price,
            taobaoUrl: res.data.taobaoUrl,
            goodsId: res.data.id,
            type: res.data.type.key
          }
        })
      }
    },
    delDocument() {
      delGoods({ goodsId: this.goodsId }).then(res => {
        this.dialogVisible = false
        AlertBox('success', '删除成功')
        this.getCourseList()
      })
    },
    getCourseOptions() {
      goodsType().then(res => {
        this.typeOptions = res.data
      })
      goodsStatus().then(res => {
        this.statusOptions = res.data
      })
    },
    selectStatus(value) {
      this.ruleForm.status = value
    },
    chooseOperation(type, data) {
      if (type === 'publish') {
        this.publishGoods(data.id)
      } else {
        this.unsellGoods(data.id)
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
