<template>
  <d2-container class="page">
    <template slot="header">
      <el-col :span="6">
        <el-input
          placeholder="检索关键字"
          v-model="filterStandardValue"
          @keyup.enter.native="searchStandard()"
        >
          <template slot="prepend">检索标准</template>
          <el-button slot="append" icon="el-icon-search" @click="searchStandard()"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6" :offset="2">
        <el-input placeholder="检索关键字" v-model="filterItemValue" @keyup.enter.native="searchItem()">
          <template slot="prepend">检索项目</template>
          <el-button slot="append" icon="el-icon-search" @click="searchItem()"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6" :offset="4">
        <tpd-pagination
          :paginationInfo="connectedItemPaginationInfo"
          @paginationChange="changeStandard(true, currentStandardId)"
        ></tpd-pagination>
      </el-col>
    </template>
    <div style="height: 98%;">
      <SplitPane :min-percent="25" :default-percent="30" split="vertical">
        <template slot="paneL">
          <tpd-standard-list
            :standardData="standardData"
            @showStandardInfo="showStandardInfo"
            @changeStandard="changeStandard"
          ></tpd-standard-list>
        </template>
        <template slot="paneR">
          <SplitPane split="horizontal" :min-percent="10" :default-percent="20">
            <template slot="paneL">
              <div class="right-panel">
                <ul class="connected-list">
                  <li v-for="item in connectedItems" :key="item.id">
                    <section :title="item.name">
                      <el-input
                        type="number"
                        placeholder="序号"
                        v-model="item.sequence"
                        :min="0"
                        @change="itemSequenceChange(item)"
                      >
                        <template slot="prepend">{{item.name|maxString20}}</template>
                      </el-input>
                    </section>
                    <el-input-number
                      v-model="item.price"
                      :step="0.01"
                      :precision="2"
                      :min="0"
                      @change="itemPriceChange(item)"
                    ></el-input-number>
                  </li>
                </ul>
              </div>
            </template>
            <template slot="paneR">
              <tpd-item-list
                class="right-panel"
                :itemData="itemData"
                :checkMultiple="true"
                @showItemInfo="showItemInfo"
                @changeItem="changeItem"
              ></tpd-item-list>
            </template>
          </SplitPane>
        </template>
      </SplitPane>
      <el-drawer
        title="标准信息"
        :visible.sync="viewStandardInfo"
        :with-header="false"
        direction="ltr"
        size="30%"
      >
        <tpd-standard-card
          v-for="standard in selectedStandardData"
          :key="standard.id"
          :standard="standard"
          :canEdit="false"
          @showEdit="showEdit"
        ></tpd-standard-card>
      </el-drawer>
      <el-drawer
        title="项目信息"
        :visible.sync="viewItemInfo"
        :with-header="false"
        direction="rtl"
        size="30%"
      >
        <tpd-item-card
          v-for="item in selectedItemData"
          :key="item.id"
          :item="item"
          :canEdit="false"
          @showEdit="showEdit"
        ></tpd-item-card>
      </el-drawer>
    </div>
    <template slot="footer">
      <el-col :span="7">
        <tpd-pagination
          :paginationInfo="standardPaginationInfo"
          @paginationChange="searchStandard()"
        ></tpd-pagination>
      </el-col>
      <el-col :span="17">
        <tpd-pagination :paginationInfo="itemPaginationInfo" @paginationChange="searchItem()"></tpd-pagination>
      </el-col>
    </template>
  </d2-container>
</template>

<script>
import api from '@/api'
import SplitPane from 'vue-splitpane'
import TpdStandardList from '../../components/simi/standard/standardList'
import TpdItemList from '../../components/simi/item/itemList'
import TpdPagination from '../../components/common/pagination'
import TpdStandardCard from '../../components/simi/standard/standardCard'
import TpdItemCard from '../../components/simi/item/itemCard'
export default {
  components: {
    TpdPagination,
    TpdStandardList,
    TpdItemList,
    SplitPane,
    TpdStandardCard,
    TpdItemCard,
  },
  data() {
    return {
      currentStandardId: 0,
      showType: false,
      filterStandardValue: '',
      standardData: [],
      standardPaginationInfo: {
        pageNumber: 1,
        pageSize: 20,
        total: 0,
      },
      selectedStandardData: [],
      viewStandardInfo: false,
      filterItemValue: '',
      itemData: [],
      itemPaginationInfo: {
        pageNumber: 1,
        pageSize: 20,
        total: 0,
      },
      selectedItemData: [],
      viewItemInfo: false,
      connectedItems: [],
      connectedItemPaginationInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  methods: {
    itemSequenceChange: function (item) {
      item.sequence = parseInt(item.sequence)
      api
        .BASE_POST('logic/SIMI/UpdateStandardItemConnectInfo', item)
        .then((res) => {
          this.connectedItems.sort((a, b) => {
            return a.sequence - b.sequence
          })
        })
    },
    itemPriceChange: function (item) {
      item.price = parseFloat(item.price)
      api.BASE_POST('logic/SIMI/UpdateStandardItemConnectInfo', item)
    },
    checkConnected: function () {
      api
        .BASE_GET(
          `logic/SIMI/SearchStandardItemConnect?standardId=${this.currentStandardId}&pageNumber=1&pageSize=999999`
        )
        .then((res) => {
          this.itemData.forEach((element) => {
            element.checked = false
            res.data.forEach((element2) => {
              if (element.id === element2.itemId) element.checked = true
            })
          })
          this.itemData.push()
        })
    },
    changeStandard: function (event, id) {
      if (!event) {
        this.currentStandardId = 0
        this.connectedItems = []
        this.connectedItemPaginationInfo.pageNumber = 1
        this.connectedItemPaginationInfo.total = 0
        this.checkConnected()
        return
      }
      api
        .BASE_GET(
          `logic/SIMI/SearchStandardItemConnect?standardId=${id}&pageNumber=${this.connectedItemPaginationInfo.pageNumber}&pageSize=${this.connectedItemPaginationInfo.pageSize}`
        )
        .then((res) => {
          this.currentStandardId = id
          this.connectedItems = res.data
          this.connectedItemPaginationInfo.total = res.total
          this.checkConnected()
        })
    },
    changeItem: function (event, id) {
      if (this.currentStandardId < 1) return
      api
        .BASE_POST(
          `logic/SIMI/ConnectStandardItem?standardId=${this.currentStandardId}&itemId=${id}&isConnected=${event}`
        )
        .then((res) => {
          this.changeStandard(true, this.currentStandardId)
        })
    },
    showEdit: function () {},
    showStandardInfo: function (standard) {
      this.selectedStandardData = []
      this.selectedStandardData.push(standard)
      this.viewStandardInfo = true
    },
    showItemInfo: function (item) {
      this.selectedItemData = []
      this.selectedItemData.push(item)
      this.viewItemInfo = true
    },
    searchStandard: function () {
      if (!this.filterStandardValue) {
        this.standardData = []
        this.standardPaginationInfo.pageNumber = 1
        this.standardPaginationInfo.total = 0
        this.$store.commit('simi/standard/refreshListFinished')
        this.changeStandard(false, 0)
        this.filterItemValue = ''
        this.searchItem()
        return
      }
      api
        .STANDARD_FIND(
          this.filterStandardValue,
          this.standardPaginationInfo.pageNumber,
          this.standardPaginationInfo.pageSize
        )
        .then((res) => {
          this.standardData = res.data
          this.standardPaginationInfo.total = res.total
          this.$store.commit('simi/standard/refreshListFinished')
        })
    },
    searchItem: function () {
      if (!this.filterItemValue) {
        this.itemData = []
        this.itemPaginationInfo.pageNumber = 1
        this.itemPaginationInfo.total = 0
        this.$store.commit('simi/item/refreshListFinished')
        return
      }
      api
        .ITEM_FIND(
          this.filterItemValue,
          this.itemPaginationInfo.pageNumber,
          this.itemPaginationInfo.pageSize
        )
        .then((res) => {
          this.itemData = res.data
          this.itemPaginationInfo.total = res.total
          this.checkConnected()
          this.$store.commit('simi/item/refreshListFinished')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.right-panel {
  height: 98%;
  overflow: auto;
}
.standard-card {
  display: block;
  width: auto;
  margin: 2em;
}
.item-card {
  display: block;
  width: auto;
  margin: 2em;
}
.connected-list {
  list-style: none;
  li {
    margin-bottom: 0.2em;
  }
  section {
    display: inline-block;
    width: 50%;
  }
  .el-input-number {
    margin-left: 0.8em;
  }
}
</style>