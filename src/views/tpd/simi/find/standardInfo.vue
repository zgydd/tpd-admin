<template>
  <d2-container class="page">
    <template slot="header">
      <el-input placeholder="检索关键字" v-model="filterValue" @keyup.enter.native="findStandard()">
        <el-button slot="append" icon="el-icon-search" @click="findStandard()"></el-button>
      </el-input>
    </template>

    <template slot="footer"></template>
  </d2-container>
</template>

<script>
export default {
  components: {},
  methods: {
    findStandard() {},
  },
}
</script>

<style lang="scss" scoped>
</style>
