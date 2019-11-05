<template>
  <div class="document-list">
    <h2 class="title">试题列表</h2>
    <el-form ref="ruleForm" :model="searchForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="试题ID" prop="newId">
        <el-input v-model="searchForm.name" />
      </el-form-item>
      <el-form-item label="试题名称" prop="title">
        <el-input v-model="searchForm.name" />
      </el-form-item>
      <el-form-item label="试题类型" prop="region">
        <el-select v-model="searchForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="学校" prop="region">
        <el-select v-model="searchForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="学院" prop="region">
        <el-select v-model="searchForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="专业" prop="region">
        <el-select v-model="searchForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="科目" prop="region">
        <el-select v-model="searchForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="年份" prop="region">
        <el-select v-model="searchForm.region" placeholder="请选择活动区域">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="上传时间" prop="region">
        <el-date-picker
          v-model="searchForm.region"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="状态" prop="region">
        <el-select v-model="searchForm.region" placeholder="请选择">
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
      @click="operationCell"
      @cell-click="editDocument"
    />
    <el-dialog :title="modalTitle" :visible.sync="dialogVisible" width="508px" class="add-document-modal">
      <el-form ref="modalForm" :model="modalForm" :rules="ruleForm">
        <el-form-item label="试题类型" prop="type">
          <el-select v-model="modalForm.region" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="试题名称" prop="name">
          <el-input v-model="modalForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="试题描述" prop="desc">
          <el-input v-model="modalForm.name" type="textarea" autocomplete="off" rows="5" />
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-select v-model="modalForm.region" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-select v-model="modalForm.region" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="pro">
          <el-select v-model="modalForm.region" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="科目" prop="subject">
          <el-select v-model="modalForm.region" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-select v-model="modalForm.region" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="上传试题" prop="doc">
          <el-input v-model="modalForm.region" placeholder="支持扩展名pdf,jpg">
            <template slot="append">
              <upload-pic-btn btn-name="上传" @click="uploadDocument" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="上传答案" prop="answer">
          <el-input placeholder="支持扩展名pdf,jpg">
            <template slot="append">
              <upload-pic-btn btn-name="上传" @click="uploadDocumentAnswer" />
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div v-if="status==='add'">
          <el-button type="primary" class="edit-data-btn" @click="submitForm('modalForm')">
            保存
          </el-button>
          <el-button type="primary" class="submit-data-btn" @click="submitForm('modalForm')">
            <span class="iconfont iconfabu">&nbsp;发布</span>
          </el-button>
        </div>
        <div v-else>
          <el-button class="del-document" @click="delDocument('modalForm')">
            删除
          </el-button>
          <el-button type="primary" class="edit-data-btn" @click="submitForm('modalForm')">
            更新
          </el-button>
          <el-button type="primary" class="submit-data-btn" @click="submitForm('modalForm')">
            <span class="iconfont iconxiajia">&nbsp;下架</span>
          </el-button>

        </div>
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
      tableOperation: [{ name: '下载' }, { name: '答案' }, { name: '下架' }, { name: '发布' }],
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
      ruleForm: {
        name: [
          { required: true, message: '请输入试题名称', trigger: 'blur' }
        ],
        school: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入试题描述', trigger: 'blur' }
        ],
        college: [
          { required: true, message: '请选择学院', trigger: 'change' }
        ],
        pro: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ],
        subject: [
          { required: true, message: '请选择科目', trigger: 'change' }
        ],
        year: [
          { required: true, message: '请选择年份', trigger: 'change' }
        ],
        doc: [
          { required: true, message: '请上传试题', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择试题类型', trigger: 'change' }
        ]
      },
      thData: [
        { name: '试题ID', indexs: 'id' },
        { name: '试题名称', indexs: 'title' },
        { name: '学校', indexs: 'pone' },
        { name: '学院', indexs: 'pone' },
        { name: '专业', indexs: 'pone' },
        { name: '科目', indexs: 'email' },
        { name: '年份', indexs: 'publish' },
        { name: '上传时间', indexs: 'undercarriage' },
        { name: '操作', indexs: 'publishOrUndercarriage'}
      ],
      tableData: [
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员',
          publishOrUndercarriage: '1'
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员',
          publishOrUndercarriage: '0'
        },
        {
          id: '0001',
          title: '新闻标题1',
          pone: '18825055554',
          email: '1758265002@qq.com',
          publish: '2019-10-21 10:00',
          undercarriage: '普通管理员',
          publishOrUndercarriage: '0'
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
    addDocument() {
      this.dialogVisible = true
      this.status = 'add'
      this.modalTitle = '新建试题'
    },
    delDocument() {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    uploadDocument() {

    },
    uploadDocumentAnswer() {

    },
    operationCell(data) {
      if (data.name === '下载') {
        console.log('xaiza')
      } else if (data.name === '答案') {
        console.log('答案')
      } else if (data.name === '下架') {
        console.log('下加')
      } else {
        console.log('fabu')
      }
    },
    editDocument(row, colum) {
      if (colum.label === '试题ID') {
        this.dialogVisible = true
        this.status = 'edit'
        this.modalTitle = '编辑试题'
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

.document-list .el-table__body tr td:first-child {
  color: #0266d6;
}

.document-list .del-document {
  width: 88px;
  height: 40px;
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
}

</style>
