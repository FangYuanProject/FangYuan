<template>
  <div id="new-list">
    <h2 class="title">新闻列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="60px" inline class="new-list-ruleForm">
      <el-form-item label="新闻ID" prop="id">
        <el-input v-model="ruleForm.id" />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createBeginTime" label-width="70px">
        <el-date-picker
          v-model="ruleForm.createBeginTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="发布时间" prop="releaseBeginTime" label-width="70px">
        <el-date-picker
          v-model="ruleForm.releaseBeginTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="下架时间" prop="unshelveBeginTime" label-width="70px">
        <el-date-picker
          v-model="ruleForm.unshelveBeginTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <search-form-btn @click="searchNewsList" />
        <add-method-btn name="新闻" @click="addNews" />
      </el-form-item>
    </el-form>
    <tableComponents :table-data="tableData" :th-data="thData" :table-operation="tableOperation" :total="tableData.length" @cell-click="editNews" @pagination="changePage" />
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import SearchFormBtn from '@/components/SearchFormBtn'
import { newsList } from '@/api/index'

export default {
  components: {
    tableComponents,
    SearchFormBtn,
    AddMethodBtn
  },
  data() {
    return {
      tableOperation: [{ name: '发布' }, { name: '下架' }],
      ruleForm: {
        id: '',
        title: '',
        status: '',
        type: '',
        releaseBeginTime: '',
        createBeginTime: '',
        unshelveBeginTime: '',
        page: 1,
        pageSize: 20
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      thData: [
        { name: '新闻ID', indexs: 'id' },
        { name: '标题', indexs: 'title' },
        { name: '类型', indexs: 'type' },
        { name: '创建时间', indexs: 'createBeginTime' },
        { name: '发布时间', indexs: 'releaseBeginTime' },
        { name: '下架时间', indexs: 'unshelveBeginTime' },
        { name: '状态', indexs: 'status' }
      ],
      tableData: []
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addNews() {
      this.$router.push({ path: '/news-detail' })
    },
    editNews(row, column, cell, event) {
      if (column.label === '新闻ID') {
        this.$router.push({ path: '/news-detail', query: row.id })
      }
    },
    searchNewsList() {
      console.log(this.ruleForm)
    },
    getNewsList() {
      newsList(this.ruleForm).then(res => {
        console.log(res)
      })
    },
    changePage(pageData) {
      this.ruleForm.page = pageData.page
      this.ruleForm.pageSize = pageData.limit
      this.getNewsList()
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

.add-news-modal {
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
.new-list-ruleForm {
  margin-left: 30px;
}

.add-news-modal {
  .el-form-item.el-form-item--medium {
    margin-right: 0;
    margin-bottom: 20px;
    margin-left: 30px;
  }

  .upload-head {
    width: 87px;
    height: 40px;
    padding: 0;
    margin-right: 16px;
    margin-left: 20px;
    font-size: 14px;
    line-height: 40px;
    color: rgba(69, 90, 100, 1);
    text-align: center;
    background-color: #fff;
    border: 1px solid rgba(69, 90, 100, 1);
    border-radius: 4px;
  }

  .el-checkbox {
    height: 20px;
    margin-right: 20px;
  }

  .el-checkbox-group {
    float: right;
    width: 80%;
  }

  .el-form-item__content {
    line-height: 15px;
  }
}

#new-list .el-table__body tr td:first-child {
  color: #0266d6;
}

.score-input {
  .el-input {
    display: inline-block;
    width: 147px;
  }
}

.active-origin {
  .el-input {
    width: 375px;
  }
}
</style>
