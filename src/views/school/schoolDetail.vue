<template>
  <div>
    <h2 class="title">学校主页</h2>
    <div class="school-content">
      <div class="school">
        <div class="school-logo">
          <img v-if="school && !school.badgeUrl" src="@/assets/schoolBadge@2x.png" />
          <img v-if="school && school.badgeUrl" :src="school.badgeUrl" />
        </div>
        <el-button type="primary" class="change-badge" @click="changeLogo">更换校徽</el-button>
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
    <el-dialog title="新增方向" :visible.sync="changeDirectionVisible" width="508px" class="change-user-role">
      <el-form ref="formDirection" :model="formDirection" :rules="ruleDirection">
        <el-form-item label="方向名称">
          <el-input v-model="formDirection.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitDirection">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增年份" :visible.sync="changeYearVisible" width="508px" class="change-user-role">
      <el-form ref="formYear" :model="formYear" :rules="ruleYear">
        <el-form-item label="年份">
          <el-select v-model="formYear.year" placeholder="请选择年份" class="user-role">
            <el-option v-for="y in formYear.years" :key="y" :label="y" :value="y" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitYear">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增学院" :visible.sync="changeAcademicVisible" width="508px" class="change-user-role">
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
    <el-dialog title="新增专业" :visible.sync="changeMajorVisible" width="508px" class="change-user-role">
      <el-form ref="formMajor" :model="formMajor" :rules="ruleMajor">
        <el-form-item label="专业代码" prop="code">
          <el-input v-model="formMajor.code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="专业名称" prop="name">
          <el-input v-model="formMajor.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="拟招生人数">
          <el-input v-model="formMajor.studentRecruitment" autocomplete="off" />
        </el-form-item>
        <el-form-item label="推免生人数">
          <el-input v-model="formMajor.studentFree" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学习方式" prop="learnWay">
          <el-input v-model="formMajor.learnWay" autocomplete="off" />
        </el-form-item>
        <el-form-item label="学习年限" prop="learnYear">
          <el-input v-model="formMajor.learnYear" autocomplete="off" />
        </el-form-item>
        <div v-for="(p, index) in formMajor.publicCourse" :key="index" class="w oh">
          <el-form-item class="ww50 fl" label="公共课" prop="publicCourse">
            <el-input v-model="p.courseName" autocomplete="off" />
          </el-form-item>
          <el-form-item class="ww50 fl" label="录取分数线" prop="publicCourseScore">
            <el-input v-model="p.courseScore" autocomplete="off" />
          </el-form-item>
        </div>
        <div v-for="(p, index) in formMajor.professionalCourse" :key="index" class="w oh">
          <el-form-item class="ww50 fl" label="业务课" prop="professionalCourse">
            <el-input v-model="p.proCourseName" autocomplete="off" />
          </el-form-item>
          <el-form-item class="ww50 fl" label="录取分数线" prop="professionalCourseScore">
            <el-input v-model="p.proCourseScore" autocomplete="off" />
          </el-form-item>
        </div>
        <el-form-item label="录取线" prop="scoreLine">
          <el-input v-model="formMajor.scoreLine" autocomplete="off" />
        </el-form-item>
        <el-form-item label="初试专业课" prop="firstProCourse">
          <el-input v-model="formMajor.firstProCourse" autocomplete="off" />
        </el-form-item>
        <el-form-item label="专业课备注">
          <el-input v-model="formMajor.proCourseMark" autocomplete="off" />
        </el-form-item>
        <el-form-item label="参考书目">
          <el-input v-model="formMajor.consultBooks" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submit-data-btn" @click="submitMajor">确 定</el-button>
      </span>
    </el-dialog>
    <SchoolInfo ref="schoolInfo" :title="modalTitle" :dialog-visible="dialogVisible" @submitForm="submitForm" />
    <el-dialog title="更换校徽" :visible.sync="dialogVisibleLogo" width="508px" class="add-school-modal" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="校徽">
          <span class="school-head" v-if="schoolLogoInfo">
            <img :src="schoolLogoInfo" />
          </span>
          <div style="display: inline-block; width: calc(100% - 90px); margin-top: 10px; vertical-align: top;">
            <upload-pic-btn upload-tips="大小不得大于5M" btn-name="上传校徽" @getUrlSuccess="getUrlSuccess" />
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="edit-data-btn" @click="submitLogo">
          <span>保存</span>
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import UlFolder from '@/components/treeFolder/UlFolders'
import Bus from '@/assets/js/eventBus'
import { schoolDetail, schoolEdit, collegeAdd, collegeDel } from '@/api/secIndex'
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
      changeYearVisible: false, // 弹窗显示--新增年份
      changeAcademicVisible: false, // 弹窗显示--新增学院
      dialogVisibleLogo: false, // 弹窗显示--更换校徽
      schoolLogoInfo: '', // 校徽地址
      formDirection: {
        name: ''
      },
      formMajor: {
        code: '', // 专业代码
        name: '', // 专业名称
        studentRecruitment: '', // 拟招生人数
        studentFree: '', // 推免生人数
        learnWay: '', // 学习方式
        learnYear: '', // 学习年限
        publicCourse: [
          {
            courseName: '',
            courseScore: ''
          }
        ], // 公共课程
        professionalCourse: [
          {
            proCourseName: '',
            proCourseScore: ''
          }
        ], // 业务课
        scoreLine: '', // 录取线
        firstProCourse: '', // 初试专业课
        proCourseMark: '', // 专业课备注
        consultBooks: '' // 参考书目
      },
      formYear: {
        year: '', // 所选年份
        years: [] // 年份选项
      },
      formAcademic: {
        code: '', // 学院代码
        name: '' // 学院名称
      },
      ruleAcademic: {
        code: [{ required: true, trigger: 'blur', message: '请输入学院代码' }],
        name: [{ required: true, trigger: 'blur', message: '请输入学院名称' }]
      },
      ruleYear: {
        year: [{ required: true, trigger: 'change', message: '请选择年份' }]
      },
      ruleDirection: {
        name: [{ required: true, trigger: 'blur', message: '请输入方向名称' }]
      },
      ruleMajor: {
        code: [{ required: true, trigger: 'blur', message: '请输入专业代码' }],
        name: [{ required: true, trigger: 'blur', message: '请输入专业名称' }],
        learnWay: [{ required: true, trigger: 'change', message: '请选择学习方式' }],
        learnYear: [{ required: true, trigger: 'change', message: '请输入学习年限' }],
        publicCourse: [{ required: true, trigger: 'blur', message: '请输入公共课' }],
        publicCourseScore: [{ required: true, trigger: 'blur', message: '请输入录取分数线' }],
        professionalCourse: [{ required: true, trigger: 'blur', message: '请输入业务课' }],
        professionalCourseScore: [{ required: true, trigger: 'blur', message: '请输入录取分数线' }],
        scoreLine: [{ required: true, trigger: 'blur', message: '请输入录取线' }],
        firstProCourse: [{ required: true, trigger: 'blur', message: '请输入初试专业课' }]
      },
      tableData: [
        {
          name: '计算机学院',
          id: 124,
          level: 1,
          children: [
            {
              name: 2019,
              id: 20191,
              level: 2,
              children: [
                {
                  name: '(01020)计算机系统机构专业',
                  id: 201934,
                  level: 3,
                  children: [
                    {
                      name: '计算机方向',
                      id: 1212312,
                      level: 4
                    }
                  ]
                },
                {
                  name: '(01050)计算机管理专业',
                  id: 201935,
                  level: 3
                }
              ]
            },
            {
              name: 2018,
              id: 20181,
              level: 2,
              children: [
                {
                  name: '(01020)计算机系统',
                  id: 201834,
                  level: 3
                },
                {
                  name: '(01050)计算机管理',
                  id: 201835,
                  level: 3
                }
              ]
            }
          ]
        },
        {
          name: '软件学院',
          id: 123,
          level: 1,
          children: [
            {
              name: 2019,
              id: 2019,
              level: 2,
              children: [
                {
                  name: '(02120)软件专业',
                  id: 201944,
                  level: 3
                },
                {
                  name: '(02150)软件管理专业',
                  id: 201945,
                  level: 3,
                  children: [
                    {
                      name: '软件管理方向',
                      id: 1212312,
                      level: 4
                    }
                  ]
                }
              ]
            },
            {
              name: 2018,
              id: 2018,
              level: 2,
              children: [
                {
                  name: '(02120)软件系统',
                  id: 201844,
                  level: 3
                },
                {
                  name: '(02150)软件管理',
                  id: 201845,
                  level: 3
                }
              ]
            }
          ]
        }
      ]
    }
  },
  created() {
    this.init()
  },
  mounted() {
    Bus.$on('newYear', (data) => {
      console.log('新增年份', data)
      this.showYear()
    })
    Bus.$on('newDirection', (data) => {
      console.log('新增方向', data)
      this.showDirection()
    })
    Bus.$on('newMajor', (data) => {
      console.log('新增专业', data)
      this.showMajor()
    })
  },
  destroyed() {
    Bus.$off('newDirection')
    Bus.$off('newMajor')
    Bus.$off('newYear')
  },
  methods: {
    init() {
      this.getSchoolDetail()
    },
    getSchoolDetail() {
      schoolDetail({ id: this.$route.query.id }).then(res => {
        this.school = res.data
      })
    },
    showDirection() {
      this.changeDirectionVisible = true
    },
    showYear() {
      this.changeYearVisible = true
    },
    showMajor() {
      this.changeMajorVisible = true
    },
    showAcademic() {
      this.changeAcademicVisible = true
    },
    // 新增方向
    submitDirection() {
      this.$refs.formDirection.validate((valid) => {
        if (valid) {
          this.changeDirectionVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增专业
    submitMajor() {
      this.$refs.formMajor.validate((valid) => {
        if (valid) {
          this.changeMajorVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增年份
    submitYear() {
      this.$refs.formYear.validate((valid) => {
        if (valid) {
          this.changeYearVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增学院
    submitAcademic() {
      this.$refs.formAcademic.validate((valid) => {
        if (valid) {
          const data = {
            collegeCode: this.formAcademic.code,
            collegeName: this.formAcademic.name,
            universityId: this.school.universityId
          }
          collegeAdd(data).then(res => {
            AlertBox('success', '新增成功！')
            this.changeAcademicVisible = false
            this.init()
          })
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
        }, 1000)
      })
    },
    // 删除学院
    delCollege(college) {
      this.$confirm('是否确定删除该学院', '提示', {
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
          setTimeout(() => {
            this.init()
          }, 1000)
        })
      })
    },
    getUrlSuccess(file) {
      this.schoolLogoInfo = file.data.path
    },
    changeLogo() {
      this.dialogVisibleLogo = true
      this.schoolLogoInfo = this.school.badgeUrl || ''
    },
    submitLogo() {
      if (this.schoolLogoInfo) {
        const data = {
          badgeUrl: this.schoolLogoInfo,
          id: this.school.universityId
        }
        schoolEdit(data).then(res => {
          this.dialogVisibleLogo = false
          AlertBox('success', '跟换成功！')
          this.init()
        })
      } else {
        AlertBox('warning', '请选择校徽！')
      }
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
    display: block;
    width: 87px;
    height: 28px;
    padding: 0;
    margin-top: 32px;
    margin-left: 22px;
    line-height: 28px;
    text-align: center;
    background: rgba(69, 90, 100, 1);
    border: 1px solid rgba(69, 90, 100, 1);
    border-radius: 4px;
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
</style>

