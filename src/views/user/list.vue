<template>
  <div class="user-list">
    <h2 class="title">用户列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="60px" inline class="user-list-ruleForm">
      <el-form-item label="用户ID" prop="id">
        <el-input v-model="ruleForm.id" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="ruleForm.phoneNumber" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="角色" prop="roleCode">
        <el-select v-model="ruleForm.roleCode" placeholder="请选择">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="search-btn" @click="searchUserList('ruleForm')">查询</el-button>
        <el-button type="primary" class="add-user" @click="addUser">+&nbsp;新建用户</el-button>
      </el-form-item>
    </el-form>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
      :total="totalNumber"
      @click="changeUserRole"
      @cell-click="toUserDetail"
      @pagination="changePage"
    />
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="508px" class="add-user-modal">
      <el-form ref="addUserModal" :model="form" :rules="userForm">
        <el-form-item label="头像" class="user-info">
          <span class="user-head">
            <img src="@/assets/user.png" alt>
          </span>
          <el-button type="primary" class="upload-head" @click="dialogVisible = false">上传头像</el-button>
          <span class="tips">大小不得大于5M</span>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="form.phoneNumber" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="角色" prop="roleCode">
          <el-input v-model="form.roleCode" autocomplete="off" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitAddForm('addUserModal')">确 定</el-button>
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
          <el-input v-model="form.id" autocomplete="off" />
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
import { userList, addUser } from '@/api/index'
import { AlertBox } from '@/utils/util.js'
export default {
  components: {
    tableComponents
  },
  data() {
    return {
      tableOperation: [{ name: '更换角色' }],
      dialogVisible: false,
      changeRoleVisible: false,
      page: 1,
      pageSize: 20,
      totalNumber: 0,
      ruleForm: {
        id: '',
        email: '',
        phoneNumber: '',
        roleCode: '',
        username: ''
      },
      form: {
        email: '',
        password: '',
        phoneNumber: '',
        roleCode: '',
        username: ''
      },
      userForm: {
        password: [{ required: true, min: 8, message: '请输入至少8位数的密码', trigger: 'blur' }],
        email: [{ type: 'email', required: true, message: '请输入正确格式的密码', trigger: 'blur' }],
        roleCode: [{ required: true, message: '请输入用户角色', trigger: 'blur' }]
      },
      thData: [
        { name: '用户ID', indexs: 'id' },
        { name: '用户名', indexs: 'username' },
        { name: '手机号', indexs: 'phoneNumber' },
        { name: '邮箱', indexs: 'email' },
        { name: '注册时间', indexs: 'createTime' },
        { name: '角色', indexs: 'roleCode' }
      ],
      tableData: []
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    submitAddForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addUser(this.form).then(res => {
            AlertBox('success', res.message)
            this.dialogVisible = false
            this.getUserList()
          })
        } else {
          return false
        }
      })
    },
    searchUserList() {
      this.ruleForm.page = 1
      this.ruleForm.pageSize = 20
      this.getUserList()
    },
    addUser() {
      this.dialogVisible = true
    },
    changeUserRole(data) {
      this.changeRoleVisible = true
      this.dialogVisible = false
    },
    submitChangeRoleInfo() {
      this.changeRoleVisible = false
    },
    toUserDetail(row, column, cell, event) {
      console.log(row)
      if (column.label === '用户名') {
        this.$router.push({ path: '/user/home', query: { id: row.id }})
      }
    },
    getUserList() {
      this.ruleForm.page = this.page
      this.ruleForm.pageSize = this.pageSize
      userList(this.ruleForm).then(res => {
        this.tableData = res.data
        this.totalNumber = res.total
      })
    },
    changePage(pageData) {
      this.page = pageData.page
      this.pageSize = pageData.limit
      this.getUserList(this.ruleForm)
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

.user-list .el-table__body tr td:nth-of-type(2) {
  color: #0266d6;
}
</style>
