<template>
  <div>
    <h2 class="title">学校主页</h2>
    <div class="school-content">
      <div class="school">
        <img src="@/assets/schoolBadge@2x.png" alt >
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
  </div>
</template>
<script>
// import tableComponents from '@/components/tableComponents'
export default {
  components: {},
  data() {
    return {
      schoolName: '华农'
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 84px;
  padding-left: 30px;
  font-size: 20px;
  line-height: 84px;
  color: #202431;
  border-bottom: 1px solid #ebeef5;
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
</style>

