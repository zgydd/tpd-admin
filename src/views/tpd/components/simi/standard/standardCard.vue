<template>
  <el-card class="standard-card">
    <div slot="header" class="clearfix">
      <span
        :title="standard.standardCode + standard.name"
        class="card-title"
      >{{standard.standardCode + standard.name}}</span>
      <div class="sub-title" title="公众键">{{standard.openKey}}</div>
    </div>
    <ul>
      <li>{{standard.englishName}}</li>
      <li>
        <label class="item-title">出版社</label>
        &nbsp;{{standard.publisher}}
      </li>
      <li>
        <label class="item-title">书号</label>
        &nbsp;{{standard.bookMark}}
      </li>
      <li>
        <label class="item-title">主管单位</label>
        &nbsp;{{standard.chargeOrganization}}
      </li>
      <li>
        <label class="item-title">归属单位</label>
        &nbsp;{{standard.attribution}}
      </li>
      <li>
        <label class="item-title">起草单位</label>
        &nbsp;{{standard.draftUnit}}
      </li>
      <li>{{standard.replace}}</li>
      <li class="sub-title">{{standard.description}}</li>
    </ul>
    <div class="bottom clearfix">
      <time class="time">{{ standard.publicationTime | dateFormat }}</time>出版
      <el-button class="d2-fr" type="primary" icon="el-icon-edit" @click="showEdit(standard.id)"></el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'tpd-standard-card',
  props: {
    standard: {},
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
    line-height: 1.8em;
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
.standard-card {
  display: inline-block;
  width: 30%;
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