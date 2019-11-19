<template>
  <div class="course-list">
    <h2 class="title">角色列表</h2>
    <add-method-btn name="角色" style="float: right; margin-right: 30px;" @click="AddRole" />

    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :total="tableData.length"
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
import { addRole, delRole, editRole, roleList } from '@/api/index'
export default {
  components: {
    tableComponents,
    AddMethodBtn
  },
  data() {
    return {
      modal: {
        roleName: '' // 弹窗角色名称
      },
      vaildFormContent: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
          // { validator: this.validLength(16), trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      thData: [{ name: '角色', indexs: 'value' }, { name: '操作', indexs: 'operation' }],
      tableData: []
    }
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    submitForm(data) {
      this.$refs[data].validate((valid) => {
        debugger
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    AddRole() {
      this.modal.roleName = ''
      this.dialogVisible = true
    },
    editRole(data) {
      this.modal.roleName = data.value
      this.dialogVisible = true
    },
    changeRoleVisible() {

    },
    getRoleList() {
      roleList().then(res => {
        res.data.forEach(list => {
          list.operation = [{ name: '权限', clickEvent: 'limit' }, { name: '删除', clickEvent: 'deleteRole' }]
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
          delRole({ id: data.key }).then(res => {
            AlertBox('success', '删除成功！')
            this.getRoleList()
          })
        })
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
</style>
