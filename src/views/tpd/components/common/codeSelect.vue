<template>
  <el-select v-model="value" filterable placeholder="请选择" @change="codeChange" class="width-full">
    <slot name="prefix">
      <label class="prefix-title">{{title}}</label>
      <hr />
    </slot>
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.codeText"
      :value="item.codeValue"
    ></el-option>
  </el-select>
</template>

<script>
import api from '@/api'
export default {
  name: 'tpd-code-select',
  props: {
    parentKey: '',
    tpdId: '',
    initValue: '',
    title: '',
  },
  mounted() {
    if (this.parentKey) {
      api
        .BASE_GET(`logic/SIMI/SearchCode?parentKey=${this.parentKey}`)
        .then((res) => {
          this.options = res
        })
    }
  },
  data() {
    return { options: [], value: '' }
  },
  methods: {
    codeChange() {
      this.$emit('codeChange', this.value, this.tpdId)
    },
  },
  watch: {
    initValue: function (newValue, oldValue) {
      this.value = newValue
    },
  },
}
</script>
<style lang="scss" scoped>
.width-full {
  width: 100%;
}
.prefix-title {
  color: #909399;
  font: {
    size: 0.8em;
  }
  margin-left: 0.8em;
}
</style>