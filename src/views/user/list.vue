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
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
      :dialog-type="changeRoleVisible"
      @click="changeUserRole"
    />
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="508px" class="add-user-modal">
      <el-form :model="form">
        <el-form-item label="头像" class="user-info">
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
    <el-dialog
      title="更换角色"
      :visible.sync="changeRoleVisible"
      width="508px"
      class="change-user-role"
    >
      <el-form :model="form">
        <el-form-item label="用户ID">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="ruleForm.region" placeholder="请选择角色" class="user-role">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitChangeRoleInfo">确 定</el-button>
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
      tableOperation: [{ name: '更换角色' }],
      dialogVisible: false,
      changeRoleVisible: false,
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
        { name: '角色', indexs: 'undercarriage' }
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
    addUser() {
      this.dialogVisible = true
    },
    changeUserRole(data) {
      console.log('123')
      this.changeRoleVisible = true
      this.dialogVisible = false
    },
    submitChangeRoleInfo() {
      this.changeRoleVisible = false
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

.add-user-modal {
  .user-info {
    height: 40px;

    .user-head {
      position: relative;
      top: -34px;
      display: inline-block;
      vertical-align: text-top;

      img {
        width: 64px;
        height: 64px;
      }
    }
  }

  .tips {
    font-size: 12px;
    color: rgba(207, 207, 207, 1);
  }
}
</style>

<style lang="scss">
/* 修改elemnt-ui样式 */
.user-list-ruleForm .el-input--medium .el-input__inner {
  width: 170px;
  height: 40px;
}

.change-user-role {
  .user-role .el-input {
    width: 377px;
  }
}

.add-user-modal {
  .el-form-item.el-form-item--medium {
    margin-right: 0;
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
}

.el-table__body tr td:nth-of-type(2),
.el-table__body tr td:last-child {
  color: #0266d6;
}
</style>
