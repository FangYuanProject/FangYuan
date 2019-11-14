<template>
  <div class="school-list">
    <h2 class="title">学校列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="学校ID">
        <el-input v-model="ruleForm.id" />
      </el-form-item>
      <el-form-item label="学校代码">
        <el-input v-model="ruleForm.universityCode" />
      </el-form-item>
      <el-form-item label="学校名称">
        <el-input v-model="ruleForm.universityName" />
      </el-form-item>
      <el-form-item label="地区">
        <el-select v-model="ruleForm.location" placeholder="请选择">
          <el-option v-for="(reg, index1) in regions" :key="index1 + 100000" :label="reg" :value="reg" />
        </el-select>
      </el-form-item>
      <el-form-item label="特性">
        <el-select v-model="ruleForm.property" placeholder="请选择">
          <el-option v-for="(pro, index2) in properties" :key="index2 + 1000000" :label="pro.value" :value="pro.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="新建时间">
        <el-date-picker
          v-model="ruleForm.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="热度">
        <el-input v-model="ruleForm.visitor" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="未发布" value="0" />
          <el-option label="已发布" value="1" />
          <el-option label="已下架" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <search-form-btn @click="searchList" />
        <add-method-btn name="学校" @click="addSchool" />
      </el-form-item>
    </el-form>
    <tableComponents
      :total="total"
      :table-data="tableData"
      :th-data="thData"
      @pagination="changePage"
      @cell-click="publishOrOutSell"
    />
    <el-dialog :title="modalTitle" :visible.sync="dialogVisible" width="508px" class="add-school-modal">
      <el-form ref="modalForm" :model="modalForm" :rules="rules">
        <el-form-item label="校徽">
          <span class="school-head">
            <img src="@/assets/schoolBadge@1x.png">
          </span>
          <div style="display: inline-block; margin-top: 10px; vertical-align: top;">
            <upload-pic-btn upload-tips="大小不得大于5M" btn-name="上传校徽" @click="uploadSchoolBadge" />
          </div>
        </el-form-item>
        <el-form-item label="学校代码" prop="universityCode">
          <el-input v-model="modalForm.universityCode" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学校名称" class="active-origin" prop="universityName">
          <el-input v-model="modalForm.universityName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所在地区" class="score-input" prop="location">
          <el-select v-model="modalForm.location" placeholder="请选择">
            <el-option v-for="(loc, index3) in regions" :key="index3 + 1000" :label="loc" :value="loc" />
          </el-select>
        </el-form-item>
        <el-form-item label="特性" class="score-input" prop="property">
          <el-select v-model="modalForm.property" placeholder="请选择">
            <el-option v-for="(pro, index4) in properties" :key="index4 + 10000" :label="pro.value" :value="pro.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="edit-data-btn" @click="submitForm('modalForm', 0)">
          <span>保存</span>
        </el-button>
        <el-button type="primary" class="submit-data-btn" @click="submitForm('modalForm', 1)">
          <span class="iconfont iconfabu">发布</span>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import SearchFormBtn from '@/components/SearchFormBtn'
import UploadPicBtn from '@/components/UploadPictureBtn'
import { schoolList, schoolAdd, schoolDel, schoolRelease, schoolUnshelve, regionList, propertyList } from '@/api/secIndex'
import { dateTimeStr, AlertBox } from '@/utils/util'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn,
    UploadPicBtn
  },
  data() {
    return {
      tableOperation: [
        { name: '发布', clickEvent: 'changeRole' },
        { name: '下架', clickEvent: 'changeRole' }
      ],
      modalTitle: '新增学校',
      status: 'add',
      rules: {
        universityName: [
          { required: true, message: '请输入学校名称', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请选择所在区域', trigger: 'change' }
        ],
        universityCode: [
          { required: true, message: '请输入学校代码', trigger: 'blur' }
        ],
        property: [
          { required: true, message: '请选择学校特性', trigger: 'change' }
        ]
      },
      dialogVisible: false,
      ruleForm: {
        page: 1,
        pageSize: 20,
        universityCode: '',
        universityName: '',
        location: '',
        property: '',
        date: '',
        visitor: ''
      },
      modalForm: {
        universityName: '',
        universityCode: '',
        location: '',
        property: ''
      },
      total: 0,
      page: 1,
      pageSize: 20,
      thData: [
        { name: '学校ID', indexs: 'id' },
        { name: '学校代码', indexs: 'universityCode' },
        { name: '学校名称', indexs: 'universityName' },
        { name: '地区', indexs: 'location' },
        { name: '特性', indexs: 'propertyStr' },
        { name: '新建时间', indexs: 'createTimeStr' },
        { name: '热度', indexs: 'visitor' },
        { name: '状态', indexs: 'statusStr' },
        { name: '操作', indexs: 'operation' }
      ],
      tableData: [],
      properties: [],
      regions: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getProperty()
      this.getRegionList()
      this.getList()
    },
    getProperty() {
      propertyList()
        .then(response => {
          this.ruleForm.properties = response.data || []
          this.properties = response.data || []
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRegionList() {
      regionList()
        .then(response => {
          this.ruleForm.regions = response.data || []
          this.regions = response.data || []
        })
        .catch(error => {
          console.log(error)
        })
    },
    searchList() {
      this.page = 1
      this.getList()
    },
    getList() {
      schoolList(this.ruleForm).then((res) => {
        res.data.forEach(list => {
          list.createTimeStr = dateTimeStr(list.createTime)
          list.statusStr = list.status.value
          list.propertyStr = list.property.value
          list.operation = (list.status.value === '下架' || list.status.value === '新增') ? '发布' : '下架'
        })
        this.total = res.total || 0
        this.tableData = res.data
      }).catch((error) => {
        console.log('error', error)
      })
    },
    changePage(pageData) {
      this.ruleForm.page = pageData.page
      this.ruleForm.pageSize = pageData.limit
      this.getList()
    },
    submitForm(formName, saveOrPublish) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            badgeUrl: '',
            location: this.modalForm.location,
            property: this.modalForm.property,
            universityCode: this.modalForm.universityCode,
            universityName: this.modalForm.universityName
          }
          if (saveOrPublish === 1) {
            schoolRelease(data)
              .then(response => {
                AlertBox('success', '发布成功！')
                setTimeout(() => {
                  this.dialogVisible = false
                  this.ruleForm.page = 1
                  this.getList()
                }, 1000)
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            schoolAdd(data)
              .then(response => {
                AlertBox('success', '保存成功！')
                setTimeout(() => {
                  this.dialogVisible = false
                  this.ruleForm.page = 1
                  this.getList()
                }, 1000)
              })
              .catch(error => {
                console.log('error', error)
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
    },
    addSchool() {
      this.dialogVisible = true
      this.status = 'add'
      this.modalTitle = '新增学校'
    },
    uploadSchoolBadge(file) {
      console.log(file)
    },
    publishOrOutSell(row, column, cell, event) {
      if (column.label === '学校ID') {
        this.$router.push({ path: '/school-detail', query: { id: row.id }})
      } else if (column.label === '操作') {
        const title = row.operation === '发布' ? '是否发布该学校' : '是否确认将该学校下架'
        const successTip = row.operation === '发布' ? '发布' : '下架'
        this.$confirm(title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if (row.operation === '下架') {
            schoolUnshelve({ id: row.id }).then(res => {
              AlertBox('success', '下架成功')
              this.getList()
            })
          } else {
            schoolRelease({ id: row.id }).then(res => {
              AlertBox('success', '发布成功')
              this.getList()
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消' + successTip
          })
        })
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

.add-school-modal {
  .school-head {
    display: inline-block;
    width: 70px;
    height: 70px;
    line-height: 85px;
    text-align: center;
    vertical-align: middle;

    img {
      width: 52px;
      height: 52px;
    }
  }

  .tips {
    font-size: 12px;
    color: rgba(207, 207, 207, 1);
  }
}
</style>

<style lang='scss'>
/* 修改elemnt-ui样式 */
.list-ruleForm .el-input--medium .el-input__inner {
  width: 170px;
  height: 40px;
}

.add-school-modal {
  .el-form-item.el-form-item--medium {
    margin-right: 0;
    margin-bottom: 20px;
    margin-left: 30px;
  }
}

.school-list .el-table__body tr td:first-child {
  color: #0266d6;
}

</style>
