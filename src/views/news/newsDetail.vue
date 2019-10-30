<template>
  <div class="news-detail">
    <div class="title">
      <span>新建新闻</span>
      <div>
        <button type="primary" class="del-news">删除</button>
        <button type="primary" class="save-news">保存</button>
        <button type="primary" class="publish-news"><span class="iconfont iconfabu" />&nbsp;发布</button>
        <button type="primary" class="off-sale"><span class="iconfont iconxiajia" />&nbsp;下架</button>
      </div>
    </div>
    <div class="news-content">
      <el-form label-width="100px">
        <el-form-item label="新闻标题">
          <el-input autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="新闻类型" class="news-type">
          <el-select placeholder="请选择活">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="相关学校" class="relate-school">
          <el-select placeholder="请选择">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="新闻摘要">
          <el-input
            type="textarea"
            autocomplete="off"
            rows="5"
            placeholder="请输入新闻摘要，字数在200以内"
            maxlength="200"
          />
        </el-form-item>
        <el-form-item label="新闻摘要">
          <tinymce id="tinymce" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce/Editor'
export default {
  components: { Tinymce },
  data() {
    return {
      name: 'tinymce'
    }
  }
}
</script>
<style lang="scss" scoped>
button {
  outline: none;
}

.title {
  height: 64px;
  padding: 15px 0 0 30px;
  margin-top: 20px;
  line-height: 0;
  border-bottom: 1px solid #ebeef5;

  & > span {
    display: inline-block;
    height: 80px;
    font-size: 20px;
    font-weight: bold;
    line-height: 32px;
    color: #202431;
  }

  div {
    float: right;
    margin-right: 30px;

    .del-news {
      width: 87px;
      height: 40px;
      font-size: 14px;
      font-weight: 600;
      line-height: 40px;
      color: rgba(170, 170, 170, 1);
      background-color: #fff;
      border: 1px solid rgba(170, 170, 170, 1);
      border-radius: 4px;
    }
  }
}

.news-content {
  margin-top: 36px;
}
</style>
<style lang="scss">
.save-news {
  width: 87px;
  height: 40px;
  color: #455a64;
  vertical-align: bottom;
  background: #f1f1f1;
  border: 1px solid #455a64;
  border-radius: 4px;
}

.publish-news,
.off-sale {
  width: 109px;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  color: #fff;
  vertical-align: top;
  background: #455a64;
  border: 1px solid #455a64;
  border-radius: 4px;

  .iconfabu,
  .iconxiajia {
    font-size: 14px;
    line-height: 40px;
    color: #fff;
  }
}

.news-content .el-form-item__label {
  text-align: center;
}

.news-content .el-input,
.news-content .el-textarea {
  width: 95%;
}

.relate-school {
  margin-left: 50px;
}

.relate-school,
.news-type {
  display: inline-block;
  width: 45%;
}

.relate-school .el-select,
.news-type .el-select {
  width: 100%;
}

.relate-school .el-input,
.news-type .el-input {
  width: 100%;
}
</style>
