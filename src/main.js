// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import {
  menuHeader,
  menuAside
} from '@/menu'
import {
  frameInRoutes
} from '@/router/routes'

// 核心插件
Vue.use(d2Admin)

Vue.filter('dateFormat', function (value) {
  if (!value) return ''
  return value.substring(0, value.indexOf('T'))
})
Vue.filter('priceFormat', function (value) {
  if (!value) return ''
  value = parseFloat((value + '').replace(/[^\d.-]/g, '')).toFixed(2) + ''
  const l = value.split('.')[0].split('').reverse()
  const r = value.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
  }
  return '￥' + t.split('').reverse().join('') + '.' + r
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  watch: {
    // 检测路由变化切换侧边栏内容
    '$route.matched': {
      handler(matched) {
        if (matched.length > 0) {
          const _side = menuAside.filter(menu => menu.path === matched[0].path)
          this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : [])
        }
      },
      immediate: true
    }
  }
}).$mount('#app')
