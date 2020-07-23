<template>
  <el-table :data="standardData" style="width:100%;" height="100%">
    <el-table-column width="250" fixed prop="name" label="名称"></el-table-column>
    <el-table-column width="120" fixed prop="code" label="编号"></el-table-column>
    <el-table-column width="80" prop="status" label="状态"></el-table-column>
    <el-table-column width="100" prop="type" label="标准类型"></el-table-column>
    <el-table-column width="100" prop="category" label="标准种类"></el-table-column>
    <el-table-column width="100" prop="activedTime" label="实施时间">
      <template slot-scope="scope">{{ scope.row.activedTime | dateFormat }}</template>
    </el-table-column>
    <el-table-column width="200" prop="chargeOrganization" label="主管部门"></el-table-column>
    <el-table-column width="120" prop="controlCode" label="控制编号"></el-table-column>
    <el-table-column width="150" prop="manageDepartment" label="管理部门"></el-table-column>
    <el-table-column width="100" prop="buyTime" label="购买时间">
      <template slot-scope="scope">{{ scope.row.buyTime | dateFormat }}</template>
    </el-table-column>
    <el-table-column width="80" prop="purchaser" label="购买人员"></el-table-column>
    <el-table-column width="180" prop="price" label="标准价格">
      <template slot-scope="scope">{{ scope.row.price | priceFormat }}</template>
    </el-table-column>
    <el-table-column width="50" prop="count" label="数量"></el-table-column>
    <el-table-column width="100" prop="entryTime" label="入库时间">
      <template slot-scope="scope">{{ scope.row.entryTime | dateFormat }}</template>
    </el-table-column>
    <el-table-column width="100" prop="storage" label="存放位置"></el-table-column>
    <el-table-column width="80" prop="InControlStatus" label="内控状态"></el-table-column>
    <el-table-column width="100" prop="inControlTime" label="受控时间">
      <template slot-scope="scope">{{ scope.row.inControlTime | dateFormat }}</template>
    </el-table-column>
    <el-table-column width="80" prop="controller" label="控制人员"></el-table-column>
    <el-table-column style="text-align: center" width="120" fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button type="info" @click="showEdit(scope.row.id)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'tpd-standard-list',
  props: {
    standardData: {},
  },
  methods: {
    showEdit(id) {
      this.$emit('showEdit', id)
    },
  },
}
</script>

<style lang="scss">
.el-table {
  th {
    color: #409eff;
  }
  th,
  td {
    text-align: center;
  }
}
</style>