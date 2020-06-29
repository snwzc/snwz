<template>
  <div class="wrapper">
    <el-pagination
      :page-size="paging.size"
      layout="total, pager, next"
      :total="total"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
export default {
  props: ['paging', 'total'],
  methods: {
    pageChange (page) {
      this.$emit('change', page)
    }
  }
}
</script>
<style  scoped>
.wrapper {
  text-align: right;
  margin: 30px 20px 50px 0;
}
</style>
