<template>
  <d2-container class="page">
    <template slot="header">
      <el-tag v-if="!isCreate">标准ID：{{currentId}}</el-tag>
      <el-tag v-if="isCreate" type="success">新建标准</el-tag>
    </template>
    <tpd-standard-info :standardId="currentId" @standardSaved="standardSaved()"></tpd-standard-info>
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import TpdStandardInfo from '../../components/simi/standard/standardInfo'
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
  methods: {
    standardSaved: function () {
      this.$store
        .dispatch('d2admin/page/close', {
          tagName: '/simi/standard-edit',
        })
        .then(() => {
          this.$store.dispatch('simi/standard/refreshList')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
