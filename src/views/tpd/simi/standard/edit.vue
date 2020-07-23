<template>
  <d2-container class="page">
    <template slot="header">
      <el-button type="primary" class="d2-fr">保存</el-button>
      <el-tag v-if="!isCreate">{{currentId}}</el-tag>
    </template>
    <tpd-standard-info :standardId="currentId"></tpd-standard-info>
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import TpdStandardInfo from '../../components/standardInfo'
export default {
  components: { TpdStandardInfo },
  data() {
    return {
      isCreate: true,
      currentId: 0,
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.isCreate = false
      this.currentId = this.$route.params.id
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
