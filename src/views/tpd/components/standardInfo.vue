<template>
  <el-row gutter="10">
    <el-col :span="12">
      <el-input placeholder="标准名称" v-model="standardData.name">
        <template slot="prepend">标准名称</template>
      </el-input>
    </el-col>
    <el-col :span="12">
      <el-input placeholder="标准编号" v-model="standardData.standardCode">
        <template slot="prepend">标准编号</template>
      </el-input>
    </el-col>
  </el-row>
</template>
<script>
import api from '@/api'
export default {
  name: 'tpd-standard-info',
  props: {
    standardId: 0,
  },
  data() {
    return {
      standardData: {},
    }
  },
  methods: {},
  watch: {
    standardId: function (newValue, oldValue) {
      if (newValue) {
        api.BASE_GET(`entity/Standards/${newValue}`).then((res) => {
          this.standardData = res
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
</style>