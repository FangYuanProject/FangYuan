<template>
  <div class="document-list">
    <h2 class="title">试题列表</h2>
    <el-form ref="ruleForm" :model="searchForm" label-width="70px" inline class="list-ruleForm">
      <el-form-item label="试题ID" prop="id">
        <el-input v-model="searchForm.id" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="试题名称" prop="testName">
        <el-input v-model="searchForm.testName" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="试题类型" prop="type">
        <el-select v-model="searchForm.type" placeholder="请选择">
          <el-option v-for="(item,index) in searchOptions.typeOptions" :key="item+index" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="学校" prop="universityName">
        <el-select v-model="searchForm.universityName" filterable placeholder="请选择" :remote-method="remoteMethodSchool" @change="selectSchool">
          <el-option v-for="(item,index) in searchOptions.university" :key="item+index" :label="item.universityName" :value="item.universityName" />
        </el-select>
      </el-form-item>
      <el-form-item label="学院" prop="collegeName">
        <el-select v-model="searchForm.collegeName" placeholder="请选择" @change="selectCollege">
          <el-option v-for="(item,index) in searchOptions.colleges" :key="item+index" :label="item.collegeName" :value="item.collegeName" />
        </el-select>
      </el-form-item>
      <el-form-item label="专业" prop="majorName">
        <el-select v-model="searchForm.majorName" placeholder="请选择">
          <el-option v-for="(item,index) in searchOptions.majorOptions" :key="item+index" :label="item.majorName" :value="item.majorName" />
        </el-select>
      </el-form-item>
      <el-form-item label="科目" prop="subject">
        <el-input v-model="searchForm.subject" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="年份" prop="year">
        <el-date-picker
          v-model="searchForm.year"
          type="year"
          placeholder="选择年份"
        />
      </el-form-item>
      <el-form-item label="上传时间" prop="uploadTime">
        <el-date-picker
          v-model="searchForm.uploadTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="searchForm.status" placeholder="请选择">
          <el-option v-for="(item,index) in searchOptions.statusOptions" :key="item+index" :label="item.value" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <search-form-btn @click="searchTestList" />
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <add-method-btn name="试题" @click="addDocument" />
      </el-form-item>
    </el-form>
    <tableComponents
      :table-data="tableData"
      :th-data="thData"
      :total="total"
      @handleClick="operationCell"
      @cell-click="editDocument"
      @pagination="changePage"
    />
    <el-dialog :title="modalTitle" :visible.sync="dialogVisible" width="508px" class="add-document-modal" :close-on-click-modal="false">
      <el-form ref="modalForm" :model="modalForm" :rules="ruleForm">
        <el-form-item label="试题类型" prop="type">
          <el-select v-model="modalForm.type" placeholder="请选择" class="modal-select">
            <el-option v-for="(item,index) in searchOptions.typeOptions" :key="item+index+10" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="试题名称" prop="testName">
          <el-input v-model="modalForm.testName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="试题描述" prop="describe">
          <el-input v-model="modalForm.describe" type="textarea" autocomplete="off" rows="5" />
        </el-form-item>
        <el-form-item label="学校" prop="universityName">
          <el-select v-model="modalForm.university" filterable placeholder="请选择" :remote-method="remoteMethodSchool" @change="selectSchool">
            <el-option v-for="(item,index) in searchOptions.university" :key="item+index" :label="item.universityName" :value="item.universityName" />
          </el-select>
        </el-form-item>
        <el-form-item label="学院" prop="collegeName">
          <el-select v-model="modalForm.college" placeholder="请选择" @change="selectCollege">
            <el-option v-for="(item,index) in searchOptions.colleges" :key="item+index" :label="item.collegeName" :value="item.collegeName" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="majorName">
          <el-select v-model="modalForm.major" placeholder="请选择">
            <el-option v-for="(item,index) in searchOptions.majorOptions" :key="item+index" :label="item.majorName" :value="item.majorName" />
          </el-select>
        </el-form-item>
        <el-form-item label="科目" prop="subject">
          <el-input v-model="modalForm.subject" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="年份" prop="year">
          <el-date-picker
            v-model="modalForm.year"
            type="year"
            placeholder="选择年"
            value-format="yyyy"
          />
        </el-form-item>
        <el-form-item label="上传试题" prop="questionName">
          <el-input v-model="modalForm.questionName" placeholder="支持扩展名pdf,jpg">
            <template slot="append">
              <upload-pic-btn btn-name="上传" :upload-type="uploadType" @getUrlSuccess.native="uploadDocument" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="上传答案" prop="answerName">
          <el-input v-model="modalForm.answerName" placeholder="支持扩展名pdf,jpg">
            <template slot="append">
              <upload-pic-btn btn-name="上传" :upload-type="uploadType" @getUrlSuccess.native="uploadDocumentAnswer" />
            </template>
          </el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <div v-if="status==='add'">
          <el-button type="primary" class="edit-data-btn" @click="submitForm('modalForm','save')">
            保存
          </el-button>
          <el-button type="primary" class="submit-data-btn" @click="submitForm('modalForm','publish')">
            <span class="iconfont iconfabu">&nbsp;发布</span>
          </el-button>
        </div>
        <div v-else>
          <el-button class="del-document" @click="delDocument('modalForm')">
            删除
          </el-button>
          <el-button type="primary" class="edit-data-btn" @click="submitForm('modalForm','update')">
            更新
          </el-button>
          <el-button type="primary" class="submit-data-btn" @click="outSell('modalForm')">
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
import { addTest, delTest, testDetail, editTest, publishTest, testList, outsellTest, testStatus, testType, uploadDown, schoolCorrelation, majorList, collegeList } from '@/api/index'
import { AlertBox, dateTimeStr } from '../../utils/util'
export default {
  components: {
    tableComponents,
    AddMethodBtn,
    SearchFormBtn,
    UploadPicBtn
  },
  data() {
    return {
      dialogVisible: false,
      modalTitle: '新建试题',
      status: 'add',
      searchForm: {
        id: '',
        collegeName: '',
        majorName: '',
        page: 1,
        pageSize: 20,
        testName: '',
        subject: '',
        type: '',
        universityName: '',
        uploadTime: '',
        year: ''
      },
      searchOptions: {
        university: [],
        colleges: [],
        // 避免查询数据相互影响，增加mdoal学校，学院字段
        modalUniverity: [],
        modalcolleges: [],
        statusOptions: [],
        typeOptions: [], // 类型
        majorOptions: [] // 专业
      }, // 走接口的select框值
      uploadTime: '', // 处理查询上传时间格式
      modalForm: {
        majorName: '',
        questionHash: '',
        collegeName: '',
        describe: '',
        subject: '',
        testName: '',
        type: '',
        universityName: '',
        year: '',
        answerId: '',
        answerHash: '',
        answerName: '',
        questionId: '',
        questionName: '',
        id: ''
      },
      ruleForm: {
        testName: [
          { required: true, message: '请输入试题名称', trigger: 'blur' }
        ],
        universityName: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ],
        collegeName: [
          { required: true, message: '请选择学院', trigger: 'change' }
        ],
        majorName: [
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

      }, // 判断新增修改的表单是否通过验证
      thData: [
        { name: '试题ID', indexs: 'id' },
        { name: '试题名称', indexs: 'testName' },
        { name: '学校', indexs: 'university' },
        { name: '学院', indexs: 'college' },
        { name: '专业', indexs: 'major' },
        { name: '科目', indexs: 'subject' },
        { name: '年份', indexs: 'year' },
        { name: '上传时间', indexs: 'uploadTime' },
        { name: '状态', indexs: 'status' },
        { name: '操作', indexs: 'operation' }
      ],
      tableData: [],
      total: 0,
      universityId: '', // 记录选中的学校id
      collegeId: '', // 记录选中的学院id
      uploadType: 'PRIVATE', // 判断文件上传类型
      findSchoolItem: {}, // 通过学校编号查找学校信息
      findCollegeItem: {} // 通过id查找学院信息
    }
  },
  mounted() {
    this.getTestList()
    this.getSchoolList()
    this.getSearchOption()
  },
  methods: {
    selectSchool(data) {
      this.findSchool(data)
      setTimeout(() => {
        collegeList({ universityCode: this.findSchoolItem.universityCode }).then(res => {
          this.searchOptions.colleges = res.data
        })
      }, 50)
    },
    selectCollege(data) {
      this.findCollege(data)
      setTimeout(() => {
        majorList({ collegeId: this.findCollegeItem.collegeId, universityId: this.findSchoolItem.universityCode }).then(res => {
          this.searchOptions.majorOptions = res.data
        })
      }, 50)
    },
    changePage(pageData) {
      this.searchForm.page = pageData.page
      this.searchForm.pageSize = pageData.limit
      this.getTestList()
    },
    searchTestList() {
      this.searchForm.page = 1
      this.searchForm.pageSize = 20
      this.getTestList()
    },
    selectStatus(val) {
      this.searchForm.status = val
    },
    remoteMethodSchool(data) {
      this.getTestList()
      console.log(data)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type === 'save') {
            addTest(this.modalForm).then(res => {
              this.dialogVisible = false
              AlertBox('success', '保存成功')
              this.getTestList()
            })
          } else if (type === 'publish') {
            publishTest(this.modalForm).then(res => {
              this.dialogVisible = false
              AlertBox('success', '发布成功')
              this.getTestList()
            })
          } else if (type === 'update') {
            editTest(this.modalForm).then(res => {
              this.dialogVisible = false
              AlertBox('success', '发布成功')
              this.getTestList()
            })
          }
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
      setTimeout(() => {
        this.$refs['modalForm'].resetFields()
      }, 10)
    },
    delDocument() {
      delTest({ id: this.modalForm.id }).then(res => {
        this.dialogVisible = false
        AlertBox('success', '删除成功')
        this.getTestList()
      })
    },
    getSearchOption() {
      testStatus().then(res => {
        this.searchOptions.statusOptions = res.data
      })
      testType().then(res => {
        this.searchOptions.typeOptions = res.data
      })
    },
    uploadDocumentAnswer(file) {
      console.log(file)
      this.modalForm.answerId = file.data.id
      this.modalForm.answerHash = file.data.path
      this.modalForm.answerName = file.data.name
    },
    uploadDocument(file) {
      this.modalForm.questionId = file.data.id
      this.modalForm.questionHash = file.data.path
      this.modalForm.questionName = file.data.name
    },
    operationCell(type, data) {
      console.log(data)
      if (type === 'download') {
        uploadDown({ id: data.questionId, hash: data.questionHash })
      } else if (type === 'answer') {
        uploadDown({ id: data.answerId, hash: data.answerHash })
      } else if (type === 'publish') {
        publishTest({ id: data.id }).then(res => {
          AlertBox('success', '发布成功')
          this.getTestList()
        })
      } else {
        this.outSell('', data.id)
      }
    },
    editDocument(row, colum) {
      if (colum.label === '试题ID') {
        this.dialogVisible = true
        this.status = 'edit'
        this.modalTitle = '编辑试题'
        testDetail({ id: row.id }).then(res => {
          this.universityId = Number(res.data.university)
          this.modalForm = {
            major: Number(res.data.major),
            questionHash: res.data.questionHash,
            college: Number(res.data.college),
            describe: '',
            subject: res.data.subject,
            testName: res.data.testName,
            type: res.data.type.key,
            university: Number(res.data.university),
            year: res.data.year,
            answerId: res.data.answerId,
            answerHash: res.data.answerHash,
            answerName: res.data.answerName,
            questionId: res.data.questionId,
            questionName: res.data.questionName,
            id: row.id
          }
          this.selectSchool(Number(res.data.university))
          this.selectCollege(Number(res.data.college))
        })
      }
    },
    getTestList() {
      this.searchForm.uploadTime = this.uploadTime ? this.uploadTime[0] + '~' + this.uploadTime[1] : ''
      testList(this.searchForm).then(res => {
        res.data.forEach(list => {
          list.uploadTime = dateTimeStr(list.uploadTime)
          list.status = list.status.value
          list.operation = [{ name: '下载', clickEvent: 'download' }, { name: '答案', clickEvent: 'answer' }]
          switch (list.status) {
            case '新增':
            case '下架':
              list.operation.push({ name: '发布', clickEvent: 'publish' })
              break
            case '发布':
              list.operation.push({ name: '下架', clickEvent: 'outsell' })
              break
          }
        })
        this.tableData = res.data
        this.total = res.total
        if (this.$refs['modalForm']) {
          this.$refs['modalForm'].resetFields()
        }
      })
    },
    getSchoolList() {
      schoolCorrelation({ page: 1, pageSize: 20,universityName:'' }).then(res => {
        this.searchOptions.university = res.data
      })
    },
    outSell(formName, id) {
      if (this.modalForm.id !== '') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            outsellTest({ id: this.modalForm.id }).then(res => {
              AlertBox('success', '下架成功')
              this.getTestList()
              this.dialogVisible = false
            })
          }
        })
      } else {
        outsellTest({ id: id }).then(res => {
          AlertBox('success', '下架成功')
          this.getTestList()
        })
      }
    },
    // 根据名字查询当前选择的学校信息
    findSchool(data) {
      this.findSchoolItem = this.searchOptions.university.filter((item) => {
        return item.universityName === data
      })
    },
    findCollege(data) {
      this.findCollegeItem = this.searchOptions.colleges.filter((item) => {
        return item.collegeName === data
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
