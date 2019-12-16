<template>
  <div class="school-list">
    <h2 class="title">学校列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="学校ID" prop="id">
        <el-input v-model="ruleForm.id" />
      </el-form-item>
      <el-form-item label="学校代码" prop="universityCode">
        <el-input v-model="ruleForm.universityCode" />
      </el-form-item>
      <el-form-item label="学校名称" prop="universityName">
        <el-input v-model="ruleForm.universityName" />
      </el-form-item>
      <el-form-item label="地区" prop="location">
        <el-select v-model="ruleForm.location" placeholder="请选择">
          <el-option v-for="(reg, index1) in regions" :key="index1 + '100000'" :label="reg" :value="reg" />
        </el-select>
      </el-form-item>
      <el-form-item label="特性" prop="property">
        <el-select v-model="ruleForm.property" placeholder="请选择">
          <el-option v-for="(pro, index2) in properties" :key="index2 + '1000000'" :label="pro.value" :value="pro.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="热度" prop="visitor">
        <el-input v-model="ruleForm.visitor" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择">
          <el-option v-for="(st, index) in statusData" :key="index + '10000000'" :label="st.value" :value="st.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="新建时间" prop="createTime">
        <el-date-picker
          v-model="createTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <search-form-btn @click="searchList" />
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <add-method-btn name="学校" class="mb0" @click="addSchool" />
      </el-form-item>
    </el-form>
    <tableComponents
      :total="total"
      :table-data="tableData"
      :th-data="thData"
      :limit="ruleForm.pageSize"
      @handleClick="chooseOperation"
      @pagination="changePage"
      @cell-click="publishOrOutSell"
    />
    <SchoolInfo ref="schoolInfo" :title="modalTitle" :dialog-visible="dialogVisible" @submitForm="submitForm" @closeHandel="closeModal" />
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import SearchFormBtn from '@/components/SearchFormBtn'
import { schoolList, schoolAdd, schoolRelease, schoolUnshelve, regionList, propertyList, status } from '@/api/secIndex'
import { dateTimeStr, AlertBox } from '@/utils/util'
import SchoolInfo from './components/schoolInfo'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn,
    SchoolInfo
  },
  data() {
    return {
      modalTitle: '新增学校',
      dialogVisible: false,
      ruleForm: {
        page: 1,
        pageSize: 20,
        universityCode: '',
        universityName: '',
        location: '',
        property: '',
        status: '',
        createTime: '',
        visitor: ''
      },
      createTime: '',
      total: 0,
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
      regions: [],
      statusData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    closeModal() {
      this.dialogVisible = false
    },
    init() {
      this.getStatus()
      this.getProperty()
      this.getRegionList()
      this.getList()
    },
    getStatus() {
      status()
        .then(res => {
          this.statusData = res.data || []
        })
        .catch(error => {
          console.log(error)
        })
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
      this.ruleForm.page = 1
      this.getList()
    },
    getList() {
      this.ruleForm.createTime = this.createTime ? this.createTime[0] + '~' + this.createTime[1] : ''
      schoolList(this.ruleForm).then((res) => {
        let operateName = ''
        let clickEvent = ''
        res.data.forEach(list => {
          list.createTimeStr = dateTimeStr(list.createTime)
          list.statusStr = list.status.value
          list.propertyStr = list.property.value
          operateName = (list.status.value === '未发布' || list.status.value === '已下架') ? '发布' : '下架'
          clickEvent = (list.status.value === '未发布' || list.status.value === '已下架') ? 'release' : 'unShelve'
          list.operation = [{ name: operateName, clickEvent }]
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
    submitForm(data, saveOrPublish) {
      if (saveOrPublish === 1) {
        schoolRelease(data)
          .then(response => {
            AlertBox('success', '发布成功！')
            this.ruleForm.page = 1
            this.getList()
            setTimeout(() => {
              this.dialogVisible = false
            }, 500)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        schoolAdd(data)
          .then(response => {
            AlertBox('success', '保存成功！')
            this.ruleForm.page = 1
            this.getList()
            setTimeout(() => {
              this.dialogVisible = false
            }, 500)
          })
          .catch(error => {
            console.log('error', error)
          })
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.createTime = ''
      this.getList()
    },
    addSchool() {
      this.dialogVisible = true
      const schoolInfo = this.$refs.schoolInfo
      schoolInfo.clear()
    },
    chooseOperation(type, data) {
      let title = '是否发布该学校？'
      let successTip = '发布'
      // release unShelve
      if (type === 'unShelve') {
        title = '是否确认将该学校下架？'
        successTip = '下架'
      }
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if (type === 'unShelve') {
          schoolUnshelve({ id: data.id }).then(res => {
            AlertBox('success', '下架成功')
            this.getList()
          })
        } else {
          schoolRelease({ id: data.id }).then(res => {
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
    },
    publishOrOutSell(row, column, cell, event) {
      if (column.label === '学校ID') {
        this.$router.push({ path: '/school-detail', query: { id: row.id }})
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
</style>

<style lang='scss'>
/* 修改elemnt-ui样式 */
.list-ruleForm .el-input--medium .el-input__inner {
  width: 170px;
  height: 40px;
}

.school-list .el-table__body tr td:first-child {
  color: #0266d6;
}

</style>
