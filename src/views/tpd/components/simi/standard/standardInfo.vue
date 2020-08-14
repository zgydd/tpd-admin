<template>
  <el-row :gutter="10">
    <el-col :span="4">
      <el-input placeholder="标准编号" v-model="standardData.standardCode" @focus="clearErrMsg('code')">
        <template slot="prepend">
          <span class="required-item">标准编号</span>
        </template>
      </el-input>
      <el-popover
        class="pop-alert"
        placement="top-start"
        title="必填项"
        trigger="manual"
        content="请输入标准编号"
        v-model="requireCode"
      ></el-popover>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="标准名称" v-model="standardData.name" @focus="clearErrMsg('name')">
        <template slot="prepend">
          <span class="required-item">标准名称</span>
        </template>
      </el-input>
      <el-popover
        class="pop-alert"
        placement="top-start"
        title="必填项"
        trigger="manual"
        content="请输入标准名称"
        v-model="requireName"
      ></el-popover>
    </el-col>
    <el-col :span="12">
      <el-input placeholder="英语名称" v-model="standardData.englishName">
        <template slot="prepend">英语名称</template>
      </el-input>
    </el-col>
    <el-col :span="2">
      <tpd-code-select
        :parentKey="'StandardStatus'"
        :tpdId="'standardStatus'"
        :initValue="standardData.standardStatus"
        :title="'标准状态'"
        @codeChange="changeSelect"
      ></tpd-code-select>
    </el-col>
    <el-col :span="2">
      <tpd-code-select
        :parentKey="'StandardType'"
        :tpdId="'standardType'"
        :initValue="standardData.standardType"
        :title="'标准类型'"
        @codeChange="changeSelect"
      ></tpd-code-select>
    </el-col>
    <el-col :span="2">
      <tpd-code-select
        :parentKey="'StandardCategory'"
        :tpdId="'category'"
        :initValue="standardData.category"
        :title="'标准种类'"
        @codeChange="changeSelect"
      ></tpd-code-select>
    </el-col>
    <el-col :span="6">
      <el-input placeholder="标准替代" v-model="standardData.replace">
        <template slot="prepend">标准替代</template>
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="发布部门" v-model="standardData.publishOrganization">
        <template slot="prepend">发布部门</template>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-date-picker v-model="standardData.publishTime" type="date" placeholder="发布日期"></el-date-picker>
    </el-col>
    <el-col :span="24">
      <hr />
    </el-col>
    <el-col :span="8">
      <el-input placeholder="主管部门" v-model="standardData.chargeOrganization">
        <template slot="prepend">主管部门</template>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-date-picker v-model="standardData.activedTime" type="date" placeholder="实施日期"></el-date-picker>
    </el-col>
    <el-col></el-col>
    <el-col :span="8">
      <el-input placeholder="起草单位" v-model="standardData.draftUnit">
        <template slot="prepend">起草单位</template>
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="归口单位" v-model="standardData.attribution">
        <template slot="prepend">归口单位</template>
      </el-input>
    </el-col>
    <el-col :span="6">
      <el-input placeholder="替代情况" v-model="standardData.substitution">
        <template slot="prepend">替代情况</template>
      </el-input>
    </el-col>
    <el-col :span="6">
      <el-input placeholder="出版社" v-model="standardData.publisher">
        <template slot="prepend">出版社</template>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-date-picker v-model="standardData.publicationTime" type="date" placeholder="出版日期"></el-date-picker>
    </el-col>
    <el-col :span="6">
      <el-input placeholder="书号" v-model="standardData.bookMark">
        <template slot="prepend">书号</template>
      </el-input>
    </el-col>
    <el-col :span="24">
      <hr />
    </el-col>
    <el-col :span="4">
      <el-input placeholder="控制编号" v-model="standardData.controlCode">
        <template slot="prepend">控制编号</template>
      </el-input>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="管理部门" v-model="standardData.manageDepartment">
        <template slot="prepend">管理部门</template>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-input placeholder="购买人员" v-model="standardData.purchaser">
        <template slot="prepend">购买人员</template>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-date-picker v-model="standardData.buyTime" type="date" placeholder="购买时间"></el-date-picker>
    </el-col>
    <el-col :span="24"></el-col>
    <el-col :span="4">
      <el-input-number
        placeholder="标准价格"
        v-model.number="standardData.price"
        :precision="2"
        :step="0.1"
      >
        <template slot="prepend">标准价格 ￥</template>
      </el-input-number>
    </el-col>
    <el-col :span="3">
      <el-input-number placeholder="数量" v-model.number="standardData.count">
        <template slot="prepend">数量</template>
      </el-input-number>
    </el-col>
    <el-col :span="4">
      <el-input-number
        placeholder="总价"
        :disabled="true"
        v-model.number="countPrice"
        :precision="2"
        :controls="false"
      ></el-input-number>
    </el-col>
    <el-col :span="8">
      <el-input placeholder="存放位置" v-model="standardData.storage">
        <template slot="prepend">存放位置</template>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-date-picker v-model="standardData.entryTime" type="date" placeholder="入库时间"></el-date-picker>
    </el-col>
    <el-col :span="24"></el-col>
    <el-col :span="4">
      <el-input placeholder="控制人员" v-model="standardData.controller">
        <template slot="prepend">控制人员</template>
      </el-input>
    </el-col>
    <el-col :span="2">
      <tpd-code-select
        :parentKey="'StandardStatus'"
        :tpdId="'inControlStatus'"
        :initValue="standardData.inControlStatus"
        :title="'内控状态'"
        @codeChange="changeSelect"
      ></tpd-code-select>
    </el-col>
    <el-col :span="4">
      <el-date-picker v-model="standardData.inControlTime" type="date" placeholder="受控时间"></el-date-picker>
    </el-col>
    <el-col :span="20">
      <el-input placeholder="备注" v-model="standardData.description">
        <template slot="prepend">备注</template>
      </el-input>
    </el-col>
    <el-col :span="24">
      <el-button type="primary" @click="saveStandard()" :disabled="inSave">保存</el-button>
    </el-col>
  </el-row>
</template>
<script>
import api from '@/api'
import TpdCodeSelect from '../../common/codeSelect'
export default {
  name: 'tpd-standard-info',
  props: {
    standardId: Number,
  },
  components: { TpdCodeSelect },
  computed: {
    countPrice: {
      get: function () {
        if (!isNaN(this.standardData.price * this.standardData.count))
          return this.standardData.price * this.standardData.count
        else return 0
      },
      set: function (value) {},
    },
    requireCode: {
      get: function () {
        let result = false
        this.errMessage.forEach(function (item) {
          if (item === 'code') result = true
        })
        return result
      },
      set: function (value) {},
    },
    requireName: {
      get: function () {
        let result = false
        this.errMessage.forEach(function (item) {
          if (item === 'name') result = true
        })
        return result
      },
      set: function (value) {},
    },
  },
  data() {
    return {
      standardData: {},
      inSave: false,
      errMessage: [],
    }
  },
  methods: {
    changeSelect: function (value, id) {
      this.standardData[id] = value
    },
    clearErrMsg: function (key) {
      const idx = this.errMessage.indexOf(key)
      if (idx >= 0) this.errMessage.splice(idx, 1)
    },
    dateUp8: function () {
      for (const element in this.standardData) {
        if (typeof this.standardData[element] === 'object') {
          try {
            this.standardData[element].setTime(
              this.standardData[element].getTime() + 1000 * 60 * 60 * 8
            )
          } catch (e) {}
        }
      }
    },
    saveStandard: function () {
      this.inSave = true
      this.dateUp8()
      this.errMessage = []
      if (!this.standardData.standardCode) this.errMessage.push('code')
      if (!this.standardData.name) this.errMessage.push('name')
      if (this.errMessage.length) {
        this.inSave = false
        return
      }
      if (!this.standardData.id) {
        api.BASE_POST('entity/Standards', this.standardData).then((res) => {
          this.inSave = false
          this.$emit('standardSaved')
        })
      } else {
        api
          .BASE_PUT(
            `entity/Standards/${this.standardData.id}`,
            this.standardData
          )
          .then((res) => {
            this.inSave = false
            this.$emit('standardSaved')
          })
      }
    },
  },
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
<style lang="scss">
.el-col {
  margin-bottom: 0.5em;
  &:last-child {
    margin-bottom: 0;
  }
}
.required-item::after {
  content: '*';
  color: #f00;
}
.pop-alert div {
  color: #f00;
  padding: 0.3em 0.5em;
  div {
    margin: 0;
  }
}
</style>