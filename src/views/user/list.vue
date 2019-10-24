<template>
  <div>
    <h2 class="title">用户列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="60px" inline class="demo-ruleForm">
      <el-form-item label="用户ID" prop="newId">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="用户名" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="手机号" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="邮箱" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="角色" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="searchBtn" @click="submitForm('ruleForm')">查询</el-button>
        <el-button type="primary" class="add-user">+&nbsp;新建用户</el-button>

      </el-form-item>
    </el-form>
    <tableComponents :table-data="tableData" :th-data="thData" />
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
export default {
  components: {
    tableComponents
  },
  data() {
    return {
      ruleForm: {
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
        { name: '用户ID', indexs: 'id' },
        { name: '用户名', indexs: 'title' },
        { name: '手机号', indexs: 'pone' },
        { name: '邮箱', indexs: 'email' },
        { name: '注册时间', indexs: 'publish' },
        { name: '角色', indexs: 'undercarriage' },
        { name: '操作', indexs: 'operate' }
      ],
      tableData: [
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员',
          operate: '更换角色'
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员',
          operate: '更换角色'
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员',
          operate: '更换角色'
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
    }
  }
}
</script>

<style lang="scss" scoped>
    .title{
        font-size: 20px;
        color:#202431;
        margin: 26px 0 69px 30px;
    }
    .searchBtn{
      width:87px;
      height:40px;
      color:#455A64;
      font-size:14px;
      background:rgba(241,241,241,1);
      border-radius:4px;
      border:1px solid rgba(69,90,100,1);
      margin-left: 30px;
    }
  .add-user{
    width:109px;
    height:40px;
    background:rgba(69,90,100,1);
    border-radius:4px;
    border-color:rgba(69,90,100,1);
    font-size:14px;
    margin-left:123px;
  }
</style>

<style>
 /*修改elemnt-ui样式*/
 .el-input--medium .el-input__inner{
   width:170px;
   height:40px;
 }
 .el-form-item__label{
   font-size: 14px;
   color:#757575;
   text-align: right;
 }
 .el-form-item.el-form-item--medium{
   margin-right: 0;
 }
 .el-form-item.el-form-item--medium{
   margin-left:30px;
 }
</style>
