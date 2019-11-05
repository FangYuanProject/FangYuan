<template>
  <div class="school-list">
    <h2 class="title">学校列表</h2>
    <el-form ref="ruleForm" :model="ruleForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="学校ID" prop="newId">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="学校代码" prop="schoolCode">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="学校名称" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="地区" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="特性" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="新建时间" prop="region">
        <el-date-picker
          v-model="ruleForm.region"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="热度" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="状态" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <search-form-btn />
        <add-method-btn name="学校" @click="addSchool" />
      </el-form-item>
    </el-form>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
      @click="publishOrOutSell"
      @cell-click="editSchool"
    />
    <el-dialog :title="modalTitle" :visible.sync="dialogVisible" width="508px" class="add-school-modal">
      <el-form ref="modalForm" :model="modalForm" :rules="rules">
        <el-form-item label="校徽">
          <span class="school-head">
            <img src="@/assets/schoolBadge@1x.png">
          </span>
          <div style="display: inline-block; margin-top: 10px; vertical-align: top;">
            <upload-pic-btn upload-tips="大小不得大于5M" btn-name="上传校徽" @click="uploadSchoolBadge" />
          </div>

        </el-form-item>
        <el-form-item label="学校代码" prop="code">
          <el-input v-model="modalForm.code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学校名称" class="active-origin" prop="name">
          <el-input v-model="modalForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="所在地区" class="score-input" prop="region">
          <el-select v-model="modalForm.region" placeholder="请选择">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="特性" class="score-input" prop="region">
          <el-select v-model="modalForm.region" placeholder="请选择">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="edit-data-btn" @click="submitForm('modalForm')">
          <span>保存</span>
        </el-button>
        <el-button type="primary" class="submit-data-btn" @click="submitForm('modalForm')">
          <span class="iconfont iconfabu">发布</span>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import SearchFormBtn from '@/components/SearchFormBtn'
import UploadPicBtn from '@/components/UploadPictureBtn'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn,
    UploadPicBtn
  },
  data() {
    return {
      tableOperation: [
        { name: '发布', clickEvent: 'changeRole' },
        { name: '下架', clickEvent: 'changeRole' }
      ],
      modalTitle: '新增学校',
      status: 'add',
      rules: {
        name: [
          { required: true, message: '请输入学校名称', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择所在区域', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入学校代码', trigger: 'blur' }
        ]

      },
      dialogVisible: false,
      ruleForm: {
        name: '',
        region: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      modalForm: {
        name: '',
        code: '',
        region: ''
      },
      thData: [
        { name: '学校ID', indexs: 'id' },
        { name: '学校代码', indexs: 'schoolCode' },
        { name: '学校名称', indexs: 'title' },
        { name: '地区', indexs: 'pone' },
        { name: '特性', indexs: 'pone' },
        { name: '新建时间', indexs: 'publish' },
        { name: '热度', indexs: 'undercarriage' },
        { name: '状态', indexs: 'undercarriage' }
      ],
      tableData: [
        {
          id: '0001',
          schoolCode: '56789',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员'
        },
        {
          id: '0001',
          schoolCode: '56789',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员'
        },
        {
          id: '0001',
          schoolCode: '56789',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员'
        }
      ]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
    },
    addSchool() {
      this.dialogVisible = true
      this.status = 'add'
      this.modalTitle = '新增学校'
    },
    uploadSchoolBadge(file) {
      console.log(file)
    },
    publishOrOutSell(data) {
      this.dialogVisible = false
      const title = data.name === '发布' ? '是否发布该学校' : '是否确认将该学校下架'
      const successTip = data.name === '发布' ? '发布' : '下架'
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功' + successTip
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消' + successTip
        })
      })
    },
    editSchool(row, column) {
      console.log(column)
      if (column.label === '学校ID') {
        this.dialogVisible = true
        this.modalTitle = '编辑学校'
        this.status = 'edit'
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

.add-school-modal {
  .school-head {
    display: inline-block;
    width: 70px;
    height: 70px;
    line-height: 85px;
    text-align: center;
    vertical-align: middle;

    img {
      width: 52px;
      height: 52px;
    }
  }

  .tips {
    font-size: 12px;
    color: rgba(207, 207, 207, 1);
  }
}
</style>

<style lang='scss'>
/* 修改elemnt-ui样式 */
.list-ruleForm .el-input--medium .el-input__inner {
  width: 170px;
  height: 40px;
}

.add-school-modal {
  .el-form-item.el-form-item--medium {
    margin-right: 0;
    margin-bottom: 20px;
    margin-left: 30px;
  }
}

.school-list .el-table__body tr td:first-child {
  color: #0266d6;
}

</style>
