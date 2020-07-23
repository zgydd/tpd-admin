import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow () {
      util.log.capsule('tpd-admin', `v${process.env.VUE_APP_VERSION}`)
      console.log('Fork by https://d2.pub/zh/ V1.14.0')
    }
  }
}
