<template>
  <div class="school-detail-css">
    <h2 class="title">学校主页</h2>
    <div class="school-content">
      <div class="school">
        <div class="school-logo">
          <img v-if="school && !school.badgeUrl" src="@/assets/schoolBadge@2x.png">
          <img v-if="school && school.badgeUrl" :src="school.badgeUrl">
        </div>
        <UploadPicBtn class="change-badge" bg-color="#455a64" text-color="#fff" btn-name="更换校徽" @getUrlSuccess="changeLogo" />
        <!-- <el-button type="primary" class="change-badge" @click="changeLogo">更换校徽</el-button> -->
      </div>
      <div class="edit-scholl-info">
        <div>
          <span class="school-name">{{ school.universityName }}</span>
          <span class="edit-btn cp" @click="editSchool">编辑资料</span>
        </div>
        <div>
          <p class="lh30">
            <span class="label-name">
              学校代码:
            </span>
            <span class="value-name">
              {{ school.universityCode }}
            </span>
          </p>
          <p class="lh30">
            <span class="label-name">
              所在地区:
            </span>
            <span class="value-name">
              {{ school.location }}
            </span>
          </p>
          <p class="lh30">
            <span class="label-name">
              特性:
            </span>
            <span class="value-name">
              {{ school.property && school.property.value }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="school-content">
      <div class="mb20 w oh">
        <el-button type="primary" class="add-academic fr" @click="showAcademic">+&nbsp;新增学院</el-button>
      </div>
      <ul class="school-tree">
        <li v-for="folder in tableData" :key="folder.id">
          <ul-folder :folder="folder" />
        </li>
      </ul>
    </div>
    <el-dialog :title="titleDirection" :visible.sync="changeDirectionVisible" width="508px" class="change-user-role" :close-on-click-modal="false">
      <el-form ref="formDirection" :model="formDirection" :rules="ruleDirection">
        <el-form-item label="方向名称" prop="research">
          <el-input v-model="formDirection.research" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitDirection">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="titleAcademic" :visible.sync="changeAcademicVisible" width="508px" class="change-user-role" :close-on-click-modal="false">
      <el-form ref="formAcademic" :model="formAcademic" :rules="ruleAcademic">
        <el-form-item label="学院代码" prop="code">
          <el-input v-model="formAcademic.code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学院名称" prop="name">
          <el-input v-model="formAcademic.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitAcademic">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="titleMajor" :visible.sync="changeMajorVisible" width="508px" class="change-user-role h700" :close-on-click-modal="false">
      <el-form ref="formMajor" :model="formMajor" :rules="ruleMajor">
        <el-form-item label="年份" prop="year">
          <el-select v-model="formMajor.year" placeholder="请选择">
            <el-option v-for="(reg, index1) in years" :key="index1 + 'year'" :label="reg" :value="reg" />
          </el-select>
        </el-form-item>
        <el-form-item label="专业代码" prop="majorCode">
          <el-input v-model="formMajor.majorCode" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="专业名称" prop="majorName">
          <el-input v-model="formMajor.majorName" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="招生类型" prop="enrollmentType">
          <el-select v-model="formMajor.enrollmentType" placeholder="请选择">
            <el-option label="学术硕士" value="学术硕士" />
            <el-option label="专业硕士" value="专业硕士" />
          </el-select>
        </el-form-item>
        <el-form-item label="拟招生人数" prop="planNumber">
          <el-input v-model="formMajor.planNumber" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="推免生人数" prop="recommendNumber">
          <el-input v-model="formMajor.recommendNumber" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学习方式" prop="studyType">
          <el-select v-model="formMajor.studyType" placeholder="请选择">
            <el-option label="全日制" value="全日制" />
            <el-option label="非全日制" value="非全日制" />
          </el-select>
        </el-form-item>
        <el-form-item label="学习年限" prop="studyYear">
          <el-input v-model="formMajor.studyYear" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <div class="w oh">
          <el-form-item class="ww50 fl" label="政治" prop="coursePolitics">
            <el-input v-model="formMajor.coursePolitics" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item class="ww50 fl" label="复试分数线" prop="scorePolitics">
            <el-input v-model="formMajor.scorePolitics" placeholder="请输入" autocomplete="off" />
          </el-form-item>
        </div>
        <div class="w oh">
          <el-form-item class="ww50 fl" label="外语" prop="courseForeign">
            <el-input v-model="formMajor.courseForeign" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item class="ww50 fl" label="复试分数线" prop="scoreForeign">
            <el-input v-model="formMajor.scoreForeign" placeholder="请输入" autocomplete="off" />
          </el-form-item>
        </div>
        <div class="w oh">
          <el-form-item class="ww50 fl" label="数学" prop="courseMath">
            <el-input v-model="formMajor.courseMath" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item class="ww50 fl" label="复试分数线" prop="scoreMath">
            <el-input v-model="formMajor.scoreMath" placeholder="请输入" autocomplete="off" />
          </el-form-item>
        </div>
        <div class="w oh">
          <el-form-item class="ww50 fl" label="专业课" prop="courseProfession">
            <el-input v-model="formMajor.courseProfession" placeholder="请输入" autocomplete="off" />
          </el-form-item>
          <el-form-item class="ww50 fl" label="复试分数线" prop="scoreProfession">
            <el-input v-model="formMajor.scoreProfession" placeholder="请输入" autocomplete="off" />
          </el-form-item>
        </div>
        <el-form-item label="专业课数目" prop="professionNumber">
          <el-input v-model="formMajor.professionNumber" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="复试线" prop="scoreTotal">
          <el-input v-model="formMajor.scoreTotal" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="录取线" prop="enrollmentScore">
          <el-input v-model="formMajor.enrollmentScore" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="初试专业课" prop="preliminaryExam">
          <el-input v-model="formMajor.preliminaryExam" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="专业课备注" prop="preliminaryRemark">
          <el-input v-model="formMajor.preliminaryRemark" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <el-form-item label="参考书目" prop="preliminaryReference">
          <el-input v-model="formMajor.preliminaryReference" placeholder="请输入" type="textarea" autocomplete="off" />
        </el-form-item>
        <el-form-item label="复试内容" prop="secondaryRemark">
          <el-input v-model="formMajor.secondaryRemark" placeholder="请输入" autocomplete="off" />
        </el-form-item>
        <div class="radio-half w oh">
          <div class="col-xs-6">
            <el-form-item label="笔试" prop="writtenExam">
              <el-radio-group v-model="formMajor.writtenExam">
                <el-radio name="writtenExam" size="small" label="是">
                  是
                </el-radio>
                <el-radio name="writtenExam" size="small" label="否">
                  否
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="col-xs-6">
            <el-form-item label="机试" prop="operatingExam">
              <el-radio-group v-model="formMajor.operatingExam">
                <el-radio name="operatingExam" size="small" label="是">
                  是
                </el-radio>
                <el-radio name="operatingExam" size="small" label="否">
                  否
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <el-form-item label="复试参考书目" prop="secondaryReference">
          <el-input v-model="formMajor.secondaryReference" placeholder="请输入" type="textarea" autocomplete="off" />
        </el-form-item>
        <el-form-item label="复试其他要求" prop="secondaryRequire">
          <el-input v-model="formMajor.secondaryRequire" placeholder="请输入" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitMajor">确 定</el-button>
      </span>
    </el-dialog>
    <SchoolInfo ref="schoolInfo" :title="modalTitle" :dialog-visible="dialogVisible" @submitForm="submitForm" @closeHandel="closeModal" />
  </div>
</template>
<script>
import UlFolder from '@/components/treeFolder/UlFolders'
import Bus from '@/assets/js/eventBus'
import { schoolDetail, schoolEdit, collegeAdd, collegeEdit, collegeDel, majorAdd, majorDetail, majorEdit, researchAdd, researchEdit, researchDel, majorDel } from '@/api/secIndex'
import SchoolInfo from './components/schoolInfo'
import { AlertBox } from '@/utils/util'
import UploadPicBtn from '@/components/UploadPictureBtn'
export default {
  components: {
    UlFolder,
    SchoolInfo,
    UploadPicBtn
  },
  data() {
    return {
      modalTitle: '编辑学校',
      school: {}, // 学校详情信息
      dialogVisible: false, // 弹窗显示--编辑学校
      changeDirectionVisible: false, // 弹窗显示--新增方向
      changeMajorVisible: false, // 弹窗显示--新增专业
      changeAcademicVisible: false, // 弹窗显示--新增学院
      dialogVisibleLogo: false, // 弹窗显示--更换校徽
      schoolLogoInfo: '', // 校徽地址
      titleAcademic: '', // 新增学院、编辑学院
      titleMajor: '', // 新增专业、编辑专业
      titleDirection: '', // 新增方向、编辑方向
      formDirection: {
        research: '', // 方向名字
        collegeId: '',
        collegeName: '',
        majorName: '',
        universityId: '',
        universityName: '',
        researchId: '' // 用于编辑方向存储方向id
      },
      formMajor: {
        year: '', // 年份
        universityId: '', // 学校id
        collegeId: '', // 学院id
        majorCode: '', // 专业代码
        majorName: '', // 专业名称
        enrollmentType: '', // 招生类型
        planNumber: '', // 拟招生人数
        recommendNumber: '', // 推免生人数
        studyType: '', // 学习方式
        studyYear: '', // 学习年限
        coursePolitics: '', // 政治
        scorePolitics: '', // 政治复试分数
        courseForeign: '', // 外语
        courseMath: '', // 数学
        courseProfession: '', // 专业课
        scoreForeign: '', // 外语复试分数
        scoreMath: '', // 数学复试分数
        scoreProfession: '', // 专业课复试分数
        scoreTotal: '', // 总分===复试线
        enrollmentScore: '', // 录取线
        preliminaryExam: '', // 初试专业课
        preliminaryRemark: '', // 专业课备注
        preliminaryReference: '', // 参考书目
        professionNumber: '', // 专业课数目
        operatingExam: '', // 机试
        writtenExam: '', // 笔试
        secondaryReference: '', // 复试参考书目
        secondaryRequire: '', // 复试其他要求
        id: '', // 用于编辑专业存储专业id
        universityName: '', // 用于编辑专业存储学校名字
        collegeName: '' // 用于编辑专业存储学院名字
      },
      formAcademic: {
        code: '', // 学院代码
        name: '', // 学院名称
        collegeId: '' // 用于编辑学院存储学院id
      },
      ruleAcademic: {
        code: [{ required: true, trigger: 'blur', message: '请输入学院代码' }],
        name: [{ required: true, trigger: 'blur', message: '请输入学院名称' }]
      },
      ruleDirection: {
        research: [{ required: true, trigger: 'blur', message: '请输入方向名称' }]
      },
      ruleMajor: {
        year: [{ required: true, trigger: 'change', message: '请选择年份' }],
        majorCode: [{ required: true, trigger: 'blur', message: '请输入专业代码' }],
        majorName: [{ required: true, trigger: 'blur', message: '请输入专业名称' }],
        enrollmentType: [{ required: true, trigger: 'change', message: '请选择招生类型' }],
        studyType: [{ required: true, trigger: 'change', message: '请选择学习方式' }]
        // studyYear: [{ required: true, trigger: 'change', message: '请输入学习年限' }],
        // coursePolitics: [{ required: true, trigger: 'blur', message: '请输入政治课名' }],
        // scorePolitics: [{ required: true, trigger: 'blur', message: '请输入复试分数线' }],
        // courseForeign: [{ required: true, trigger: 'blur', message: '请输入外语课名' }],
        // scoreForeign: [{ required: true, trigger: 'blur', message: '请输入复试分数线' }],
        // courseMath: [{ required: true, trigger: 'blur', message: '请输入外语课名' }],
        // scoreMath: [{ required: true, trigger: 'blur', message: '请输入复试分数线' }],
        // courseProfession: [{ required: true, trigger: 'blur', message: '请输入外语课名' }],
        // scoreProfession: [{ required: true, trigger: 'blur', message: '请输入复试分数线' }],
        // preliminaryExam: [{ required: true, trigger: 'blur', message: '请输入初试专业课' }]
      },
      tableData: [],
      years: []
    }
  },
  created() {
    this.init()
  },
  mounted() {
    Bus.$on('newDirection', (data) => {
      console.log('新增方向', data)
      this.titleDirection = '新增方向'
      this.showDirection(data)
    })
    Bus.$on('newMajor', (data) => {
      console.log('新增专业', data)
      this.titleMajor = '新增专业'
      this.showMajor(data)
    })
    Bus.$on('delLevel', (data) => {
      console.log('准备删除', data)
      const that = this
      switch (data.level) {
        case 1:
          that.delCollege(data)
          break
        case 2:
          // that.delYear(data)
          break
        case 3:
          that.delMajor(data)
          break
        case 4:
          that.delDirection(data)
          break
        default:
          that.init()
      }
    })
    Bus.$on('editorLevel', (data) => {
      console.log('准备编辑', data)
      const that = this
      switch (data.level) {
        case 1:
          that.editCollege(data)
          break
        case 2:
          // that.delYear(data)
          break
        case 3:
          that.editMajor(data)
          break
        case 4:
          that.editDirection(data)
          break
        default:
          that.init()
      }
    })
  },
  destroyed() {
    Bus.$off('newDirection')
    Bus.$off('newMajor')
    Bus.$off('delLevel')
    Bus.$off('editorLevel')
  },
  methods: {
    closeModal() {
      this.dialogVisible = false
    },
    init() {
      this.getSchoolDetail()
      const setYear = new Date().getFullYear()
      for (let i = setYear; i > setYear - 10; i--) {
        this.years.push(i + '')
      }
    },
    getSchoolDetail() {
      schoolDetail({ id: this.$route.query.id }).then(res => {
        const tData = res.data.collegeRespList || []
        let hasYear = false // 组装抽离年份数据
        let yearIndex = 0 // 所处年份位置
        tData.forEach(list => {
          list.level = 1
          list.name = list.collegeName
          list.universityCode = res.data.universityCode
          list.universityName = res.data.universityName
          list.children = []
          list.detailMajorRespList.forEach(li => {
            const theYear = li.year
            li.level = 3
            li.parentId = list.collegeId
            li.parentName = list.collegeName
            li.researchResps.forEach(levelFour => {
              levelFour.level = 4
              levelFour.name = levelFour.research
            })
            li.children = li.researchResps
            li.name = '（' + li.majorCode + '）' + li.majorName
            hasYear = false
            yearIndex = 0
            list.children.forEach((yearData, indYear) => {
              if (theYear === yearData.name) {
                hasYear = true
                yearIndex = indYear
                return
              }
            })
            if (hasYear) {
              list.children[yearIndex].children.push(li)
            } else { // 新增年份数据
              list.children.push({
                name: theYear,
                level: 2,
                children: [{ ...li }]
              })
            }
          })
        })
        this.school = res.data
        this.tableData = tData
      })
    },
    // 新增方向弹窗打开
    showDirection(data) {
      this.titleDirection = '新增方向'
      this.changeDirectionVisible = true
      this.$nextTick(() => {
        this.$refs['formDirection'].resetFields()
        this.formDirection.majorId = data.majorId
        this.formDirection.majorName = data.majorName
        this.formDirection.collegeId = data.parentId
        this.formDirection.collegeName = data.parentName
        this.formDirection.universityId = this.school.universityId
        this.formDirection.universityName = this.school.universityName
      })
    },
    // 编辑方向弹窗打开
    editDirection(data) {
      this.titleDirection = '编辑方向'
      this.changeDirectionVisible = true
      this.$nextTick(() => {
        this.$refs['formDirection'].resetFields()
        this.formDirection.research = data.research
        this.formDirection.researchId = data.researchId
      })
    },
    // 新增专业弹窗打开
    showMajor(data) {
      this.titleMajor = '新增专业'
      this.changeMajorVisible = true
      this.$nextTick(() => {
        this.$refs['formMajor'].resetFields()
        this.formMajor.collegeId = data.collegeId
        this.formMajor.collegeName = data.collegeName
        this.formMajor.universityCode = data.universityCode
        this.formMajor.universityName = data.universityName
      })
    },
    // 编辑专业弹窗打开
    editMajor(data) {
      this.titleMajor = '编辑专业'
      // 获取专业详情
      majorDetail({ id: data.majorId }).then(res => {
        this.changeMajorVisible = true
        this.$nextTick(() => {
          this.$refs['formMajor'].resetFields()
          this.formMajor = { ...this.formMajor, ...res.data }
          this.formMajor.id = data.majorId
          this.formMajor.collegeId = data.parentId
          this.formMajor.collegeName = data.parentName
          this.formMajor.universityName = this.school.universityName
          console.log(this.formMajor)
        })
      }).catch(err => {
        console.log(err)
        AlertBox('warning', '获取详情失败')
      })
    },
    // 新增学院弹窗打开
    showAcademic() {
      this.titleAcademic = '新增学院'
      this.changeAcademicVisible = true
      this.$nextTick(() => {
        this.$refs['formAcademic'].resetFields()
      })
    },
    // 编辑学院弹窗打开
    editCollege(data) {
      this.titleAcademic = '编辑学院'
      this.changeAcademicVisible = true
      this.$nextTick(() => {
        this.$refs['formAcademic'].resetFields()
        this.formAcademic.code = data.collegeCode
        this.formAcademic.name = data.collegeName
        this.formAcademic.collegeId = data.collegeId
      })
    },
    // 新增或者编辑方向提交
    submitDirection() {
      this.$refs.formDirection.validate((valid) => {
        if (valid) {
          if (this.titleDirection === '新增方向') {
            researchAdd(this.formDirection).then(res => {
              AlertBox('success', '新增成功！')
              this.init()
              setTimeout(() => {
                this.changeDirectionVisible = false
              }, 500)
            })
          } else {
            researchEdit(this.formDirection).then(res => {
              AlertBox('success', '编辑成功！')
              this.init()
              setTimeout(() => {
                this.changeDirectionVisible = false
              }, 500)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增或者编辑专业提交
    submitMajor() {
      this.$refs.formMajor.validate((valid) => {
        if (valid) {
          this.formMajor.universityId = this.school.universityId
          this.formMajor.enrollmentScore = parseInt(this.formMajor.enrollmentScore)
          this.formMajor.professionNumber = parseInt(this.formMajor.professionNumber)
          this.formMajor.scoreForeign = parseInt(this.formMajor.scoreForeign)
          this.formMajor.scoreMath = parseInt(this.formMajor.scoreMath)
          this.formMajor.scorePolitics = parseInt(this.formMajor.scorePolitics)
          this.formMajor.scoreProfession = parseInt(this.formMajor.scoreProfession)
          this.formMajor.scoreTotal = parseInt(this.formMajor.scoreTotal)
          if (this.titleMajor === '新增专业') {
            majorAdd(this.formMajor).then(res => {
              AlertBox('success', '新增成功！')
              this.init()
              setTimeout(() => {
                this.changeMajorVisible = false
              }, 500)
            })
          } else {
            majorEdit(this.formMajor).then(res => {
              AlertBox('success', '编辑成功！')
              this.init()
              setTimeout(() => {
                this.changeMajorVisible = false
              }, 500)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增或者编辑学院提交
    submitAcademic() {
      this.$refs.formAcademic.validate((valid) => {
        if (valid) {
          if (this.titleAcademic === '新增学院') {
            const dataNew = {
              collegeCode: this.formAcademic.code,
              collegeName: this.formAcademic.name,
              universityId: this.school.universityId
            }
            collegeAdd(dataNew).then(res => {
              AlertBox('success', '新增成功！')
              this.changeAcademicVisible = false
              this.init()
            })
          } else {
            const dataEdit = {
              collegeCode: this.formAcademic.code,
              collegeName: this.formAcademic.name,
              id: this.formAcademic.collegeId
            }
            collegeEdit(dataEdit).then(res => {
              AlertBox('success', '编辑成功！')
              this.changeAcademicVisible = false
              this.init()
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑资料按钮
    editSchool() {
      this.dialogVisible = true
      const schoolInfo = this.$refs.schoolInfo
      schoolInfo.clear(this.school)
    },
    // 保存修改学校
    submitForm(data) {
      schoolEdit(data).then(response => {
        AlertBox('success', '保存成功！')
        setTimeout(() => {
          this.dialogVisible = false
          this.init()
        }, 500)
      })
    },
    // 删除学院
    delCollege(college) {
      this.$confirm('是否确定删除该学院？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const data = {
          id: college.collegeId
        }
        collegeDel(data).then(res => {
          AlertBox('success', '删除成功！')
          this.init()
        })
      }).catch(err => {
        console.log('取消', err)
      })
    },
    // 删除方向
    delDirection(data) {
      this.$confirm('是否确定删除该研究方向？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const research = {
          researchId: data.researchId
        }
        researchDel(research).then(res => {
          AlertBox('success', '删除成功！')
          this.init()
        })
      }).catch(err => {
        console.log('取消', err)
      })
    },
    // 删除专业
    delMajor(data) {
      this.$confirm('是否确定删除该专业？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const majorId = {
          id: data.majorId
        }
        majorDel(majorId).then(res => {
          AlertBox('success', '删除成功！')
          this.init()
        })
      }).catch(err => {
        console.log('取消', err)
      })
    },

    changeLogo(file) {
      this.school.badgeUrl = file.data.path
      schoolEdit({ badgeUrl: file.data.path, id: this.$route.query.id }).then((res) => {
        AlertBox('success', '更换校徽成功')
      })

      // this.dialogVisibleLogo = true
      // this.schoolLogoInfo = this.school.badgeUrl || ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 84px;
  padding-left: 30px;
  margin-bottom: 0;
  font-size: 20px;
  line-height: 84px;
  color: #202431;
}

.school-content {
  padding: 20px;
  border-top: 1px solid #ebeef5;
}

.add-academic {
  width: 109px;
  height: 40px;
  margin-left: 123px;
  font-size: 14px;
  background: rgba(69, 90, 100, 1);
  border-color: rgba(69, 90, 100, 1);
  border-radius: 4px;
}

.school {
  display: inline-block;
  width: 162px;
  padding: 20px 0 0 30px;
  text-align: center;

  .school-logo {
    width: 132px;
    height: 132px;
    line-height: 132px;
    background-color: rgba(251, 251, 251, 1);

    img {
      max-width: calc(100% - 10px);
      max-height: calc(100% - 10px);
      vertical-align: middle;
    }
  }

  .change-badge {
    .upload-pic {
      display: block;
      width: 87px;
      height: 28px;
      padding: 0;
      margin-top: 32px;
      margin-left: 22px;
      line-height: 28px;
      text-align: center;
      border: 1px solid rgba(69, 90, 100, 1);
      border-radius: 4px;
    }
  }
}

.edit-scholl-info {
  display: inline-block;
  margin-top: 20px;
  margin-left: 42px;
  vertical-align: top;

  .school-name {
    font-size: 24px;
    font-weight: 600;
    color: rgba(32, 36, 49, 1);
  }

  .edit-btn {
    display: inline-block;
    margin-bottom: 42px;
    margin-left: 20px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(2, 102, 214, 1);
  }

  .label-name {
    width: 182px;
    height: 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: rgba(32, 36, 49, 1);
  }

  .value-name {
    display: inline-block;
    height: 16px;
    margin-left: 5px;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: #999;
  }
}

.school-tree {
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  p {
    padding: 0;
    margin: 0;
  }
}

.radio-half .col-xs-6 {
  display: inline-block;
  float: left;
  width: 50%;
}
</style>
<style lang="scss">
.school-detail-css {
  .h700 {
    .el-dialog__body {
      height: 50vh;
      overflow-y: scroll;
    }
  }

  .el-dialog__body .el-form-item__label {
    width: 100px;
  }

  .el-textarea,
  .el-input {
    width: calc(100% - 100px);
  }

  .el-select {
    width: calc(100% - 110px);

    .el-input {
      width: 350px;
    }
  }
}

</style>
