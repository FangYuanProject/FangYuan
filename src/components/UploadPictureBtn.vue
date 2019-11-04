<template>
  <div class="upload-pic-btn">
    <el-upload
      class="upload-demo"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      list-type="picture"
      action="https://jsonplaceholder.typicode.com/posts/"
    >
      <el-button size="small" type="primary" class="upload-pic">{{ btnName }}</el-button>
      <span slot="tip" class="el-upload__tip">{{ uploadTips }}</span>
    </el-upload>
  </div>
</template>
<script>
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
        console.log(this.uploadTips)
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handlePreview(file) {
      console.log(file)
      this.$emit('click', file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
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
}
</style>
