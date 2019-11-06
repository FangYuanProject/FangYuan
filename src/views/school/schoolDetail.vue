<template>
  <div>
    <h2 class="title">学校主页</h2>
    <div class="school-content">
      <div class="school">
        <img src="@/assets/schoolBadge@2x.png" />
        <el-button type="primary" class="change-badge">更换校徽</el-button>
      </div>
      <div class="edit-scholl-info">
        <div>
          <span class="school-name">北京大学</span>
          <span class="edit-btn">编辑资料</span>
        </div>
        <div>
          <p> <span class="label-name">所在地区:</span><span class="value-name">北京</span></p>
          <p> <span class="label-name">公共科目:</span><span class="value-name"> 政治，数学，英语</span></p>
          <p> <span class="label-name">专业科目:</span><span class="value-name">政治，数学，英语</span></p>
          <p> <span class="label-name">初试分数线:</span><span class="value-name">425（2018），425（2018），425（2018），</span></p>
        </div>
      </div>
    </div>
    <div class="school-content">
      <div class="mb20 w oh">
        <el-button type="primary" class="add-academic fr">+&nbsp;新建学院</el-button>
      </div>
      <ul class="school-tree">
        <li v-for="folder in tableData" :key="folder.id">
          <ul-folder :folder="folder" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import tableComponents from '@/components/tableComponents'
import UlFolder from '@/components/treeFolder/UlFolders'
export default {
  components: {
    UlFolder
  },
  data() {
    return {
      tableData: [
        {
          name: '计算机学院',
          id: 124,
          level: 1,
          children: [
            {
              name: 2019,
              id: 20191,
              level: 2,
              children: [
                {
                  name: '(01020)计算机系统机构专业',
                  id: 201934,
                  level: 3,
                  children: [
                    {
                      name: '计算机方向',
                      id: 1212312,
                      level: 4
                    }
                  ]
                },
                {
                  name: '(01050)计算机管理专业',
                  id: 201935,
                  level: 3
                }
              ]
            },
            {
              name: 2018,
              id: 20181,
              level: 2,
              children: [
                {
                  name: '(01020)计算机系统',
                  id: 201834,
                  level: 3
                },
                {
                  name: '(01050)计算机管理',
                  id: 201835,
                  level: 3
                }
              ]
            }
          ]
        },
        {
          name: '软件学院',
          id: 123,
          level: 1,
          children: [
            {
              name: 2019,
              id: 2019,
              level: 2,
              children: [
                {
                  name: '(02120)软件专业',
                  id: 201944,
                  level: 3
                },
                {
                  name: '(02150)软件管理专业',
                  id: 201945,
                  level: 3,
                  children: [
                    {
                      name: '软件管理方向',
                      id: 1212312,
                      level: 4
                    }
                  ]
                }
              ]
            },
            {
              name: 2018,
              id: 2018,
              level: 2,
              children: [
                {
                  name: '(02120)软件系统',
                  id: 201844,
                  level: 3
                },
                {
                  name: '(02150)软件管理',
                  id: 201845,
                  level: 3
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 84px;
  padding-left: 30px;
  margin-bottom: 0;
  font-size: 20px;
  line-height: 84px;
  color: #202431;
}

.school-content {
  padding: 20px;
  border-top: 1px solid #ebeef5;
}

.add-academic {
  width: 109px;
  height: 40px;
  margin-left: 123px;
  font-size: 14px;
  background: rgba(69, 90, 100, 1);
  border-color: rgba(69, 90, 100, 1);
  border-radius: 4px;
}

.school {
  display: inline-block;
  width: 132px;
  height: 272px;
  padding: 42px 0 0 49px;
  text-align: center;

  .change-badge {
    display: block;
    width: 87px;
    height: 28px;
    padding: 0;
    margin-top: 32px;
    line-height: 28px;
    text-align: center;
    background: rgba(69, 90, 100, 1);
    border: 1px solid rgba(69, 90, 100, 1);
    border-radius: 4px;
  }
}

.edit-scholl-info {
  display: inline-block;
  margin-left: 42px;
  vertical-align: bottom;

  .school-name {
    font-size: 24px;
    font-weight: 600;
    color: rgba(32, 36, 49, 1);
  }

  .edit-btn {
    display: inline-block;
    margin-bottom: 42px;
    margin-left: 20px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(2, 102, 214, 1);
  }

  .label-name {
    width: 182px;
    height: 16px;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: rgba(32, 36, 49, 1);
  }

  .value-name {
    display: inline-block;
    height: 16px;
    margin-left: 5px;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: #999;
  }
}

.school-tree {
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  p {
    padding: 0;
    margin: 0;
  }
}
</style>

