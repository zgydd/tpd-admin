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
      console.log('Fork by https://github.com/d2-projects/d2-admin V1.20.0')
    }
  }
}
