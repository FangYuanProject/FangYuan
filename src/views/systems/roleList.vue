<template>
  <div class="course-list">
    <h2 class="title">角色列表</h2>
    <add-method-btn name="角色" @click="AddRole" style="float:right;margin-right:30px"></add-method-btn>

    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
      :dialog-type="changeRoleVisible"
      @click="editRole"
    />
    <el-dialog title="权限" :visible.sync="dialogVisible" width="508px" class="add-course-modal">
      
      <span class="current-role">角色名称：管理员</span>
       <el-tree
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps">
        </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableComponents from "@/components/tableComponents";
import AddMethodBtn from "@/components/AddMethodBtn";
export default {
  components: {
    tableComponents,
    AddMethodBtn
  },
  data() {
    return {
      tableOperation: [
        { name: "权限", clickEvent: "changeRole" },
        { name: "删除", clickEvent: "changeRole" }
      ],
      dialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
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
      thData: [{ name: "角色", indexs: "title" }],
      tableData: [
        {
          title: "新闻标题1"
        },
        {
          title: "新闻标题1"
        },
        {
          title: "新闻标题1"
        }
      ]
    };
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
      this.$refs[formName].resetFields();
    },
    AddRole() {
      console.log("123");
      this.dialogVisible = true;
    },
    editRole(){
      this.dialogVisible = true;
    },
    changeRoleVisible(){
      
    }
  }
};
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



.add-course-modal .el-dialog__header {
  height: 56px;
  border-bottom: 1px solid #ebeef5;
}

.add-course-modal .el-dialog__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 16px;
  color: rgba(32, 36, 49, 1);
}

.add-course-modal .el-dialog__footer {
  width: 100%;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border-top: 1px solid #ebeef5;
}
.current-role{
  color:#202431;
  font-size:14px;
  display: inline-block;
  margin-bottom:30px;
}
</style>
