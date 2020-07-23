<template>
  <el-pagination
    class="d2-fr"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="paginationInfo.pageNumber"
    :page-sizes="[10,20, 50, 100]"
    :page-size="paginationInfo.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="paginationInfo.total"
  ></el-pagination>
</template>
<script>
export default {
  name: 'tpd-pagination',
  props: {
    paginationInfo: undefined,
  },
  mounted() {
    if ([10, 20, 50, 100].indexOf(this.paginationInfo.pageSize) < 0)
      this.paginationInfo.pageSize = 20
  },
  methods: {
    handleSizeChange(val) {
      this.paginationInfo.pageSize = val
      this.$emit('paginationChange')
    },
    handleCurrentChange(val) {
      this.paginationInfo.pageNumber = val
      this.$emit('paginationChange')
    },
  },
}
</script>
<style lang="scss" scoped>
</style>