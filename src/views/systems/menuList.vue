<template>
  <div class="menu-list">
    <h2 class="title">菜单列表</h2>
    <add-method-btn name="菜单" style="float: right; margin-right: 30px;" @click="AddRole" />
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :total="total"
      :show-pages="false"
      cell-color="#1EAB00"
      @handleClick="editRole"
    />
    <el-dialog :title="titleMenu" :visible.sync="dialogVisible" width="508px" class="edit-menu-modal" :close-on-click-modal="false">
      <el-form ref="menuModal" :model="form" :rules="vaildFormContent">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="form.menuName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上级菜单" class="active-origin" prop="superiorId">
          <el-select v-model="form.superiorId" placeholder="请选择" class="menu-sort" @change="changeSuperior">
            <el-option label="请选择" value="" />
            <el-option v-for="(item,index) in formMenuList" :key="item+index" :label="item.menuName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input v-model="form.order" maxlength="2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单url" prop="url">
          <el-input v-model="form.url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio name="setStatus" :label="1">显示</el-radio>
            <el-radio name="setStatus" :label="0">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitForm('menuModal')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import { menuList, editMenu, addMenu, deleteMenu } from '@/api/index'
import { AlertBox } from '@/utils/util'
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
      titleMenu: '', // 新增编辑菜单
      form: {
        menuName: '',
        order: '',
        status: '',
        superiorName: '',
        superiorId: '',
        url: '',
        id: ''
      },
      vaildFormContent: {
        menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        order: [{ required: true, message: '请选择排序', trigger: 'blur' }],
        status: [{ required: true, message: '请选择菜单状态', trigger: 'blur' }],
        // superiorName: [{ required: true, message: '请输入菜单名称', trigger: 'change' }],
        url: [{ required: true, message: '请输入链接', trigger: 'blur' }]
      },
      menuFormStatus: false,
      thData: [
        // { name: '菜单编号', indexs: 'id' },
        { name: '菜单名称', indexs: 'menuName' },
        { name: '上级菜单', indexs: 'superiorName' },
        { name: '链接', indexs: 'url' },
        { name: '状态', indexs: 'statusStr' },
        { name: '排序', indexs: 'sequence' },
        { name: '操作', indexs: 'operation' }
      ],
      tableData: [],
      total: 0,
      formMenuList: []
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.titleMenu === '新增菜单') {
            console.log(this.form)
            addMenu(this.form).then(res => {
              if (res.code === 0) {
                this.dialogVisible = false
                AlertBox('success', '新增成功！')
                this.getMenuList()
              }
            })
          } else {
            editMenu(this.form).then(res => {
              if (res.code === 0) {
                this.dialogVisible = false
                AlertBox('success', '修改成功！')
                this.getMenuList()
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    AddRole() {
      this.titleMenu = '新增菜单'
      this.dialogVisible = true
      this.form = {
        menuName: '',
        order: '',
        status: '',
        superiorName: '',
        superiorId: '',
        url: '',
        id: ''
      }
    },
    changeSuperior() {
      if (this.form.superiorId === '') {
        this.form.superiorName = ''
      } else {
        this.tableData.forEach(list => {
          if (this.form.superiorId === list.id) {
            this.form.superiorName = list.menuName
          }
        })
      }
    },
    editRole(type, data) {
      if (type === 'delete') {
        this.deleteMenus(data)
      } else {
        this.titleMenu = '修改菜单'
        this.dialogVisible = true
        setTimeout(() => {
          this.$refs['menuModal'].resetFields()
          this.form = {
            menuName: data.menuName,
            order: data.sequence,
            status: data.status,
            superiorName: data.superiorName,
            superiorId: data.superiorId,
            url: data.url,
            id: data.id
          }
        }, 10)
      }
    },
    deleteMenus(data) {
      this.$confirm('是否确定删除该菜单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteMenu({ id: data.id }).then(res => {
          this.dialogVisible = false
          AlertBox('success', '删除成功！')
          this.getMenuList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    getMenuList() {
      menuList().then(res => {
        res.data.forEach(list => {
          list.statusStr = list.status === 1 ? '<span class="font-green">显示</span>' : '隐藏'
          list.operation = [{ name: '修改', clickEvent: 'edit' }, { name: '删除', clickEvent: 'delete' }]
        })
        this.total = res.total
        this.tableData = res.data
        this.formMenuList = res.data
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

.menu-list {
  .el-table__body td:nth-child(3) {
    color: #0266d6;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #757575;
  }

  .el-radio__input.is-checked .el-radio__inner {
    background-color: #455a64;
    border-color: #455a64;
  }
}

</style>
