<template>
  <div class="menu-list">
    <h2 class="title">菜单列表</h2>
    <add-method-btn name="菜单" style="float: right; margin-right: 30px;" @click="AddRole" />

    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
      :dialog-type="changeRoleVisible"
      @click="editRole"
    />
    <el-dialog title="权限" :visible.sync="dialogVisible" width="508px" class="edit-menu-modal">
      <el-form :model="form">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上级菜单" class="active-origin">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" xx>
          <el-select v-model="form.region" placeholder="请选择活动区域" class="menu-sort">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单url">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态">
          <el-checkbox v-model="checked">显示</el-checkbox>
          <el-checkbox v-model="checked">隐藏</el-checkbox>
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
        { name: '菜单名称', indexs: 'id' },
        { name: '上级菜单', indexs: 'title' },
        { name: '链接', indexs: 'pone' },
        { name: '状态', indexs: 'email' }
      ],
      tableData: [
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com'
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com'
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com'
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
    AddRole() {
      console.log('123')
      this.dialogVisible = true
    },
    editRole() {
      this.dialogVisible = true
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
