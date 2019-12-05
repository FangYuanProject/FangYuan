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
        <el-select v-model="ruleForm.roleCode" placeholder="请选择角色">
          <el-option v-for="(r, ind) in roleListData" :key="ind + 'search'" :label="r.roleName" :value="r.roleCode" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="search-btn" @click="searchUserList('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" class="add-user" @click="addUser">+&nbsp;新建用户</el-button>
      </el-form-item>
    </el-form>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
      :total="totalNumber"
      @cell-click="toUserDetail"
      @pagination="changePage"
      @handleClick="chooseOperation"
    />
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="508px" class="add-user-modal" :close-on-click-modal="false">
      <el-form ref="addUserModal" :model="addUserForm" :rules="userForm">
        <el-form-item label="头像">
          <span class="school-head" style="display: inline-block; width: 64px; height: 64px;">
            <img style="width: 100%; height: 100%;" :src="userLogoInfo? userLogoInfo : require('@/assets/user.png')">
          </span>
          <div style="display: inline-block; margin-top: 10px; vertical-align: top;">
            <upload-pic-btn upload-tips="大小不得大于5M" btn-name="上传头像" @getUrlSuccess="getUrlSuccess" />
          </div>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="addUserForm.phoneNumber" type="tel" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="角色" prop="roleCode">
          <el-select v-model="addUserForm.roleCode" placeholder="请选择角色">
            <el-option v-for="(r, ind) in roleListData" :key="ind + 'new'" :label="r.roleName" :value="r.roleCode" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitAddForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="更换角色"
      :visible.sync="changeRoleVisible"
      width="508px"
      class="change-user-role"
      :close-on-click-modal="false"
    >
      <el-form :model="roleForm">
        <el-form-item label="用户ID">
          <el-input v-model="roleForm.id" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="roleForm.username" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="roleForm.roleCode" placeholder="请选择角色" class="user-role">
            <el-option v-for="(r, ind) in roleListData" :key="ind + 'edit'" :label="r.roleName" :value="r.roleCode" />
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
import UploadPicBtn from '@/components/UploadPictureBtn'
import { userList, addUser, roleList, changeUserRole } from '@/api/index'
import { validUsername, validPhone } from '@/utils/validate.js'
import { AlertBox, dateTimeStr } from '@/utils/util'
// import { ElStep } from 'element-ui/types/step'
export default {
  components: {
    tableComponents,
    UploadPicBtn
  },
  data() {
    const vaildName = (rule, value, callback) => {
      if (value !== '') {
        if (validUsername(value)) {
          callback()
        } else {
          callback(new Error('请输入正确格式的用户名'))
        }
      } else {
        callback()
      }
    }
    const vaildPhone = (rule, value, callback) => {
      if (value !== '') {
        if (validPhone(value)) {
          callback()
        } else {
          callback(new Error('请输入正确格式的手机号码'))
        }
      } else {
        callback()
      }
    }
    return {
      tableOperation: [{ name: '更换角色' }],
      dialogVisible: false,
      changeRoleVisible: false,
      page: 1,
      pageSize: 20,
      totalNumber: 0,
      userLogoInfo: '', // 用户头像
      ruleForm: {
        id: '',
        email: '',
        phoneNumber: '',
        roleCode: '',
        username: ''
      },
      addUserForm: {
        email: '',
        password: '',
        phoneNumber: '',
        roleCode: '',
        username: ''
      },
      roleListData: [], // 角色列表
      roleForm: {
        id: '',
        username: '',
        roleCode: ''
      }, // 更换角色
      userForm: {
        password: [{ required: true, min: 8, message: '请输入至少8位数的密码', trigger: 'blur' }],
        email: [{ type: 'email', required: true, message: '请输入正确格式的邮箱，如：xxx@qq.com', trigger: 'blur' }],
        roleCode: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
        phoneNumber: [{ required: true, message: '请输入正确格式的手机号码', trigger: 'blur', validator: vaildPhone }],
        username: [{ required: false, message: '用户名请输入汉字、字母、数字，下划线', trigger: 'blur', validator: vaildName }]
      },
      thData: [
        { name: '用户ID', indexs: 'id' },
        { name: '用户名', indexs: 'username' },
        { name: '手机号', indexs: 'phoneNumber' },
        { name: '邮箱', indexs: 'email' },
        { name: '注册时间', indexs: 'createTime' },
        { name: '角色', indexs: 'roleName' },
        { name: '操作', indexs: 'operation' }
      ],
      tableData: []
    }
  },
  mounted() {
    this.getUserList()
    this.getRoleList()
  },
  methods: {
    chooseOperation(type, data) {
      this.changeRoleVisible = true
      this.dialogVisible = false
      this.roleForm = {
        id: data.id,
        username: data.username,
        roleCode: data.roleCode.value
      }
    },
    submitAddForm(formName) {
      this.$refs['addUserModal'].validate((vaild) => {
        if (vaild) {
          this.addUserForm.userLogoInfo = this.userLogoInfo || ''
          addUser(this.addUserForm).then(res => {
            AlertBox('success', res.message)
            this.dialogVisible = false
            this.getUserList()
          })
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
      setTimeout(() => {
        this.$refs['addUserModal'].resetFields()
      }, 5)
    },
    submitChangeRoleInfo() {
      this.changeRoleVisible = false
      changeUserRole({ id: this.roleForm.id, roleCode: this.roleForm.roleCode }).then(res => {
        AlertBox('success', '更改成功')
        this.getUserList()
      })
    },
    toUserDetail(row, column, cell, event) {
      if (column.label === '用户ID') {
        this.$router.push({ path: '/user/home', query: { id: row.id }})
      }
    },
    getUserList() {
      this.ruleForm.page = this.page
      this.ruleForm.pageSize = this.pageSize
      userList(this.ruleForm).then(res => {
        res.data.forEach(list => {
          list.createTime = dateTimeStr(list.createTime)
          list.roleName = list.roleCode.value
          list.operation = [{ name: '更换角色', clickEvent: 'changeRole' }]
        })
        this.tableData = res.data
        this.totalNumber = res.total
      })
    },
    getRoleList() {
      roleList().then(res => {
        this.roleListData = res.data
      })
    },
    changePage(pageData) {
      this.page = pageData.page
      this.pageSize = pageData.limit
      this.getUserList(this.ruleForm)
    },
    getUrlSuccess(file) {
      console.log(file)
      console.log('123')
      this.userLogoInfo = file.data.path
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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

.user-list .el-table__body tr td:nth-of-type(1) {
  color: #0266d6;
}
</style>
