<template>
  <ul class="tpd-normal-list">
    <li v-for="item in itemData" :key="item.id">
      <el-col :span="22">
        <el-checkbox
          v-model="item.checked"
          :disabled="item.disabled"
          :label="item.name"
          @change="changeItem($event, item.id)"
        ></el-checkbox>
      </el-col>
      <el-col :span="2" :offset="2">
        <el-button
          type="primary"
          icon="el-icon-info"
          circle
          size="mini"
          class="d2-fr"
          @click="showItemInfo(item)"
        ></el-button>
      </el-col>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'tpd-item-list',
  props: {
    itemData: {},
    checkMultiple: false,
  },
  data() {
    return {}
  },
  methods: {
    changeItem: function (event, id) {
      // const checkedItems = []
      this.itemData.forEach((element) => {
        if (!this.checkMultiple && element.id !== id) element.disabled = event
        // if (element.checked) checkedItems.push(element)
      })
      this.$emit('changeItem', event, id)
    },
    showItemInfo: function (item) {
      this.$emit('showItemInfo', item)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>