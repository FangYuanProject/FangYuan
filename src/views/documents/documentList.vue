<template>
  <div class="document-list">
    <h2 class="title">试题列表</h2>
    <el-form ref="ruleForm" :model="searchForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="试题ID" prop="id">
        <el-input v-model="searchForm.id" />
      </el-form-item>
      <el-form-item label="试题名称" prop="testName">
        <el-input v-model="searchForm.testName" />
      </el-form-item>
      <el-form-item label="试题类型" prop="type">
        <el-select v-model="searchForm.type" placeholder="请选择">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="学校" prop="university">
        <el-select v-model="searchForm.university" filterable placeholder="请选择" :remote-method="remoteMethodSchool" @change="selectSchool">
          <el-option v-for="(item,index) in searchOptions.university" :key="item+index" :label="item.universityName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="学院" prop="college">
        <el-select v-model="searchForm.college" placeholder="请选择">
          <el-option v-for="(item,index) in searchOptions.colleges" :key="item+index" :label="item.collegeName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-select v-model="searchForm.major" placeholder="请选择">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="科目" prop="subject">
        <el-select v-model="searchForm.subject" placeholder="请选择">
          <el-option label="普通角色1" value="shanghai" />
          <el-option label="普通角色2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="年份" prop="year">
        <el-date-picker
          v-model="searchForm.year"
          type="year"
          placeholder="选择年"
        />
      </el-form-item>
      <el-form-item label="上传时间" prop="uploadTime">
        <el-date-picker
          v-model="uploadTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <StatusOptions v-model="searchForm.status" is-inline="inline" prop="status" @change="selectStatus" />
      <el-form-item>
        <search-form-btn />
        <add-method-btn name="试题" @click="addDocument" />
      </el-form-item>
    </el-form>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :total="total"
      @click="operationCell"
      @cell-click="editDocument"
    />
    <el-dialog :title="modalTitle" :visible.sync="dialogVisible" width="508px" class="add-document-modal" :close-on-click-modal="false">
      <el-form ref="modalForm" :model="modalForm" :rules="ruleForm">
        <el-form-item label="试题类型" prop="type">
          <el-select v-model="modalForm.type" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="试题名称" prop="testName">
          <el-input v-model="modalForm.ntestNameame" autocomplete="off" />
        </el-form-item>
        <el-form-item label="试题描述" prop="describe">
          <el-input v-model="modalForm.describe" type="textarea" autocomplete="off" rows="5" />
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-select v-model="modalForm.university" filterable placeholder="请选择" :remote-method="remoteMethodSchool" @change="modalSelectSchool">
            <el-option v-for="(item,index) in searchOptions.university" :key="item+index" :label="item.universityName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="学院" prop="college">
          <el-select v-model="modalForm.college" placeholder="请选择">
            <el-option v-for="(item,index) in searchOptions.colleges" :key="item+index" :label="item.collegeName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-select v-model="modalForm.major" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="科目" prop="subject">
          <el-select v-model="modalForm.subject" placeholder="请选择" class="modal-select">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-date-picker
            v-model="modalForm.year"
            type="year"
            placeholder="选择年"
          />
        </el-form-item>
        <!-- <el-form-item label="上传试题" prop="doc">
          <el-input v-model="modalForm.answerId" placeholder="支持扩展名pdf,jpg">
            <template slot="append">
              <upload-pic-btn btn-name="上传" @click="uploadDocument" />
            </template>
          </el-input>
        </el-form-item> -->
        <el-form-item label="上传答案" prop="answerId">
          <el-input v-model="modalForm.answerName" placeholder="支持扩展名pdf,jpg">
            <template slot="append">
              <upload-pic-btn btn-name="上传" @getUrlSuccess="uploadDocumentAnswer" />
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
import StatusOptions from '@/components/StatusOptions'
import UploadPicBtn from '@/components/UploadPictureBtn'
import { addTest, delTest, testDetail, editTest, publishTest, testList, outsellTest } from '@/api/index'
import { schoolList, collegeSearch } from '@/api/secIndex'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn,
    UploadPicBtn,
    StatusOptions
  },
  data() {
    return {
      dialogVisible: false,
      modalTitle: '新建试题',
      status: 'add',
      searchForm: {
        id: '',
        college: '',
        major: '',
        page: 1,
        pageSize: 20,
        testName: '',
        subject: '',
        type: '',
        university: '',
        uploadTime: '',
        year: ''
      },
      searchOptions: {
        university: [],
        colleges: [],
        // 避免查询数据相互影响，增加mdoal学校，学院字段
        modalUniverity: [],
        modalcolleges: []
      },
      uploadTime: '', // 处理查询上传时间格式
      modalForm: {
        major: '',
        questionHash: '',
        college: '',
        describe: '',
        questionId: '',
        subject: '',
        testName: '',
        type: '',
        university: '',
        year: '',
        answerId: '',
        answerHash: '',
        answerName: ''
      },

      ruleForm: {
        testName: [
          { required: true, message: '请输入试题名称', trigger: 'blur' }
        ],
        university: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ],
        describe: [
          { required: true, message: '请输入试题描述', trigger: 'blur' }
        ],
        college: [
          { required: true, message: '请选择学院', trigger: 'change' }
        ],
        major: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ],
        subject: [
          { required: true, message: '请选择科目', trigger: 'change' }
        ],
        year: [
          { required: true, message: '请选择年份', trigger: 'change' }
        ],
        answerId: [
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
        { name: '操作', indexs: 'publishOrUndercarriage' }
      ],
      tableData: [],
      total: 0
    }
  },
  mounted() {
    this.getTestList()
    this.getSchoolList()
  },
  methods: {
    selectSchool(data) {
      collegeSearch({ universityId: data }).then(res => {
        this.searchOptions.colleges = res.data
      })
    },
    modalSelectSchool(id) {
      collegeSearch({ universityId: id }).then(res => {
        this.searchOptions.modalcolleges = res.data
      })
    },
    selectStatus(val) {
      this.searchForm.status = val
    },
    remoteMethodSchool() {},
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
    uploadDocumentAnswer(file) {
      console.log(file)
      this.modalForm.answerId = file.data.id
      this.modalForm.answerHash = file.data.path
      this.modalForm.answerName = file.data.name
    },
    operationCell(type, data) {
      if (type.name === '下载') {
        console.log('xaiza')
      } else if (type.name === '答案') {
        console.log('答案')
      } else if (type.name === '下架') {
        console.log('下加')
      } else {
        console.log('fabu')
      }
      console.log(data)
    },
    editDocument(row, colum) {
      if (colum.label === '试题ID') {
        this.dialogVisible = true
        this.status = 'edit'
        this.modalTitle = '编辑试题'
      }
    },
    getTestList() {
      this.searchForm.uploadTime = this.uploadTime ? this.uploadTime[0] + '~' + this.uploadTime[1] : ''
      testList(this.searchForm).then(res => {
        this.tableData = res.data
        this.total = res.total
      })
    },
    getSchoolList() {
      schoolList({ page: 1, pageSize: 20 }).then(res => {
        this.searchOptions.university = res.data
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
