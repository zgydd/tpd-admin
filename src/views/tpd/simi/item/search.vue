<template>
  <d2-container class="page">
    <template slot="header">
      <el-col :span="4">
        <el-button type="success" icon="el-icon-plus" circle @click="newItem()"></el-button>
      </el-col>
      <el-col :span="10" :offset="10">
        <el-input placeholder="检索关键字" v-model="filterValue" @keyup.enter.native="searchItem()">
          <el-button slot="append" icon="el-icon-search" @click="searchItem()"></el-button>
        </el-input>
      </el-col>
    </template>
    <tpd-item-table v-if="showType" :itemData="itemData" @showEdit="showEdit"></tpd-item-table>
    <div v-if="!showType">
      <tpd-item-card
        v-for="item in itemData"
        :key="item.id"
        :item="item"
        :canEdit="true"
        @showEdit="showEdit"
      ></tpd-item-card>
    </div>
    <template slot="footer">
      <el-switch
        v-model="showType"
        active-color="#13ce66"
        inactive-color="#409eff"
        active-text="列表"
        inactive-text="卡片"
      ></el-switch>
      <tpd-pagination :paginationInfo="paginationInfo" @paginationChange="searchItem()"></tpd-pagination>
    </template>
  </d2-container>
</template>

<script>
import api from '@/api'
import TpdItemCard from '../../components/simi/item/itemCard'
import TpdItemTable from '../../components/simi/item/itemTable'
import TpdPagination from '../../components/common/pagination'
import { mapState } from 'vuex'
export default {
  name: 'simi-item-search',
  components: {
    TpdItemCard,
    TpdItemTable,
    TpdPagination,
    // TpdItemGrid,
  },
  data() {
    return {
      showType: false,
      filterValue: '',
      itemData: [],
      paginationInfo: {
        pageNumber: 1,
        pageSize: 20,
        total: 0,
      },
    }
  },
  computed: mapState('simi/item', ['lstNeedRefresh']),
  watch: {
    lstNeedRefresh: function (newValue, oldValue) {
      if (newValue) this.searchItem()
    },
  },
  methods: {
    searchItem() {
      if (!this.filterValue) {
        this.itemData = []
        this.paginationInfo.total = 0
        this.$store.commit('simi/item/refreshListFinished')
        return
      }
      api
        .ITEM_FIND(
          this.filterValue,
          this.paginationInfo.pageNumber,
          this.paginationInfo.pageSize
        )
        .then((res) => {
          this.itemData = res.data
          this.paginationInfo.total = res.total
          this.$store.commit('simi/item/refreshListFinished')
        })
    },
    showEdit(id) {
      this.$router.push({ name: 'simi-item-edit', params: { id: id } })
    },
    newItem() {
      this.$router.push({ name: 'simi-item-edit' })
    },
  },
}
</script>
<style lang="scss">
</style>
