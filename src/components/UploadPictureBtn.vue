<template>
  <div class="upload-pic-btn">
    <el-upload
      ref="upload"
      :accept="accept"
      class="upload-demo"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      list-type="picture"
      :limit="1"
      :action="baseURLFileUpload + '/file/upload?privilege=' + uploadType"
    >
      <el-button size="small" type="primary" class="upload-pic">{{ btnName }}</el-button>
      <span slot="tip" class="el-upload__tip" :style="{'display':uploadTips===''?'none' :'inline'}">{{ uploadTips }}</span>
    </el-upload>
  </div>
</template>
<script>
import { baseURLFileUpload } from '@/utils/request'
export default {
  name: 'Upload',
  props: {
    btnName: {
      type: String,
      default: () => {

      }
    },
    uploadTips: {
      type: String,
      default: () => {

      }
    },
    uploadType: {
      type: String,
      default: 'PUBLIC'
    },
    accept: {
      type: String,
      default: 'image/png,image/jpg,image/jpeg'
    }
  },
  data() {
    return {
      baseURLFileUpload,
      fileList: []
    }
  },
  methods: {
    handlePreview(file) {
      console.log(file)
      this.$emit('click', file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleUploadSuccess(file) {
      this.$refs.upload.clearFiles()
      this.$emit('getUrlSuccess', file)
    }
  }
}
</script>
<style lang="scss">
.upload-pic-btn {
  .el-upload__tip {
    font-size: 12px;
    color: rgba(207, 207, 207, 1);
  }

  .upload-pic {
    width: 87px;
    height: 40px;
    padding: 0;
    margin-right: 16px;
    margin-left: 20px;
    font-size: 14px;
    line-height: 40px;
    color: rgba(69, 90, 100, 1);
    text-align: center;
    background-color: #fff;
    border: 1px solid rgba(69, 90, 100, 1);
    border-radius: 4px;
  }

  .el-upload-list--picture .el-upload-list__item {
    display: none;
  }

  .el-button.upload-pic.el-button--primary.el-button--small,
  .el-input-group__append {
    padding: 0;
    margin: 0;
  }

  .upload-pic-btn {
    width: 30px;
  }
}
</style>
