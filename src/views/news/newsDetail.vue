<template>
  <div class="news-detail">
    <div class="title">
      <span v-if="params.id===''">新建新闻</span>
      <span v-else>编辑新闻{{ params.status }}</span>
      <div>
        <div v-if="params.id!==''&&params.status===2003">
          <button type="primary" class="del-news" @click="delOffNews('del')">删除</button>
          <button type="primary" class="publish-news" @click="saveNewsEvent('publish')"><span class="iconfont iconfabu" />&nbsp;发布</button>
        </div>
        <div v-else-if="params.id!==''&&params.status===2002">
          <button type="primary" class="save-news" @click="saveNewsEvent('edit')">更新</button>
          <button type="primary" class="off-sale" @click="delOffNews('off')"><span class="iconfont iconxiajia" />&nbsp;下架</button>
        </div>
        <div v-else-if="params.id!==''&&params.status===2001">
          <button type="primary" class="del-news" @click="delOffNews('del')">删除</button>
          <button type="primary" class="save-news" @click="saveNewsEvent('edit')">保存</button>
          <button type="primary" class="publish-news" @click="saveNewsEvent('publish')"><span class="iconfont iconfabu" />&nbsp;发布</button>
        </div>
        <div v-else>
          <button type="primary" class="save-news" @click="saveNewsEvent('save')">保存</button>
          <button type="primary" class="publish-news" @click="saveNewsEvent('publish')"><span class="iconfont iconfabu" />&nbsp;发布</button>
        </div>
      </div>
    </div>
    <div class="news-content">
      <el-form ref="newsContent" label-width="100px" :rules="newsContent" :model="params">
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="params.title" autocomplete="off" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="新闻类型" class="news-type" prop="type">
          <el-select v-model="params.type" placeholder="请选择">
            <el-option v-for="(item,index) in newsTypeOptions" :key="index+10" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="相关学校" class="relate-school" prop="universityCode">
          <el-select v-model="params.universityCode" filterable remote :remote-method="getSchoolList" placeholder="请选择">
            <el-option v-for="(item,index) in schoolOptions" :key="item+index" :label="item.universityName" :value="item.universityCode" />
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
import { publishNews, saveNews, unshelveNews, deleteNews, newsDetail, editNews, newsType, schoolCorrelation } from '@/api/index'
import { AlertBox, vaildForm } from '@/utils/util'
export default {
  name: 'NewsDetail',
  components: { Tinymce },
  data() {
    // const id = this.$route.query.id
    return {
      params: {
        content: '',
        universityCode: '',
        summary: '',
        title: '',
        type: '',
        id: this.$route.query.id ? this.$route.query.id : '',
        status: ''
      },
      newsContent: {
        content: [{ required: true, message: '请输入新闻内容', trigger: 'blur', max: '256' }],
        universityCode: [{ required: true, message: '请选择相关学校', trigger: 'change' }],
        summary: [{ required: true, message: '请输入摘要', trigger: 'blur', max: '128' }],
        title: [{ required: true, message: '请输入新闻标题', trigger: 'blur', max: '32' }],
        type: [{ required: true, message: '请选择新闻类型', trigger: 'change' }]
      },
      newsTypeOptions: [], // 新闻类型
      schoolOptions: [], // 相关学校
      searchSchoolParam: {
        universityName: ''
      }
    }
  },
  mounted() {
    this.getNewsType()
    this.getSchoolList()
    if (this.params.id) {
      this.getNewsDetail()
    }
  },
  methods: {
    saveNewsEvent(type) {
      vaildForm(this.$refs['newsContent']).then(res => {
        if (res) {
          delete this.params.status
          if (type === 'save') {
            saveNews(this.params).then(res => {
              AlertBox('success', '保存成功')
              this.$router.push({ name: 'news-list' })
            })
          } else if (type === 'publish') {
            publishNews(this.params).then(res => {
              AlertBox('success', '发布成功')
              this.$router.push({ name: 'news-list' })
            })
          } else {
            editNews(this.params).then(res => {
              this.params = {
                content: '',
                correlation: '',
                summary: '',
                title: '',
                type: '',
                id: this.$route.query.id ? this.$route.query.id : ''
              }
              AlertBox('success', '保存成功')
              this.$router.push({ name: 'news-list' })
            })
          }
        }
      })
    },
    getNewsType() {
      newsType().then(res => {
        res.data.unshift({ value: '请选择', key: '' })
        this.newsTypeOptions = res.data
      })
    },
    clickToolbar() {},
    getSchoolList(query) {
      this.searchSchoolParam.universityName = query || ''
      schoolCorrelation(this.searchSchoolParam).then(res => {
        res.data.unshift({ universityName: '请选择', universityId: '' })
        this.schoolOptions = res.data
      })
    },
    getNewsDetail() {
      newsDetail({ id: this.params.id }).then(res => {
        this.params = {
          content: res.data.content,
          universityCode: res.data.universityCode,
          summary: res.data.summary,
          title: res.data.title,
          type: res.data.type.key,
          id: res.data.id,
          status: res.data.status.key
        }
        console.log(this.params)
      })
    },
    delOffNews(type) {
      if (type === 'del') {
        deleteNews({ id: this.params.id }).then(res => {
          AlertBox('success', '删除成功')
          this.$router.push({ name: 'news-list' })
        })
      } else {
        unshelveNews({ id: this.params.id }).then(res => {
          AlertBox('success', '下架成功')
          this.$router.push({ name: 'news-list' })
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

.news-detail button {
  cursor: pointer;
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
      padding: 0;
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
