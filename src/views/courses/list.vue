<template>
  <div>
    <h2 class="title">课程列表</h2>
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
          name: 'test-1',
          apple: 'apple-10',
          banana: 'banana-10',
          orange: 'orange-10'
        },
        {
          name: 'test-2',
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
    .title {
      margin: 26px 0 69px 30px;
      font-size: 20px;
      color: #202431;
    }
</style>

