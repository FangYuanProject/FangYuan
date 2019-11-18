<template>
  <div class="menu-list">
    <h2 class="title">菜单列表</h2>
    <add-method-btn name="菜单" style="float: right; margin-right: 30px;" @click="AddRole" />

    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :total="total"
      cell-color="#1EAB00"
      @handleClick="editRole"
    />
    <el-dialog title="权限" :visible.sync="dialogVisible" width="508px" class="edit-menu-modal" :close-on-click-modal="false">
      <el-form ref="menuModal" :model="form" :rules="vaildFormContent">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="form.menuName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="上级菜单" class="active-origin" prop="superiorName">
          <el-select v-model="form.superiorName" placeholder="请选择" class="menu-sort">
            <el-option v-for="(item,index) in formMenuList" :key="item+index" :label="item.menuName" :value="item.menuName" />

          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input v-model="form.order" autocomplete="off" />
        </el-form-item>
        <el-form-item label="菜单url" prop="url">
          <el-input v-model="form.url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="form.status" label="1">显示</el-radio>
          <el-radio v-model="form.status" label="0">隐藏</el-radio>
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
      form: {
        menuName: '',
        order: '',
        status: '',
        superiorName: '',
        url: '',
        id: ''
      },
      vaildFormContent: {
        menuName: [{ requied: true, message: '请输入菜单名称', trigger: 'blur' }],
        order: [{ requied: true, message: '请选择排序', trigger: 'blur' }],
        status: [{ requied: true, message: '请选择菜单状态', trigger: 'blur' }],
        superiorName: [{ requied: true, message: '请输入菜单名称', trigger: 'change' }],
        url: [{ requied: true, message: '请输入链接', trigger: 'blur' }]
      },
      menuFormStatus: false,
      thData: [
        { name: '菜单编号', indexs: 'id' },
        { name: '菜单名称', indexs: 'menuName' },
        { name: '上级菜单', indexs: 'superior' },
        { name: '链接', indexs: 'url' },
        { name: '状态', indexs: 'status' },
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
          editMenu(this.form).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.dialogVisible = false
              AlertBox('success', '保存成功')
              this.getMenuList()
            }
          })
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
      console.log('123')
      this.dialogVisible = true
      this.form = {
        menuName: '',
        order: '',
        status: '',
        superiorName: '',
        url: '',
        id: ''
      }
      console.log(this.form)
    },
    editRole(type, data) {
      this.dialogVisible = true
      this.form = {
        menuName: data.menuName,
        order: data.sequence,
        status: data.status === '显示' ? '1' : '0',
        superiorName: data.superior,
        url: data.url,
        id: data.id
      }
    },
    changeRoleVisible() {

    },
    getMenuList() {
      menuList().then(res => {
        res.data.forEach(list => {
          list.status = list.status === 1 ? '显示' : '隐藏'
          list.operation = [{ name: '修改', clickEvent: 'edit' }]
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
  .el-table__row td:first-child,
  .has-gutter th:first-child {
    display: none;
  }

  .el-table__body td:nth-child(4) {
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
