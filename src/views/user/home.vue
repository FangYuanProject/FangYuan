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
            <span class="user-name">张一凡</span>
            <span class="edit-user-btn">编辑资料</span>
          </p>
          <p v-for="(item,index) in userInfo" :key="index">
            <span class="label-name">{{ item.name }}</span>
            <el-input v-model="item.text" class="label-value" />
          </p>
        </div>
      </div>
      <div style="border-top: 1px solid #ebeef5;">
        <div class="bottom float-right">
          <div class="recommand-code">
            <p>我的推荐码</p>
            <p>NUGBASJF &nbsp;<span class="iconfont iconfuzhi" /></p>
          </div>
          <div class="my-score">
            <p>我的积分</p>
            <p>100</p>
          </div>
        </div>
      </div>
    </div>
    <div class="float-right user-collect">
      <div class="tab">
        <ul>
          <li v-for="(tab,key) in tabList" :key="key" :class="[tabIndex===key ? 'active' :'']" @click="changeTab(key,tab.index)"><span :class="['iconfont',tab.icon]" />&nbsp;{{ tab.name }}&nbsp;<em>{{ tab.collectNum }}</em></li>
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userInfo: [{
        name: '邮箱', text: 'zhangyifan@yy.com'
      }, {
        name: '手机', text: '18825055554'
      }, {
        name: '本科院校', text: '天津大学'
      }, {
        name: '考研院校', text: '背景大学'
      }, {
        name: '是否跨考', text: '否'
      }, {
        name: '本科入学年份', text: '2019-10-30'
      }],
      tabList: [
        { index: 'news', name: '新闻', icon: 'iconxinwen', collectNum: '2' },
        { index: 'school', name: '学校', icon: 'iconxuexiao', collectNum: '2' },
        { index: 'document', name: '真题', icon: 'iconzhenti', collectNum: '2' },
        { index: 'forum', name: '帖子', icon: 'iconluntan', collectNum: '2' },
        { index: 'course', name: '课程', icon: 'iconkecheng', collectNum: '2' }
      ],
      tabIndex: 0,
      tabContentShow: 'news',
      tabContentList: {
        news: [
          { title: '新闻-新闻标题，今年北大又扩招50人',
            content: '高校扩招，也称为大学扩招或大学生扩招，是指中华人民共和国境内（即中国大陆）自1999年开始的，基于解决经济和就业问题的扩大普通高校本专科院校招生人数的教育改革政策，简单来说即是自1999年开始的高等教育（包括大学本科、研究生）不断扩大招生人数的教育改革政策。扩招源于1999年教育部出台的《面向21世纪教育振兴行动计划》。文件提出到2010年，高等教育毛入学率将达到适龄青年的15%。进入2008年后，教育部表示1999年开始的扩招过于急躁并逐渐控制扩招比例，但在2009年环球金融风暴的背景下，教育部开始了研究生招生比例的调节。',
            date: '2019-10-31 12:12',
            collect: '2',
            view: '2' }
        ],
        school: [
          { title: '学校-新闻标题，今年北大又扩招50人',
            content: '高校扩招，也称为大学扩招或大学生扩招，是指中华人民共和国境内（即中国大陆）自1999年开始的，基于解决经济和就业问题的扩大普通高校本专科院校招生人数的教育改革政策，简单来说即是自1999年开始的高等教育（包括大学本科、研究生）不断扩大招生人数的教育改革政策。扩招源于1999年教育部出台的《面向21世纪教育振兴行动计划》。文件提出到2010年，高等教育毛入学率将达到适龄青年的15%。进入2008年后，教育部表示1999年开始的扩招过于急躁并逐渐控制扩招比例，但在2009年环球金融风暴的背景下，教育部开始了研究生招生比例的调节。',
            date: '2019-10-31 12:12',
            collect: '2',
            view: '2' }
        ],
        document: [
          { title: '真题-新闻标题，今年北大又扩招50人',
            content: '高校扩招，也称为大学扩招或大学生扩招，是指中华人民共和国境内（即中国大陆）自1999年开始的，基于解决经济和就业问题的扩大普通高校本专科院校招生人数的教育改革政策，简单来说即是自1999年开始的高等教育（包括大学本科、研究生）不断扩大招生人数的教育改革政策。扩招源于1999年教育部出台的《面向21世纪教育振兴行动计划》。文件提出到2010年，高等教育毛入学率将达到适龄青年的15%。进入2008年后，教育部表示1999年开始的扩招过于急躁并逐渐控制扩招比例，但在2009年环球金融风暴的背景下，教育部开始了研究生招生比例的调节。',
            date: '2019-10-31 12:12',
            collect: '2',
            view: '2' }
        ],
        forum: [
          { title: '帖子-新闻标题，今年北大又扩招50人',
            content: '高校扩招，也称为大学扩招或大学生扩招，是指中华人民共和国境内（即中国大陆）自1999年开始的，基于解决经济和就业问题的扩大普通高校本专科院校招生人数的教育改革政策，简单来说即是自1999年开始的高等教育（包括大学本科、研究生）不断扩大招生人数的教育改革政策。扩招源于1999年教育部出台的《面向21世纪教育振兴行动计划》。文件提出到2010年，高等教育毛入学率将达到适龄青年的15%。进入2008年后，教育部表示1999年开始的扩招过于急躁并逐渐控制扩招比例，但在2009年环球金融风暴的背景下，教育部开始了研究生招生比例的调节。',
            date: '2019-10-31 12:12',
            collect: '2',
            view: '2' }
        ],
        course: [
          { title: '课程-新闻标题，今年北大又扩招50人',
            content: '高校扩招，也称为大学扩招或大学生扩招，是指中华人民共和国境内（即中国大陆）自1999年开始的，基于解决经济和就业问题的扩大普通高校本专科院校招生人数的教育改革政策，简单来说即是自1999年开始的高等教育（包括大学本科、研究生）不断扩大招生人数的教育改革政策。扩招源于1999年教育部出台的《面向21世纪教育振兴行动计划》。文件提出到2010年，高等教育毛入学率将达到适龄青年的15%。进入2008年后，教育部表示1999年开始的扩招过于急躁并逐渐控制扩招比例，但在2009年环球金融风暴的背景下，教育部开始了研究生招生比例的调节。',
            date: '2019-10-31 12:12',
            collect: '2',
            view: '2' }
        ]

      }
    }
  },
  methods: {
    changeTab(index, tabName) {
      this.tabIndex = index
      this.tabContentShow = tabName
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
  width: 24%;
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
      font-size: 24px;
      font-weight: 600;
      color: rgba(32, 36, 49, 1);
    }

    .edit-user-btn {
      display: inline-block;
      margin-bottom: 42px;
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
  }

  .bottom {
    padding-right: 70px;
    clear: both;

    .recommand-code {
      & > p:first-child {
        font-size: 18px;
        font-weight: 600;
        color: rgba(69, 90, 100, 1);
      }

      & > p:last-child {
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
        font-size: 14px;
        font-weight: 400;
        color: rgba(2, 102, 214, 1);
      }
    }
  }
}

.user-collect {
  width: 76%;
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
      width: 160px;
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
  border: none;
}
</style>

