<template>
  <el-row :gutter="10">
    <el-col :span="24">
      <el-button type="primary" @click="saveItem()" :disabled="inSave">保存</el-button>
    </el-col>
    <el-col :span="23">
      <el-tabs tab-position="right" :stretch="true" v-model="activedTab">
        <el-tab-pane label="基本信息">
          <el-col :span="8">
            <el-input placeholder="项目名称" v-model="itemData.name" @focus="clearErrMsg('name')">
              <template slot="prepend">
                <span class="required-item">项目名称</span>
              </template>
            </el-input>
            <el-popover
              class="pop-alert"
              placement="top-start"
              title="必填项"
              trigger="manual"
              content="请输入项目名称"
              v-model="requireName"
            ></el-popover>
          </el-col>
          <el-col :span="12">
            <el-input placeholder="英语名称" v-model="itemData.englishName">
              <template slot="prepend">英语名称</template>
            </el-input>
          </el-col>
          <el-col :span="20">
            <el-input placeholder="别名" v-model="itemData.alternativeName">
              <template slot="prepend">别名</template>
            </el-input>
          </el-col>
          <el-col :span="20">
            <el-input placeholder="备注" v-model="itemData.description">
              <template slot="prepend">备注</template>
            </el-input>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="化学品信息">
          <el-col :span="14">
            <el-input placeholder="分子式" v-model="itemData.chemicalMolecularFormula">
              <template slot="prepend">分子式</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input-number
              style="width:80%;"
              label="分子量"
              placeholder="分子量"
              v-model.number="itemData.chemicalMolecularWeight"
              :precision="4"
              :step="0.0001"
            >
              <template slot="prepend">分子量</template>
            </el-input-number>
          </el-col>
          <el-col :span="22">
            <el-input placeholder="国际化合物标识" v-model="itemData.chemicalInChi">
              <template slot="prepend">国际化合物标识（InChI）</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="CAS编号" v-model="itemData.chemicalCASCode">
              <template slot="prepend">CAS编号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="UN编号" v-model="itemData.chemicalUNCode">
              <template slot="prepend">UN编号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="EC编号" v-model="itemData.chemicalECCode">
              <template slot="prepend">EC编号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="ELINCS编号" v-model="itemData.chemicalELINCSCode">
              <template slot="prepend">ELINCS编号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="ICSC编号" v-model="itemData.chemicalICSCCode">
              <template slot="prepend">ICSC编号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="RTECS编号" v-model="itemData.chemicalRTECSCode">
              <template slot="prepend">RTECS编号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="IMDG编号" v-model="itemData.chemicalIMDGCode">
              <template slot="prepend">IMDG编号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="HS编号" v-model="itemData.chemicalHSCode">
              <template slot="prepend">HS编号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="CN编号" v-model="itemData.chemicalCNCode">
              <template slot="prepend">CN编号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="中国HS编号" v-model="itemData.chemicalHSCNCode">
              <template slot="prepend">中国HS编号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="CIQ编号" v-model="itemData.chemicalCIQCode">
              <template slot="prepend">CIQ编号</template>
            </el-input>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="食品编号信息">
          <el-col :span="6">
            <el-input placeholder="食品分类号" v-model="itemData.foodCategoryCode">
              <template slot="prepend">食品分类号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="CNS编号" v-model="itemData.foodCNSCode">
              <template slot="prepend">CNS编号</template>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="INS编号" v-model="itemData.foodINSCode">
              <template slot="prepend">INS编号</template>
            </el-input>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
import api from '@/api'
export default {
  name: 'tpd-item-info',
  props: {
    itemId: Number,
  },
  computed: {
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
      itemData: {},
      inSave: false,
      errMessage: [],
      activedTab: '0',
    }
  },
  methods: {
    clearErrMsg: function (key) {
      const idx = this.errMessage.indexOf(key)
      if (idx >= 0) this.errMessage.splice(idx, 1)
    },
    saveItem: function () {
      this.inSave = true
      this.errMessage = []
      if (!this.itemData.name) this.errMessage.push('name')
      if (this.errMessage.length) {
        this.activedTab = '0'
        this.inSave = false
        return
      }
      if (!this.itemData.id) {
        api.BASE_POST('entity/Items', this.itemData).then((res) => {
          this.inSave = false
          this.$emit('itemSaved')
        })
      } else {
        api
          .BASE_PUT(`entity/Items/${this.itemData.id}`, this.itemData)
          .then((res) => {
            this.inSave = false
            this.$emit('itemSaved')
          })
      }
    },
  },
  watch: {
    itemId: function (newValue, oldValue) {
      if (newValue) {
        api.BASE_GET(`entity/Items/${newValue}`).then((res) => {
          this.itemData = res
        })
      }
    },
  },
}
</script>
<style lang="scss">
.el-tabs__content {
  padding: 1em;
}
</style>