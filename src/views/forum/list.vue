<template>
  <div class="forum-list">
    <h2 class="title">论坛列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="帖子ID" prop="newId">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="帖子标题" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="创建人" prop="region">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item>
        <search-form-btn></search-form-btn>
        <add-method-btn name="帖子" @click="addForum"></add-method-btn>
      </el-form-item>
    </el-form>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
      :dialog-type="changeRoleVisible"
      @click="setTop"
    />
    <el-dialog title="发布帖子" width="508px" class="add-document-modal">
      <el-form :model="form">
        <el-form-item label="帖子标题">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="帖子内容">
          <el-input type="textarea" v-model="form.name" autocomplete="off" rows="5" />
        </el-form-item>
        <el-form-item label="上传附件">
          <el-input placeholder="支持扩展名pdf,jpg" v-model="input1">
            <template slot="append">
              <el-button type="primary" class="submit-data-btn">选择</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="下架帖子" :visible.sync="dialogVisible" width="508px" class="add-document-modal">
      <el-form :model="form">
        <el-form-item label="帖子类型">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="帖子标题">
          <el-input type="textarea" v-model="form.name" autocomplete="off" rows="5" />
        </el-form-item>
        <el-form-item label="下架原因">
          <el-input type="textarea" rows="5"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="dialogVisible = false">确定下架</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableComponents from "@/components/tableComponents";
import AddMethodBtn from "@/components/AddMethodBtn";
import SearchFormBtn from "@/components/SearchFormBtn";
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn
  },
  data() {
    return {
      tableOperation: [{ name: "置顶" }, { name: "删除" }, { name: "下架" }],
      dialogVisible: false,

      ruleForm: {
        name: "",
        region: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
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
      thData: [
        { name: "帖子ID", indexs: "id" },
        { name: "帖子标题", indexs: "title" },
        { name: "帖子链接", indexs: "pone" },
        { name: "创建人", indexs: "email" },
        { name: "创建时间", indexs: "publish" }
      ],
      tableData: [
        {
          id: "0001",
          title: "新闻标题1",
          pone: "18825055554",
          email: "1758265002@qq.com",
          publish: "2019-10-21 10:00"
        },
        {
          id: "0001",
          title: "新闻标题1",
          pone: "18825055554",
          email: "1758265002@qq.com",
          publish: "2019-10-21 10:00"
        },
        {
          id: "0001",
          title: "新闻标题1",
          pone: "18825055554",
          email: "1758265002@qq.com",
          publish: "2019-10-21 10:00"
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
    addForum() {
      this.dialogVisible = true;
    },
    setTop() {
      this.dialogVisible = true;
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

.add-new {
  width: 109px;
  height: 40px;
  margin-left: 123px;
  font-size: 14px;
  color: #fff;
  background: rgba(69, 90, 100, 1);
  border-color: rgba(69, 90, 100, 1);
  border-radius: 4px;
}


</style>

<style lang='scss'>
/* 修改elemnt-ui样式 */
.list-ruleForm .el-input--medium .el-input__inner {
  width: 170px;
  height: 40px;
}
.add-forum-modal {
  .el-form-item.el-form-item--medium {
    margin-right: 0;
    margin-bottom: 20px;
    margin-left: 30px;
  }

  .el-form-item--medium .el-form-item__label {
    width: 61px;
    font-size: 14px;
    color: #757575;
  }
}
.forum-list .el-table__body tr td:first-child,
.forum-list .el-table__body tr td:nth-child(3) {
  color: #0266d6;
}
</style>
