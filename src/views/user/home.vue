<template>
  <div class="user-home">
    <h2 class="title">用户主页</h2>
    <div class="float-left user-info">
      <div class="top">
        <div class="change-user-head">
          <span class="user-head">
            <img src="@/assets/user-head-default.png" alt="">
          </span>
          <el-button type="primary" class="change-user-photo">更换头像</el-button>
        </div>
        <div class="edit-user-info float-right">
          <p>
            <span class="user-name">{{ userName }}</span>
            <span class="edit-user-btn" @click="editUserInfo">编辑资料</span>
          </p>
          <p v-for="(item,index) in textTab" :key="index">
            <span class="label-name">{{ userInfo[item][0].name }}</span>
            <span class="label-value">{{ userInfo[item][0].text }}</span>
          </p>
        </div>
      </div>
      <div style="border-top: 1px solid #ebeef5;">
        <div class="bottom float-right">
          <div class="recommand-code">
            <p>我的推荐码</p>
            <p>{{ referralCode }} &nbsp;<span class="iconfont iconfuzhi copy-code" :data-clipboard-text="referralCode" @click="copyCode" /></p>
          </div>
          <div class="my-score">
            <p>我的积分</p>
            <p>{{ point }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="float-right user-collect">
      <div class="tab">
        <ul>
          <li v-for="(tab,key) in tabList" :key="key" :class="[tabIndex===key ? 'active' :'']" @click="changeTab(key,tab.index)"><span :class="['iconfont',tab.icon]" />&nbsp;{{ tab.name }}&nbsp;<em>{{ tabContentList[tabContentShow].length }}</em></li>
        </ul>
      </div>
      <div class="tab-content">
        <ul>
          <li v-for="(item,index) in tabContentList[tabContentShow]" :key="index+10">
            <p class="list-title">
              {{ item.title }}
              <span class="float-right iconfont iconyishoucang" />
            </p>
            <p class="list-content">{{ item.content }}</p>
            <p class="list-info">
              <span class="date float-left">{{ item.date }}</span>
              <span class="float-right">
                收藏<em>{{ item.collect }}</em> <em>|&nbsp;&nbsp;</em>浏览<em>{{ item.view }}</em>
              </span>
            </p>
          </li>
        </ul>
        <div v-if="tabContentList[tabContentShow].length===0" class="pagination">
          暂无数据
        </div>
        <div v-else class="pagination">
          <Pagination :total="tabContentList[tabContentShow].length" @pagination="selectPage" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { userDetail, collectNews, collectSchool, collectExamList, collectPostList } from '@/api/index'
import { AlertBox } from '@/utils/util'
import Pagination from '@/components/Pagination'
import Clipboard from 'clipboard'
export default {
  components: { Pagination },
  data() {
    return {
      userInfo: {
        email: [{ name: '邮箱', text: '' }],
        phoneNumber: [{ name: '手机', text: '' }],
        undergraduateUniversity: [{ name: '本科院校', text: '' }],
        prepareUniversity: [{ name: '考研院校', text: '' }],
        crossProfession: [{ name: '是否跨考', text: '' }],
        entranceYear: [{ name: '本科入学年份', text: '' }]
      },
      textTab: ['email', 'phoneNumber', 'prepareUniversity', 'undergraduateUniversity', 'crossProfession', 'entranceYear'],
      isReadOnly: true,
      userName: '',
      point: 0,
      referralCode: '',
      tabList: [
        { index: 'news', name: '新闻', icon: 'iconxinwen', collectNum: '2' },
        { index: 'school', name: '学校', icon: 'iconxuexiao', collectNum: '2' },
        { index: 'document', name: '真题', icon: 'iconzhenti', collectNum: '2' },
        { index: 'forum', name: '帖子', icon: 'iconluntan', collectNum: '2' }
      ],
      tabIndex: 0,
      tabContentShow: 'news',
      tabListParams: {
        userId: this.$route.query.id,
        page: 1,
        pageSize: 20
      },
      tabContentList: {
        news: [],
        school: [],
        document: [],
        forum: []
      }
    }
  },
  mounted() {
    this.getUserInfo()
    this.getCollectNews()
  },
  methods: {
    changeTab(index, tabName) {
      this.tabIndex = index
      this.tabContentShow = tabName
      this.tabListParams = {
        page: 1,
        pageSize: 20,
        userId: this.$route.query.id
      }
      if (this.tabContentShow === 'news') {
        this.getCollectNews()
      } else if (this.tabContentShow === 'school') {
        this.getCollectSchool()
      } else if (this.tabContentShow === 'document') {
        this.getCollectExam()
      } else {
        this.getCollectPost()
      }
    },
    getUserInfo() {
      userDetail({ id: this.$route.query.id }).then(res => {
        this.userName = res.data.username
        this.point = res.data.point
        this.referralCode = res.data.referralCode
        for (const i in res.data) {
          if (this.userInfo[i]) {
            this.userInfo[i][0].text = res.data[i]
          }
        }
        console.log(this.userInfo)
      })
    },
    copyCode() {
      const clip = new Clipboard('.copy-code')
      clip.on('success', e => {
        AlertBox('success', '复制成功')
        // 释放内存
        clip.destroy()
      })
      clip.on('error', e => {
        // 不支持复制
        AlertBox('error', '该浏览器不支持复制')
        // 释放内存
        clip.destroy()
      })
    },
    editUserInfo() {
      this.isReadOnly = false
    },
    getCollectNews() {
      collectNews(this.tabListParams).then(res => {
        this.tabContentList.news = res.data
      })
    },
    getCollectSchool() {
      collectSchool(this.tabListParams).then(res => {
        this.tabContentList.school = res.data
      })
    },
    getCollectExam() {
      collectExamList(this.tabListParams).then(res => {
        this.tabContentList.document = res.data
      })
    },
    getCollectPost() {
      collectPostList(this.tabListParams).then(res => {
        this.tabContentList.forum = res.data
      })
    },
    selectPage(pageData) {
      this.tabListParams.page = pageData.page
      this.tabListParams.pageSize = pageData.pageSize
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 56px;
  padding: 26px 0 0 30px;
  margin-bottom: 0;
  font-size: 20px;
  line-height: 0;
  color: #202431;
  border-bottom: 1px solid #ebeef5;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.top {
  height: 315px;
  border-bottom: 1px solid #ebeef5;
}

.user-info {
  position: relative;
  width: 33%;
  height: 100%;
  padding: 0 20px;
  background-color: #fff;
  border-right: 1px solid #ebeef5;

  .change-user-head {
    position: absolute;
    top: 15px;
    display: inline-block;
    text-align: -webkit-center;

    .user-head {
      display: block;
      width: 132px;
      height: 132px;
      line-height: 132px;
      text-align: center;
      background: #fbfbfb;
      border-radius: 10px;
      opacity: .5;
    }
  }

  .edit-user-info {
    display: inline-block;

    .user-name {
      margin-bottom: 0;
      font-size: 24px;
      font-weight: 600;
      color: rgba(32, 36, 49, 1);
    }

    .edit-user-btn {
      display: inline-block;
      margin-bottom: 30px;
      margin-left: 10px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(2, 102, 214, 1);
    }

    .label-name {
      font-size: 14px;
      color: #202431;
    }

    .label-value {
      font-size: 14px;
      color: #757575;
    }

    p:not(:first-child) {
      margin: 10px 0;
    }
  }

  .bottom {
    padding-right: 100px;
    margin-top: 10px;
    clear: both;

    .recommand-code {
      padding: 10px 0;
      margin-bottom: 10px;

      & > p:first-child {
        font-size: 18px;
        font-weight: 600;
        color: rgba(69, 90, 100, 1);
      }

      & > p:last-child {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(117, 117, 117, 1);
      }
    }

    .my-score {
      & > p:first-child {
        font-size: 18px;
        font-weight: 600;
        color: rgba(69, 90, 100, 1);
      }

      & > p:last-child {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(2, 102, 214, 1);
      }
    }
  }
}

.user-collect {
  width: 67%;
  height: 100%;
  background-color: #fff;

  .tab {
    width: 100%;
    height: 75px;
    border-bottom: 1px solid #ebeef5;

    ul {
      margin: 0;
    }

    li {
      float: left;
      width: 25%;
      height: 75px;
      font-size: 16px;
      font-weight: 600;
      line-height: 75px;
      color: #455a64;
      text-align: center;
      list-style: none;

      em {
        font-size: 12px;
        font-weight: 400;
        color: rgba(117, 117, 117, 1);
      }

      &.active {
        color: #0266d6;
        border-bottom: 2px solid  #0266d6;
      }
    }
  }

  .tab-content {
    padding: 0 10px;

    ul {
      padding: 0;

      li {
        padding-top: 10px;
        padding-bottom: 30px;
        list-style: none;
        border-bottom: 1px solid #ebeef5;

        .list-title {
          font-size: 18px;
          font-weight: 600;
          color: rgba(69, 90, 100, 1);
        }

        .list-content {
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
          color: rgba(117, 117, 117, 1);
        }

        .list-info {
          font-size: 13px;
          font-weight: 400;
          color: rgba(69, 90, 100, 1);

          em {
            display: inline-block;
            margin: 0  15px;
            font-style: normal;
          }
        }
      }
    }

    .pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
<style>
.change-user-photo {
  width: 87px;
  height: 28px;
  padding: 0;
  line-height: 28px;
  text-align: center;
  background: rgba(69, 90, 100, 1);
  border: 1px solid rgba(69, 90, 100, 1);
  border-radius: 4px;
}

.user-info .edit-user-info .el-input {
  width: 100px;
}

.user-home .el-input__inner {
  width: auto;
  background-color: transparent;
  border: none;
}
</style>

