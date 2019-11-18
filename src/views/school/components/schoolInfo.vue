<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="508px" class="add-school-modal" :close-on-click-modal="false" :show-close="true" :before-close="closeModal">
    <el-form ref="modalForm" :model="modalForm" :rules="rules">
      <el-form-item label="校徽">
        <span v-if="schoolLogoInfo" class="school-head">
          <!-- <img src="@/assets/schoolBadge@1x.png"> -->
          <img :src="schoolLogoInfo">
        </span>
        <div style="display: inline-block; width: calc(100% - 90px); margin-top: 10px; vertical-align: top;">
          <upload-pic-btn upload-tips="大小不得大于5M" btn-name="上传校徽" @getUrlSuccess="getUrlSuccess" />
        </div>
      </el-form-item>
      <el-form-item label="学校代码" prop="universityCode">
        <el-input v-model="modalForm.universityCode" autocomplete="off" />
      </el-form-item>
      <el-form-item label="学校名称" class="active-origin" prop="universityName">
        <el-input v-model="modalForm.universityName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所在地区" class="score-input" prop="location">
        <el-select v-model="modalForm.location" placeholder="请选择">
          <el-option v-for="(loc, index3) in regions" :key="index3 + '1000'" :label="loc" :value="loc" />
        </el-select>
      </el-form-item>
      <el-form-item label="特性" class="score-input" prop="property">
        <el-select v-model="modalForm.property" placeholder="请选择">
          <el-option v-for="(pro, index4) in properties" :key="index4 + '10000'" :label="pro.value" :value="pro.key" />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" class="edit-data-btn" @click="submitForm('modalForm', 0)">
        <span>保存</span>
      </el-button>
      <el-button v-show="title !== '编辑学校'" type="primary" class="submit-data-btn" @click="submitForm('modalForm', 1)">
        <span class="iconfont iconfabu">发布</span>
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import UploadPicBtn from '@/components/UploadPictureBtn'
import { regionList, propertyList } from '@/api/secIndex'
export default {
  components: { UploadPicBtn },
  props: {
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      schoolId: '',
      modalForm: {
        universityName: '',
        universityCode: '',
        location: '',
        property: ''
      },
      rules: {
        universityName: [
          { required: true, message: '请输入学校名称', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请选择所在区域', trigger: 'change' }
        ],
        universityCode: [
          { required: true, message: '请输入学校代码', trigger: 'blur' }
        ],
        property: [
          { required: true, message: '请选择学校特性', trigger: 'change' }
        ]
      },
      schoolLogoInfo: '',
      properties: [],
      regions: []
      // modalStatus: this.dialogVisible
    }
  },
  mounted() {
  },
  methods: {
    closeModal() {
      this.$emit('closeHandel')
    },
    clear(school) {
      this.getProperty()
      this.getRegionList()
      if (school) {
        this.schoolId = school.universityId
        this.schoolLogoInfo = school.badgeUrl
        this.modalForm.location = school.location
        this.modalForm.property = school.property.key
        this.modalForm.universityCode = school.universityCode
        this.modalForm.universityName = school.universityName
      } else {
        this.schoolLogoInfo = ''
        this.modalForm.location = ''
        this.modalForm.property = ''
        this.modalForm.universityCode = ''
        this.modalForm.universityName = ''
      }
    },
    getUrlSuccess(file) {
      this.schoolLogoInfo = file.data.path
    },
    getProperty() {
      propertyList()
        .then(response => {
          this.properties = response.data || []
        })
    },
    getRegionList() {
      regionList()
        .then(response => {
          this.regions = response.data || []
        })
    },
    submitForm(formName, saveOrPublish) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            badgeUrl: this.schoolLogoInfo || '',
            id: this.schoolId,
            location: this.modalForm.location,
            property: this.modalForm.property,
            universityCode: this.modalForm.universityCode,
            universityName: this.modalForm.universityName
          }
          this.$emit('submitForm', data, saveOrPublish)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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

  .el-form-item.el-form-item--medium {
    margin-right: 0;
    margin-bottom: 20px;
    margin-left: 30px;
  }
}
</style>
