<template>
  <div class="news-detail">
    <div class="title">
      <span>新建新闻</span>
      <div>
        <button v-if="params.id!==''" type="primary" class="del-news">删除</button>
        <button type="primary" class="save-news" @click="saveNewsEvent">保存</button>
        <button type="primary" class="publish-news"><span class="iconfont iconfabu" />&nbsp;发布</button>
        <button v-if="params.id!==''" type="primary" class="off-sale" @click="publishNewsEvent"><span class="iconfont iconxiajia" />&nbsp;下架</button>
      </div>
    </div>
    <div class="news-content">
      <el-form ref="newsContent" label-width="100px" :rules="newsContent">
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="params.title" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="新闻类型" class="news-type" prop="type">
          <el-select v-model="params.type" placeholder="请选择">
            <el-option v-for="(item,index) in newsTypeOptions" :key="index+10" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="相关学校" class="relate-school" prop="correlation">
          <el-select v-model="params.correlation" filterable remote :remote-method="getSchoolList" placeholder="请选择">
            <el-option v-for="(item,index) in schoolOptions" :key="item.id" :label="item.universityName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="新闻摘要" prop="summary">
          <el-input
            v-model="params.summary"
            type="textarea"
            autocomplete="off"
            rows="5"
            placeholder="请输入新闻摘要，字数在200以内"
            maxlength="200"
          />
        </el-form-item>
        <el-form-item label="新闻内容" prop="content">
          <tinymce id="tinymce" v-model="params.content" :content-html="params.content" @click="clickToolbar" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce/Editor'
import { publishNews, saveNews, unshelveNews, deleteNews, newsDetail, editNews, newsType } from '@/api/index'
import { schoolList } from '@/api/secIndex'
import { AlertBox, vaildForm } from '@/utils/util'
export default {
  name: 'NewsDetail',
  components: { Tinymce },
  data() {
    return {
      params: {
        content: '',
        correlation: '',
        summary: '',
        title: '',
        type: '',
        id: this.$route.query.id ? this.$route.query.id : ''
      },
      newsContent: {
        content: [{ require: true, message: '请输入新闻内容', trigger: 'blur', max: '256' }],
        correlation: [{ require: true, message: '请选择相关学校', trigger: 'change' }],
        summary: [{ require: true, message: '请输入摘要', trigger: 'blur', max: '128' }],
        title: [{ require: true, message: '请输入新闻标题', trigger: 'blur', max: '32' }],
        type: [{ require: true, message: '请选择新闻类型', trigger: 'change' }]
      },
      newsTypeOptions: [], // 新闻类型
      schoolOptions: [], // 相关学校
      searchSchoolParam: {
        page: 1,
        pageSize: 50,
        universityName: ''
      }
    }
  },
  mounted() {
    this.getNewsType()
    this.getSchoolList()
  },
  methods: {
    publishNewsEvent() {
      vaildForm(this.$refs['newsContent']).then(res => {
        publishNews(this.params).then(res => {
          console.log(res)
        })
      })
    },
    saveNewsEvent() {
      console.log(this.params)
      saveNews(this.params).then(res => {
        console.log(res)
      })
    },
    clickToolbar() {

    },
    getNewsType() {
      newsType().then(res => {
        this.newsTypeOptions = res.data
      })
    },
    getSchoolList(query) {
      console.log(query)
      if (query !== '') {
        schoolList({ universityName: query }).then(res => {
          this.schoolOptions = res.data
        })
      } else {
        schoolList({ page: 1, pageSize: 50 }).then(res => {
          this.schoolOptions = res.data
        })
      }
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
  padding: 0;
  font-size: 14px;
  line-height: 40px;
  color: #fff;
  vertical-align: top;
  background: #455a64;
  border: none;
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
