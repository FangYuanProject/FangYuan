<template>
  <div>
    <h2 class="title">用户列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="60px" inline class="user-list-ruleForm">
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
        <el-button type="primary" class="search-btn" @click="submitForm('ruleForm')">查询</el-button>
        <el-button type="primary" class="add-user" @click="addUser">+&nbsp;新建用户</el-button>
      </el-form-item>
    </el-form>
    <tableComponents :table-data="tableData" :th-data="thData" />
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="508px" class="add-user-modal">
      <el-form :model="form">
        <el-form-item label="头像">
          <span class="user-head">
            <img src="@/assets/user.png" alt>
          </span>
          <el-button type="primary" class="upload-head" @click="dialogVisible = false">上传头像</el-button>
          <span class="tips">大小不得大于5M</span>

        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色">
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
export default {
  components: {
    tableComponents
  },
  data() {
    return {
      dialogVisible: false,
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
    },
    addUser() {
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

.search-btn {
  width: 87px;
  height: 40px;
  margin-left: 30px;
  font-size: 14px;
  color: #455a64;
  background: rgba(241, 241, 241, 1);
  border: 1px solid rgba(69, 90, 100, 1);
  border-radius: 4px;
}

.add-user {
  width: 109px;
  height: 40px;
  margin-left: 123px;
  font-size: 14px;
  background: rgba(69, 90, 100, 1);
  border-color: rgba(69, 90, 100, 1);
  border-radius: 4px;
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

.add-user-modal {
  .user-head {
    display: inline-block;
    width: 70px;
    height: 70px;
    line-height: 85px;
    text-align: center;
    vertical-align: middle;
    background: rgba(251, 251, 251, 1);
    border-radius: 10px;

    img {
      width: 27px;
      height: 31px;
    }
  }

  .tips {
    font-size: 12px;
    color: rgba(207, 207, 207, 1);
  }
}
</style>

<style>
/* 修改elemnt-ui样式 */
.user-list-ruleForm .el-input--medium .el-input__inner {
  width: 170px;
  height: 40px;
}

.add-user-modal .el-input--medium,
.add-user-modal .el-input--medium .el-input__inner {
  width: 335px;
  height: 40px;
}

.add-user-modal .el-form-item__content:not(:first-child) {
  height: 40px;
}

.el-form-item__label {
  font-size: 14px;
  color: #757575;
  text-align: right;
}

.el-form-item.el-form-item--medium {
  margin-right: 0;
  margin-left: 30px;
}

.el-dialog__header {
  height: 56px;
  border-bottom: 1px solid #ebeef5;
}

.el-dialog__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  color: rgba(32, 36, 49, 1);
}

.el-dialog__footer {
  text-align: center;
}

.add-user-modal .el-form-item--medium .el-form-item__label {
  width: 61px;
  font-size: 14px;
  color: #757575;
}

.add-user-modal .upload-head {
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
</style>
