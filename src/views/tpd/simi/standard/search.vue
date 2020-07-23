<template>
  <d2-container class="page">
    <template slot="header">
      <el-col :span="10" :offset="14">
        <el-input placeholder="检索关键字" v-model="filterValue" @keyup.enter.native="searchStandard">
          <el-button slot="append" icon="el-icon-search" @click="searchStandard"></el-button>
        </el-input>
      </el-col>
    </template>
    <tpd-standard-list v-if="showType" :standardData="standardData" @showEdit="showEdit"></tpd-standard-list>
    <div v-if="!showType">
      <tpd-standard-card
        v-for="standard in standardData"
        :key="standard.id"
        :standard="standard"
        @showEdit="showEdit"
      ></tpd-standard-card>
    </div>
    <template slot="footer">
      <el-switch
        v-model="showType"
        active-color="#13ce66"
        inactive-color="#409eff"
        active-text="列表"
        inactive-text="卡片"
      ></el-switch>
      <tpd-pagination :paginationInfo="paginationInfo" @paginationChange="searchStandard"></tpd-pagination>
    </template>
  </d2-container>
</template>

<script>
import api from '@/api'
import TpdStandardCard from '../../components/standardCard'
import TpdStandardList from '../../components/standardList'
import TpdPagination from '../../components/common/pagination'
export default {
  name: 'simi-standard-search',
  components: { TpdStandardCard, TpdStandardList, TpdPagination },
  data() {
    return {
      showType: false,
      filterValue: '',
      standardData: [],
      paginationInfo: {
        pageNumber: 1,
        pageSize: 20,
        total: 0,
      },
    }
  },
  methods: {
    searchStandard() {
      api
        .STANDARD_FIND(
          this.filterValue,
          this.paginationInfo.pageNumber,
          this.paginationInfo.pageSize
        )
        .then((res) => {
          this.standardData = res.data
          this.paginationInfo.total = res.total
        })
    },
    showEdit(id) {
      this.$router.push({ name: 'simi-standard-edit', params: { id: id } })
    },
  },
}
</script>
<style lang="scss">
</style>
