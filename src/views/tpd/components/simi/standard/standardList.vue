<template>
  <ul class="tpd-normal-list">
    <li v-for="standardItem in standardData" :key="standardItem.id">
      <el-col :span="22">
        <el-checkbox
          v-model="standardItem.checked"
          :disabled="standardItem.disabled"
          :title="standardItem.standardCode + ':' + standardItem.name"
          :label="standardItem.standardCode + ':' + standardItem.name"
          @change="changeStandard($event, standardItem.id)"
        ></el-checkbox>
      </el-col>
      <el-col :span="2" :offset="2">
        <el-button
          type="primary"
          icon="el-icon-info"
          circle
          size="mini"
          class="d2-fr"
          @click="showStandardInfo(standardItem)"
        ></el-button>
      </el-col>
    </li>
  </ul>
</template>

<script>
import api from '@/api'
export default {
  name: 'tpd-standard-list',
  props: {
    standardData: {},
    checkMultiple: false,
  },
  data() {
    return {
      standardStatusList: [],
      standardTypeList: [],
      standardCategoryList: [],
    }
  },
  methods: {
    changeStandard: function (event, id) {
      //   const checkedStandards = []
      this.standardData.forEach((element) => {
        if (!this.checkMultiple && element.id !== id) element.disabled = event
        // if (element.checked) checkedStandards.push(element)
      })
      this.$emit('changeStandard', event, id)
    },
    showStandardInfo: function (standard) {
      this.$emit('showStandardInfo', standard)
    },
  },
  created() {
    api
      .BASE_GET('logic/SIMI/SearchCode?parentKey=StandardStatus')
      .then((res) => {
        this.standardStatusList = res
      })
    api.BASE_GET('logic/SIMI/SearchCode?parentKey=StandardType').then((res) => {
      this.standardTypeList = res
    })
    api
      .BASE_GET('logic/SIMI/SearchCode?parentKey=StandardCategory')
      .then((res) => {
        this.standardCategoryList = res
      })
  },
  filters: {
    codesFilter: function (value, standardStatusList) {
      let result = value
      if (standardStatusList.length) {
        for (let i = 0; i < standardStatusList.length; i++) {
          if (standardStatusList[i].codeValue === value) {
            result = standardStatusList[i].codeText
            break
          }
        }
      }
      return result
    },
  },
}
</script>

<style lang="scss">
.tpd-normal-list {
  list-style: none;
  padding: 0;
  margin: 0.8em;
  li {
    line-height: 2em;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0.3em 0.5em;
    border-radius: 0.3em;
    .el-col {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0;
    }
    .el-col:last-child {
      line-height: 2em;
      height: 2em;
      display: flex;
      justify-content: center;
      justify-items: center;
      text-align: center;
      align-items: center;
    }
    .el-checkbox {
      line-height: 2em;
      .el-checkbox__label {
        line-height: 2em;
      }
    }
  }
  li:hover {
    border-bottom: 1px dashed #ccc;
  }
}
</style>