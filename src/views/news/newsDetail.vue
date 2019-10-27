<template>
  <div class="news-detail">
    <div class="title">
      <span>新建新闻</span>
      <div>
        <el-button type="primary" class="save-news">保存</el-button>
        <el-button type="primary" class="publish-news">发布</el-button>
      </div>
    </div>
    <div class="news-content">
      <el-form label-width="100px">
        <el-form-item label="新闻标题">
          <el-input autocomplete="off" placeholder="请输入"/>
        </el-form-item>
        <el-form-item label="新闻类型" prop="region" class="news-type">
          <el-select  placeholder="请选择活">
            <el-option label="普通角色1" value="shanghai" />
            <el-option label="普通角色2" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="相关学校" prop="region" class="relate-school">
          <el-select  placeholder="请选择">
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
        <!-- <tinymce :height="300" id='tinymce'></tinymce> -->
         </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.title {
  height: 84px;
  padding: 26px 0 0 30px;
  line-height: 0;
  border-bottom: 1px solid #ebeef5;
  span {
    color: #202431;
    font-size: 20px;
  }
  div {
    float: right;
    margin-right: 30px;
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
  background: rgba(241, 241, 241, 1);
  border-radius: 4px;
  border: 1px solid rgba(69, 90, 100, 1);
  color: #455a64;
}
.publish-news {
  width: 109px;
  height: 40px;
  background: rgba(69, 90, 100, 1);
  border-radius: 4px;
  border-color: rgba(69, 90, 100, 1);
}
.news-content .el-form-item__label {
  text-align: center;
}

.news-content .el-input,
.news-content .el-textarea {
  width: 95%;
}
.relate-school{
    margin-left:150px;
}
.relate-school,.news-type{
    display: inline-block;
}
.relate-school .el-input,
.news-type .el-input{
    width:400px;
}
</style>