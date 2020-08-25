<template>
  <el-table :data="itemData" style="width:100%;" height="100%">
    <el-table-column width="250" fixed prop="name" label="名称"></el-table-column>
    <el-table-column prop="englishName" label="英语名称"></el-table-column>
    <el-table-column prop="chemicalCASCode" label="CAS编号"></el-table-column>
    <el-table-column prop="chemicalECCode" label="EC编号"></el-table-column>
    <el-table-column style="text-align: center" width="120" fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button type="info" @click="showEdit(scope.row.id)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'tpd-item-table',
  props: {
    itemData: {},
  },
  data() {
    return {}
  },
  methods: {
    showEdit(id) {
      this.$emit('showEdit', id)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>