<template>
  <el-card class="item-card">
    <div slot="header" class="clearfix">
      <span :title="item.name" class="card-title">{{item.name}}</span>
      <div class="sub-title" title="公众键">{{item.openKey}}</div>
    </div>
    <ul>
      <li>{{item.englishName}}</li>
      <li class="sub-title">{{item.description}}</li>
    </ul>
    <div class="bottom clearfix">
      <el-button
        v-if="canEdit"
        class="d2-fr bottom-button"
        type="primary"
        icon="el-icon-edit"
        @click="showEdit(item.id)"
      ></el-button>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'tpd-item-card',
  props: {
    item: {},
    canEdit: true,
  },
  methods: {
    showEdit(id) {
      this.$emit('showEdit', id)
    },
  },
}
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  font-size: 0.8em;
  li {
    line-height: 2.3em;
  }
}
.card-title {
  color: #409eff;
  font-size: 1.2em;
}
.sub-title {
  text-align: right;
  color: #aaa;
  padding-left: 0.1em;
  font-size: 0.5em;
}
.bottom {
  margin-top: 1em;
  line-height: 2em;
}
.bottom-button {
  margin-bottom: 0.8em;
}
.time {
  color: #999;
}
label.item-title {
  color: #aaa;
  font: {
    size: larger;
    weight: bolder;
  }
}
.item-card {
  display: inline-block;
  width: 18%;
  margin: 0.5em;
  span {
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 90%;
  }
}
</style>