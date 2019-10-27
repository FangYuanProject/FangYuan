<template>
  <div>
    <h2 class="title">学校主页</h2>
    <div class="school-content">
      <div class="school">
        <img src="@/assets/schoolBadge@2x.png" alt />
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
      schoolName: "华农"
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  padding-left: 30px;
  color: #202431;
  height: 84px;
  line-height: 84px;
  border-bottom: 1px solid #ebeef5;
}
.school {
  height: 272px;
  padding: 42px 0 0 49px;
  width: 132px;
  text-align: center;
  display: inline-block;


  .change-badge {
    display: block;
    padding: 0;
    margin-top: 32px;
    width: 87px;
    height: 28px;
    background: rgba(69, 90, 100, 1);
    border-radius: 4px;
    border: 1px solid rgba(69, 90, 100, 1);
    line-height: 28px;
    text-align: center;
  }
}
.edit-scholl-info{
  display: inline-block;
  margin-left:42px;
  vertical-align: bottom;
  .school-name{
    font-size:24px;
    font-weight:600;
    color:rgba(32,36,49,1);
  }
  .edit-btn{
    font-size:14px;
    font-weight:400;
    color:rgba(2,102,214,1);
    display: inline-block;
    margin-left:20px;
    margin-bottom: 42px;
  }
  .label-name{
    width:182px;
    height:16px;
    font-size:14px;
    font-weight:400;
    color:rgba(32,36,49,1);
    line-height:16px;
  }

  .value-name{
    display:inline-block;
    margin-left:5px;
    height:16px;
    font-size:14px;
    font-weight:400;
    color:#999;
    line-height:16px;
  }

}
</style>

