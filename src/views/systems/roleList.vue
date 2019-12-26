<template>
  <div class="course-list">
    <h2 class="title">角色列表</h2>
    <add-method-btn name="角色" style="float: right; margin-right: 30px;" @click="AddRole" />

    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :total="tableData.length"
      :show-pages="false"
      @handleClick="chooseOperation"
    />
    <el-dialog title="权限" :visible.sync="dialogVisible" width="508px" class="add-course-modal">
      <el-form ref="validContent" :model="modal" :rules="vaildFormContent">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input v-model="modal.roleName" autocomplete="off" placeholder="请输入角色名称" />
        </el-form-item>
      </el-form>
      <el-tree
        ref="tree"
        :data="data"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitForm('validContent')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import { AlertBox } from '@/utils/util'
import { addRole, delRole, editRole, detailRole, roleList, menuList } from '@/api/index'
export default {
  components: {
    tableComponents,
    AddMethodBtn
  },
  data() {
    return {
      modal: {
        roleName: '', // 弹窗角色名称
        roleCode: '' // 编辑时需要角色的code
      },
      vaildFormContent: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      },
      thData: [{ name: '角色', indexs: 'roleName' }, { name: '操作', indexs: 'operation' }],
      tableData: [],
      newOrEdit: 1 // 1新增 0修改
    }
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    submitForm(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          const idsArr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
          if (idsArr.length === 0) {
            AlertBox('warning', '请选择菜单权限')
          } else {
            const subData = {
              roleName: this.modal.roleName,
              roleCode: this.modal.roleCode,
              menuId: idsArr
            }
            if (this.newOrEdit === 1) { // 新增
              addRole(subData).then(res => {
                AlertBox('success', '新增成功！')
                this.dialogVisible = false
                this.getRoleList()
              })
            } else { // 编辑
              editRole(subData).then(res => {
                // this.$refs[data].resetFields()
                AlertBox('success', '编辑成功！')
                this.dialogVisible = false
                this.getRoleList()
              })
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    AddRole() {
      this.newOrEdit = 1
      this.getMenuTree()
      this.modal.roleName = ''
      this.modal.roleCode = ''
      this.dialogVisible = true
      // this.$refs['validContent'].resetFields()
    },
    setCheckedNodes(data) {
      this.$refs.tree.setCheckedNodes(data)
    },
    // 编辑
    editRole(data) {
      this.newOrEdit = 0
      this.getMenuTree(1)
      this.modal.roleName = data.roleName
      this.modal.roleCode = data.roleCode
      this.dialogVisible = true
    },
    getMenuTree(setDefault) {
      menuList().then(res => {
        // 递归组成数组
        this.data = this.getMenuArr(res.data, null)
        if (setDefault) {
          detailRole({ roleCode: this.modal.roleCode }).then(resUser => {
            const defaultArr = []
            resUser.data.menuIds.forEach(edit => {
              res.data.forEach(list => {
                if (edit === list.id) {
                  defaultArr.push(list)
                }
              })
            })
            this.setCheckedNodes(defaultArr)
          })
        }
      })
    },
    getMenuArr(menuList, parentId) {
      const that = this
      const arr = []
      let temp
      menuList.forEach(list => {
        const obj = list
        if (list.superiorId === parentId) { // 第二级别（最高级）
          temp = that.getMenuArr(menuList, list.id)
          if (temp.length > 0) {
            obj.children = temp
          }
          arr.push(obj)
        }
      })
      return arr
    },
    getRoleList() {
      roleList().then(res => {
        res.data.forEach(list => {
          list.operation = [{ name: '编辑', clickEvent: 'limit' }, { name: '删除', clickEvent: 'deleteRole' }]
        })
        this.tableData = res.data
      })
    },
    chooseOperation(type, data) {
      if (type === 'limit') {
        // 权限操作,打开弹窗
        this.editRole(data)
      } else {
        this.$confirm('是否确定删除该角色？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          delRole({ roleCode: data.roleCode }).then(res => {
            AlertBox('success', '删除成功！')
            this.getRoleList()
          })
        })
      }
    },
    validLength(rule, value, callback) {
      if (value && value.length > 16) {
        callback(new Error('不能超过16个字符！'))
      }
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

.font-red {
  color: red;
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

.current-role {
  display: inline-block;
  width: 100%;
  margin-bottom: 30px;
  font-size: 14px;
  color: #202431;

  .el-input {
    display: inline-block;
  }
}

.course-list .el-dialog__body .el-form-item__label {
  width: 100px;
}

.course-list .el-dialog__body .el-input {
  width: 78%;
}
</style>
