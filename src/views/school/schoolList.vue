<template>
  <div class="school-list">
    <h2 class="title">学校列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="学校ID" prop="newId">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="学校名称" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="地区" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <search-form-btn />
        <add-method-btn name="学校" @click="addSchool" />
      </el-form-item>
    </el-form>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
    />
    <el-dialog title="新增学校" :visible.sync="dialogVisible" width="508px" class="add-news-modal">
      <el-form :model="form">
        <el-form-item label="校徽">
          <span class="school-head">
            <img src="@/assets/schoolBadge@1x.png" alt>
          </span>
          <div style="display: inline-block; margin-top: 10px; vertical-align: top;">
            <el-button type="primary" class="upload-head" @click="dialogVisible = false">上传校徽</el-button>
            <span class="tips">大小不得大于5M</span>
          </div>
        </el-form-item>
        <el-form-item label="学校名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所在校区" class="active-origin">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="公共科目">
          <el-checkbox-group>
            <el-checkbox
              v-for="(pubSub,index) in publiceSubjects"
              :key="pubSub+index"
              :label="pubSub"
            >{{ pubSub }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="专业科目">
          <el-checkbox-group>
            <el-checkbox
              v-for="(proSub,index) in professionSubjects"
              :key="proSub+index"
              :label="proSub"
            >{{ proSub }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="初试分数线" class="score-input">
          <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
          <el-input v-model="form.name" autocomplete="off" />
          <span>+</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import SearchFormBtn from '@/components/SearchFormBtn'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn
  },
  data() {
    return {
      tableOperation: [
        { name: '发布', clickEvent: 'changeRole' },
        { name: '下架', clickEvent: 'changeRole' }
      ],
      dialogVisible: false,
      publiceSubjects: [
        '101思想政治理论',
        '201英语一',
        '202俄语',
        '203日语',
        ' 204英语二',
        '301数学一',
        '302数学二',
        '303数学三'
      ],
      professionSubjects: [
        '数据结构',
        '操作系统',
        '计算机组成原理',
        '计算机网络',
        ' 程序设计',
        ' 软件工程',
        '数据库'
      ],
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
        name: ''
      },
      thData: [
        { name: '学校ID', indexs: 'id' },
        { name: '学校代码', indexs: 'title' },
        { name: '学校名称', indexs: 'title' },
        { name: '地区', indexs: 'pone' },
        { name: '创建时间', indexs: 'publish' },
        { name: '热度', indexs: 'undercarriage' },
        { name: '学校代码', indexs: 'undercarriage' }
      ],
      tableData: [
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员'
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员'
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员'
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
    addSchool() {
      this.dialogVisible = true
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
  // .el-form-item__content:not(:first-child) {
  //   height: 40px;
  // }

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

.school-list .el-table__body tr td:first-child {
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
