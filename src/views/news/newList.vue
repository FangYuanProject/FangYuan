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
      <StatusOptions v-model="ruleForm.status" is-inline="inline" @change="selectStatus" />
      <el-form-item label="类型" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择">
          <el-option v-for="(item,index) in newsTypeOptions" :key="index+10" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime" label-width="70px">
        <el-date-picker
          v-model="createTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="发布时间" prop="releaseTime" label-width="70px">
        <el-date-picker
          v-model="releaseTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="下架时间" prop="unshelveTime" label-width="70px">
        <el-date-picker
          v-model="unshelveTime"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item>
        <search-form-btn @click="searchNewsList" />
        <add-method-btn name="新闻" @click="addNews" />
      </el-form-item>
    </el-form>
    <tableComponents :table-data="tableData" :th-data="thData" :total="total" @cell-click="editNews" @pagination="changePage" @handleClick="chooseOperation" />
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import SearchFormBtn from '@/components/SearchFormBtn'
import StatusOptions from '@/components/StatusOptions'
import { newsList, newsType, publishNews, unshelveNews } from '@/api/index'
import { AlertBox, dateTimeStr } from '@/utils/util'

export default {
  components: {
    tableComponents,
    SearchFormBtn,
    AddMethodBtn,
    StatusOptions
  },
  data() {
    return {
      // tableOperation: [{ name: '发布' }, { name: '下架' }],
      ruleForm: {
        id: '',
        title: '',
        status: '',
        type: '',
        releaseTime: '',
        createTime: '',
        unshelveTime: '',
        page: 1,
        pageSize: 20
      },
      thData: [
        { name: '新闻ID', indexs: 'id' },
        { name: '标题', indexs: 'title' },
        { name: '类型', indexs: 'type' },
        { name: '创建时间', indexs: 'createTime' },
        { name: '发布时间', indexs: 'releaseTime' },
        { name: '下架时间', indexs: 'unshelveTime' },
        { name: '状态', indexs: 'status' },
        { name: '操作', indexs: 'operation' }

      ],
      tableData: [],
      total: 0,
      newsTypeOptions: [],
      releaseTime: '',
      unshelveTime: '',
      createTime: ''
    }
  },
  mounted() {
    this.getNewsList()
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
        this.$router.push({ path: '/news-detail', query: { id: row.id }})
      }
    },
    searchNewsList() {
      this.ruleForm.page = 1
      this.ruleForm.pageSize = 20
      this.ruleForm.releaseTime = this.releaseTime ? this.releaseTime[0] + '~' + this.releaseTime[1] : ''
      this.ruleForm.createTime = this.createTime ? this.createTime[0] + '~' + this.createTime[1] : ''
      this.ruleForm.unshelveTime = this.unshelveTime ? this.unshelveTime[0] + '~' + this.unshelveTime[1] : ''
      this.getNewsList()
    },
    getNewsType() {
      newsType().then(res => {
        this.newsTypeOptions = res.data
      })
    },
    getNewsList() {
      newsList(this.ruleForm).then(res => {
        res.data.forEach(list => {
          list.createTime = dateTimeStr(list.createTime)
          list.releaseTime = dateTimeStr(list.releaseTime)
          list.unshelveTime = dateTimeStr(list.unshelveTime)
          list.status = list.status.value
          list.type = list.type.value
          list.operation = []
          if (list.status === '下架' || list.status === '新增') {
            list.operation.push({ name: '发布', clickEvent: 'publish' })
          } else {
            list.operation.push({ name: '下架', clickEvent: 'outSell' })
          }
        })
        this.tableData = res.data
        this.total = res.total
      })
    },
    changePage(pageData) {
      this.ruleForm.page = pageData.page
      this.ruleForm.pageSize = pageData.limit
      this.getNewsList()
    },
    selectStatus(value) {
      this.ruleForm.status = value
    },
    chooseOperation(type, data) {
      if (type === 'publish') {
        publishNews({ id: data.id }).then(res => {
          AlertBox('success', '发布成功')
          this.getNewsList()
        })
      } else {
        unshelveNews({ id: data.id }).then(res => {
          AlertBox('success', '下架成功')
          this.getNewsList()
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
