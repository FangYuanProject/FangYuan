<template>
  <div class="menu-list">
    <h2 class="title">菜单列表</h2>
    <add-method-btn name="菜单" style="float: right; margin-right: 30px;" @click="AddRole" />

    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
      @click="editRole"
    />
    <el-dialog title="权限" :visible.sync="dialogVisible" width="508px" class="edit-menu-modal">
      <el-form :model="form" :rules="vaildFormContent">
        <el-form-item label="菜单名称">
          <el-input v-model="form.menuName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上级菜单" class="active-origin">
          <el-select v-model="form.superiorName" placeholder="请选择" class="menu-sort">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.order" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单url">
          <el-input v-model="form.url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="form.status">显示</el-radio>
          <el-radio v-model="form.status">隐藏</el-radio>
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
import { menuList, editMenu, addMenu, deleteMenu } from '@/api/index'
export default {
  components: {
    tableComponents,
    AddMethodBtn
  },
  data() {
    return {
      tableOperation: [{ name: '修改' }],
      checked: true,
      dialogVisible: false,
      form: {
        menuName: '',
        order: '',
        status: 0,
        superiorName: '',
        url: ''
      },
      vaildFormContent: {
        menuName: [{ requied: true, message: '请输入菜单名称', trigger: 'blur' }],
        order: [{ requied: true, message: '请选择排序', trigger: 'blur' }],
        status: [{ requied: true, message: '请选择上级菜单', trigger: 'blur' }],
        superiorName: [{ requied: true, message: '请输入菜单名称', trigger: 'blur' }],
        url: [{ requied: true, message: '请输入链接', trigger: 'blur' }]
      },
      menuFormStatus: false,
      thData: [
        { name: '菜单名称', indexs: 'id' },
        { name: '上级菜单', indexs: 'title' },
        { name: '链接', indexs: 'pone' },
        { name: '状态', indexs: 'email' }
      ],
      tableData: []
    }
  },
  mounted() {
    this.getMenuList()
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
    AddRole() {
      console.log('123')
      this.dialogVisible = true
    },
    editRole() {
      this.dialogVisible = true
    },
    changeRoleVisible() {

    },
    getMenuList() {
      menuList().then(res => {
        this.tableData = res.data
      })
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

</style>

<style lang='scss'>
.edit-menu-modal {
  .menu-sort .el-input {
    width: 377px;
  }

  .el-form-item.el-form-item--medium {
    margin-right: 0;
    margin-bottom: 20px;
    margin-left: 30px;
  }
}

.menu-list .el-table__body td:nth-child(3) {
  color: #0266d6;
}
</style>
