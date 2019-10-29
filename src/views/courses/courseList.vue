<template>
  <div class="course-list">
    <h2 class="title">课程列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="70px" inline class="new-list-ruleForm">
      <el-form-item label="课程ID" prop="newId">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="课程名称" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="课程类型" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
       <search-form-btn></search-form-btn>
        <add-method-btn name="课程" @click="AddCourse"></add-method-btn>
      </el-form-item>
    </el-form>
    <tableComponents :table-data="tableData" :th-data="thData" :table-operation="tableOperation" :dialog-type="changeRoleVisible" @changeRole="changeUserRole" />
    <el-dialog title="新增课程" :visible.sync="dialogVisible" width="508px" class="add-course-modal">
       <el-form :model="form">
        <el-form-item label="课程名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="课程内容" class="active-origin">
           <el-input v-model="form.name" autocomplete="off" />
 
        </el-form-item>
        <el-form-item label="价格" xx>
                   <el-select v-model="ruleForm.region" placeholder="请选择活动区域" class="course-price">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
         <el-form-item label="淘宝链接">
          <el-input v-model="form.name" autocomplete="off" />
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
      tableOperation: [{ name: '发布', clickEvent: 'changeRole' },{ name: '下架', clickEvent: 'changeRole' }],
      dialogVisible: false,  
      publiceSubjects:['101思想政治理论', '201英语一', '202俄语', '203日语',' 204英语二', '301数学一', '302数学二', '303数学三'],
      professionSubjects:['数据结构', '操作系统', '计算机组成原理', '计算机网络',' 程序设计',' 软件工程', '数据库'],
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
        { name: '课程ID', indexs: 'id' },
        { name: '课程名称', indexs: 'title' },
        { name: '课程类型', indexs: 'pone' },
        { name: '状态', indexs: 'email' },
        { name: '创建时间', indexs: 'publish' },
      ],
      tableData: [
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
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
    AddCourse() {
      console.log('123')
      this.dialogVisible = true
    },
    changeRoleVisible(){
      
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
