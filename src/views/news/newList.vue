<template>
  <div id="new-list">
    <h2 class="title">新闻列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="60px" inline class="new-list-ruleForm">
      <el-form-item label="新闻ID" prop="newId">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="状态" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="region" label-width="70px">
        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="发布时间" prop="region" label-width="70px">
        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="下架时间" prop="region" label-width="70px">
        <el-date-picker
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <search-form-btn />
        <add-method-btn name="新闻" @click="addNews" />
      </el-form-item>
    </el-form>
    <tableComponents :table-data="tableData" :th-data="thData" :table-operation="tableOperation" :dialog-type="changeRoleVisible" @changeRole="changeUserRole" />
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import SearchFormBtn from '@/components/SearchFormBtn'
export default {
  components: {
    tableComponents,
    SearchFormBtn,
    AddMethodBtn
  },
  data() {
    return {
      tableOperation: [{ name: '发布', clickEvent: 'publish' }, { name: '下架', clickEvent: 'publish' }],
      ruleForm: {
        name: '',
        region: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
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
        { name: '类型', indexs: 'pone' },
        { name: '创建时间', indexs: 'email' },
        { name: '发布时间', indexs: 'publish' },
        { name: '下架时间', indexs: 'time' },
        { name: '状态', indexs: 'status' }
      ],
      tableData: [
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员',
          time: '普通管理员',
          status: '普通管理员'
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员',
          time: '普通管理员',
          status: '普通管理员'
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员',
          time: '普通管理员',
          status: '普通管理员'
        }
      ]
    }
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
      this.$refs[formName].resetFields()
    },
    addNews() {
      this.$router.push({ path: '/news-detail' })
    },
    changeRoleVisible() {

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

.new-list-ruleForm .el-input--medium .el-input__inner {
  width: 170px;
  height: 40px;
}

.add-news-modal .el-input--medium,
.add-news-modal .el-input--medium .el-input__inner {
  width: 335px;
  height: 40px;
}

// .add-news-modal .el-form-item__content:not(:first-child) {
//   height: 40px;
// }

.add-news-modal {
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

#new-list .el-table__body tr td:first-child,
#new-list .el-table__body tr td:last-child {
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
