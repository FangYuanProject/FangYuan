<template>
  <div class="document-list">
    <h2 class="title">真题列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="真题ID" prop="newId">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="真题名称" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="学校" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
       <el-form-item label="学院" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
       <el-form-item label="专业" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="科目" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="年份" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <search-form-btn></search-form-btn>
        <add-method-btn name="真题" @click="addDocument"></add-method-btn>
      </el-form-item>
    </el-form>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
      :dialog-type="changeRoleVisible"
    />
    <el-dialog title="上传真题" :visible.sync="dialogVisible" width="508px" class="add-document-modal">
      <el-form :model="form">
        <el-form-item label="真题名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="真题描述">
          <el-input type="textarea" v-model="form.name" autocomplete="off" rows="5"/>
        </el-form-item>
        <el-form-item label="学校">
          <el-select v-model="ruleForm.region" placeholder="请选择"  class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="ruleForm.region" placeholder="请选择"  class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="ruleForm.region" placeholder="请选择"  class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="科目">
           <el-select v-model="ruleForm.region" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="上传真题">
          <el-input placeholder="支持扩展名pdf,jpg" v-model="input1">
          <template slot="append">
             <el-button type="primary" class="submit-data-btn">选择</el-button>
          </template>
        </el-input>
        </el-form-item>
        <el-form-item label="上传答案">
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
      tableOperation: [{name:'发布'},{name:'答案'},{name:'删除'},{name:'编辑'}],
      dialogVisible: false,
      publiceSubjects: [
        "101思想政治理论",
        "201英语一",
        "202俄语",
        "203日语",
        " 204英语二",
        "301数学一",
        "302数学二",
        "303数学三"
      ],
      professionSubjects: [
        "数据结构",
        "操作系统",
        "计算机组成原理",
        "计算机网络",
        " 程序设计",
        " 软件工程",
        "数据库"
      ],
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
        { name: "真题ID", indexs: "id" },
        { name: "真题名称", indexs: "title" },
        { name: "学校", indexs: "pone" },
        { name: "学院", indexs: "pone" },
        { name: "专业", indexs: "pone" },
        { name: "科目", indexs: "email" },
        { name: "年份", indexs: "publish" },
        { name: "上传时间", indexs: "undercarriage" }
      ],
      tableData: [
        {
          id: "0001",
          title: "新闻标题1",
          pone: "18825055554",
          email: "1758265002@qq.com",
          publish: "2019-10-21 10:00",
          undercarriage: "普通管理员"
        },
        {
          id: "0001",
          title: "新闻标题1",
          pone: "18825055554",
          email: "1758265002@qq.com",
          publish: "2019-10-21 10:00",
          undercarriage: "普通管理员"
        },
        {
          id: "0001",
          title: "新闻标题1",
          pone: "18825055554",
          email: "1758265002@qq.com",
          publish: "2019-10-21 10:00",
          undercarriage: "普通管理员"
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
    addDocument() {
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
/* 修改elemnt-ui样式 */
.list-ruleForm .el-input--medium .el-input__inner {
  width: 170px;
  height: 40px;
}

.add-document-modal {
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

.document-list .el-table__body tr td:first-child {
  color: #0266d6;
}
</style>
