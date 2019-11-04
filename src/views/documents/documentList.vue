<template>
  <div class="document-list">
    <h2 class="title">试题列表</h2>
    <el-form ref="ruleForm" :model="searchForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="试题ID" prop="newId">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="试题名称" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="试题类型" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
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
      <el-form-item label="上传时间" prop="region">
        <el-date-picker
          v-model="ruleForm.region"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="状态" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <search-form-btn />
        <add-method-btn name="试题" @click="addDocument" />
      </el-form-item>
    </el-form>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :table-operation="tableOperation"
    />
    <el-dialog :title="modalTitle" :visible.sync="dialogVisible" width="508px" class="add-document-modal">
      <el-form ref="modalForm" :model="modalForm" :rules="ruleForm">
        <el-form-item label="试题类型">
          <el-select v-model="ruleForm.region" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="试题名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="试题描述">
          <el-input v-model="form.name" type="textarea" autocomplete="off" rows="5" />
        </el-form-item>
        <el-form-item label="学校">
          <el-select v-model="ruleForm.region" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="ruleForm.region" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="ruleForm.region" placeholder="请选择" class="modal-select">
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
        <el-form-item label="年份">
          <el-select v-model="ruleForm.region" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="上传试题">
          <el-input placeholder="支持扩展名pdf,jpg">
            <template slot="append">
              <el-button type="primary" class="submit-data-btn">选择</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="上传答案">
          <el-input placeholder="支持扩展名pdf,jpg">
            <template slot="append">
              <el-button type="primary" class="submit-data-btn">选择</el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :class="[status==='edit' ? 'edit-data-btn' : 'submit-data-btn']" @click="submitForm('modalForm')">
          <span v-if="status!=='edit'" class="iconfont iconfabu">&nbsp;发布</span>
          <span v-else>保存</span>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
import AddMethodBtn from '@/components/AddMethodBtn'
import SearchFormBtn from '@/components/SearchFormBtn'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn
  },
  data() {
    return {
      tableOperation: [{ name: '下载' }, { name: '答案' }],
      dialogVisible: false,
      modalTitle: '新建试题',
      status: 'add',
      searchForm: {
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
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      thData: [
        { name: '试题ID', indexs: 'id' },
        { name: '试题名称', indexs: 'title' },
        { name: '学校', indexs: 'pone' },
        { name: '学院', indexs: 'pone' },
        { name: '专业', indexs: 'pone' },
        { name: '科目', indexs: 'email' },
        { name: '年份', indexs: 'publish' },
        { name: '上传时间', indexs: 'undercarriage' }
      ],
      tableData: [
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员'
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员'
        },
        {
          id: '0001',
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

    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addDocument() {
      this.dialogVisible = true
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
}

</style>
