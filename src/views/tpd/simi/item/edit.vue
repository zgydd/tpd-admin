<template>
  <d2-container class="page">
    <template slot="header">
      <el-tag v-if="!isCreate">项目ID：{{currentId}}</el-tag>
      <el-tag v-if="isCreate" type="success">新建项目</el-tag>
    </template>
    <tpd-item-info :itemId="currentId" @itemSaved="itemSaved()"></tpd-item-info>
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import TpdItemInfo from '../../components/simi/item/itemInfo'
export default {
  components: { TpdItemInfo },
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
    itemSaved: function () {
      this.$store
        .dispatch('d2admin/page/close', {
          tagName: '/simi/item-edit',
        })
        .then(() => {
          this.$store.dispatch('simi/item/refreshList')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
