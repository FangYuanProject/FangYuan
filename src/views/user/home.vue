<template>
  <div class="user-home">
    <h2 class="title">用户主页</h2>
    <div class="float-left user-info">
      <div class="top">
        <div class="change-user-head">
          <span class="user-head">
            <img :src="headChat ? headChat : require('@/assets/user-head-default.png')" alt="用户头像" :style="{'width':headChat ? '65%' : 'auto'}">
          </span>
        </div>
        <div class="edit-user-info float-right">
          <p>
            <span class="user-name">{{ userName }}</span>
          </p>
          <p v-for="(item,index) in textTab" :key="index">
            <span class="label-name">{{ userInfo[item][0].name }}</span>
            <span class="label-value">{{ userInfo[item][0].text }}</span>
          </p>
        </div>
      </div>
      <div style="border-top: 1px solid #ebeef5;">
        <div class="bottom float-right">
          <div style=" display: inline-block; float: right; width: 57%;">
            <div class="recommand-code">
              <p>我的推荐码</p>
              <p>
                {{ referralCode }} &nbsp;<span
                  class="iconfont iconfuzhi copy-code"
                  :data-clipboard-text="referralCode"
                  @click="copyCode"
                />
              </p>
            </div>
            <div class="my-score">
              <p>我的积分</p>
              <p>{{ point }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 收藏列表 -->
    <div class="float-right user-collect">
      <div class="tab">
        <ul>
          <li v-for="(tab,key) in tabList" :key="key" :class="[tabIndex===key ? 'active' :'']" class="cp" @click="changeTab(key,tab.index)">
            <span :class="['iconfont',tab.icon]" />&nbsp;{{ tab.name }}&nbsp;<em>{{ tab.collectNum }}</em>
          </li>
        </ul>
      </div>
      <div class="tab-content">
        <ul v-if="tabContentShow === 'news'">
          <li v-for="(item,index) in tabContentList[tabContentShow]" :key="index+10" class="list">
            <p class="list-title">
              {{ item.title }}
              <span class="float-right iconfont iconyishoucang" />
            </p>
            <p class="list-content" v-html="contentSubstring(item.content,100)" />
            <p class="list-info">
              <span class="date float-left" v-html="processDate(item.updateTime)" />
              <span class="float-right">
                <!-- 收藏<em>{{ item.collect }}</em> <em>|&nbsp;&nbsp;</em> -->
                浏览<em>{{ item.visitor }}</em>
              </span>
            </p>
          </li>
        </ul>
        <ul v-if="tabContentShow === 'school'">
          <li v-for="(item,index) in tabContentList[tabContentShow]" :key="index+item" class="card">
            <p>
              <span
                v-if="item.badgeUrl"
                class="badge"
                :style="{'background-image':'url(http://defunction.cn/' + item.badgeUrl + ')'}"
              />
              <span class="school-name" :style="{ position: item.badgeUrl ? 'absolute' : 'initial',top: item.badgeUrl ? '25%' : '0'}">{{ item.universityName }}</span>
              <span class="iconfont iconyishoucang is_active" />
            </p>

            <p class="font12">
              所在地区：<span class="color-gray">{{ item.location }}</span>
            </p>
            <p class="font12 ">
              浏览&nbsp;<span class="color-gray">{{ item.visitor }}</span>
            </p>
          </li>
        </ul>
        <ul v-if="tabContentShow === 'document'">
          <li v-for="(item,index) in tabContentList[tabContentShow]" :key="index+item" class="card">
            <p>
              <span class="school-name">{{ item.testName }}</span>
              <span class="iconfont iconyishoucang is_active" />
            </p>
            <p class="color-gray" style="position: absolute; bottom: 10px;">
              <span class="color-gray font12"> 下载&nbsp;{{ item.year }}</span> &nbsp;|&nbsp; <span class="color-gray font12"> 浏览&nbsp;{{ item.year }}</span>
            </p>

          </li>
        </ul>
        <ul v-if="tabContentShow === 'forum'">
          <li v-for="(item,index) in tabContentList[tabContentShow]" :key="index+item" class="list">
            <p class="list-title">
              <span class="school-name">{{ item.title }}</span>
              <span class="float-right iconfont iconyishoucang is_active" />
            </p>
            <p class="list-content" v-html="contentSubstring(item.content,200)" />
            <p class="list-info">
              <span class="color-gray font12" v-html="processDate(item.updateTime)">&nbsp;</span><span class="float-right">浏览&nbsp;&nbsp;&nbsp;{{ !item.visitor? 0 : item.visitor }}</span>
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
  </div></template>
<script>
import { userDetail, collectNews, collectSchool, collectExamList, collectPostList } from '@/api/index'
import { AlertBox, dateTimeStr, calcWordLength } from '@/utils/util'
import Pagination from '@/components/Pagination'
import Clipboard from 'clipboard'
export default {
  components: {
    Pagination
  },
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
      headChat: '',
      referralCode: '',
      tabList: [
        { index: 'news', name: '新闻', icon: 'iconxinwen', collectNum: '0', type: 'list' },
        { index: 'school', name: '学校', icon: 'iconxuexiao', collectNum: '0', type: 'card' },
        { index: 'document', name: '真题', icon: 'iconzhenti', collectNum: '0', type: 'card' },
        { index: 'forum', name: '帖子', icon: 'iconluntan', collectNum: '0', type: 'list' }
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
    if (this.$route.query.id) {
      this.getUserInfo()
      this.getCollectNews()
      this.getCollectSchool()
      this.getCollectExam()
      this.getCollectPost()
    }
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
    },
    getUserInfo() {
      userDetail({ id: this.$route.query.id }).then(res => {
        this.userName = res.data.username
        this.point = res.data.point
        this.referralCode = res.data.referralCode
        this.headChat = res.data.chatHead
        for (const i in res.data) {
          if (this.userInfo[i]) {
            this.userInfo[i][0].text = res.data[i]
          }
        }
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
      this.dialogVisible = true
    },
    processDate(time) {
      return dateTimeStr(time)
    },
    getCollectNews() {
      collectNews(this.tabListParams).then(res => {
        this.tabContentList.news = res.data
        this.tabList[0].collectNum = res.total
      })
    },
    getCollectSchool() {
      collectSchool(this.tabListParams).then(res => {
        this.tabContentList.school = res.data
        this.tabList[1].collectNum = res.total
      })
    },
    getCollectExam() {
      collectExamList(this.tabListParams).then(res => {
        this.tabContentList.document = res.data
        this.tabList[2].collectNum = res.total
      })
    },
    getCollectPost() {
      collectPostList(this.tabListParams).then(res => {
        this.tabContentList.forum = res.data
        this.tabList[3].collectNum = res.total
      })
    },
    selectPage(pageData) {
      this.tabListParams.page = pageData.page
      this.tabListParams.pageSize = pageData.pageSize
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
    contentSubstring(str, length) {
      return calcWordLength(str, length)
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
  overflow: hidden;
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
    overflow: hidden;
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

      img {
        vertical-align: middle;
      }
    }
  }

  .edit-user-info {
    display: inline-block;
    width: 57%;

    .user-name {
      display: block;
      margin: 32px 0;
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
      cursor: pointer;
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
      margin: 20px 0;
    }
  }

  .bottom {
    width: 100%;
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
      padding: 30px 0 10px 30px;

      li.list {
        padding: 10px 0;
        list-style: none;
        border-bottom: 1px solid #ebeef5;

        .list-title {
          margin-bottom: 10px;
          font-size: 18px;
          font-weight: 600;
          color: rgba(69, 90, 100, 1);

          .iconyishoucang {
            color: #1eab00;
          }
        }

        .list-content {
          margin-bottom: 10px;
          font-size: 16px;
          font-weight: 400;
          line-height: 28px;
          color: rgba(117, 117, 117, 1);
        }

        .list-info {
          height: 20px;
          font-size: 13px;
          font-weight: 400;
          line-height: 20px;
          color: rgba(69, 90, 100, 1);

          em {
            display: inline-block;
            margin: 0  15px;
            font-style: normal;
          }
        }
      }

      li.card {
        position: relative;
        float: left;
        width: 265px;
        height: 130px;
        padding: 10px;
        margin: 20px 10px;
        text-align: left;
        list-style: none;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 5px;

        a {
          text-decoration: none;
        }

        & > p:first-child {
          height: 64px;
          margin: 0;

          .badge {
            display: inline-block;
            width: 64px;
            height: 64px;
            margin-right: 10px;
            overflow: hidden;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            border-radius: 50%;
          }

          .iconfont {
            float: right;

            &.is_active {
              color: #1eab00;
            }
          }

          .school-name {
            font-size: 19px;
            font-weight: 600;
            color: rgba(69, 90, 100, 1);
          }
        }

        .font12 {
          font-size: 12px;
          color: #9b9b9b;
        }

        .color-gray {
          color: #455a64;
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
/* .change-user-photo {
  width: 87px !important;
  height: 28px !important;
  padding: 0 !important;
  line-height: 28px !important;
  text-align: center !important;
  background: rgba(69, 90, 100, 1) !important;
  border: 1px solid rgb(117, 186, 218) !important;
  border-radius: 4px !important;
} */

.user-info .edit-user-info .el-input {
  width: 100px;
}

.top .user-home .el-input__inner {
  width: auto;
  background-color: transparent;
  border: none;
}

</style>

