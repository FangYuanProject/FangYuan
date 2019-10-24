<template>
  <div>
    <h2 class="title">学校列表</h2>
    <tableComponents :table-data="tableData" />
  </div>
</template>
<script>
import tableComponents from '@/components/tableComponents'
export default {
  components: {
    tableComponents
  },
  data() {
    return {
      tableData: [
        {
          name: 'school-1',
          apple: 'apple-10',
          banana: 'banana-10',
          orange: 'orange-10'
        },
        {
          name: 'school-2',
          apple: 'apple-20',
          banana: 'banana-20',
          orange: 'orange-20'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
    .title{
        font-size: 20px;
        color:#202431;
        margin: 26px 0 69px 30px;
    }
</style>

