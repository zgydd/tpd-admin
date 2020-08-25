import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true
}

export default {
  path: '/simi',
  name: 'simi',
  meta,
  redirect: {
    name: 'standard-search'
  },
  component: layoutHeaderAside,
  children: (pre => [{
      path: 'standard-search',
      name: `${pre}standard-search`,
      component: _import('tpd/simi/standard/search'),
      meta: {
        ...meta,
        title: '标准检索',
        cache: true
      }
    },
    {
      path: 'standard-edit',
      name: `${pre}standard-edit`,
      component: _import('tpd/simi/standard/edit'),
      meta: {
        ...meta,
        title: '标准信息',
        cache: true
      }
    },
    {
      path: 'standard-connect-item',
      name: `${pre}standard-connect-item`,
      component: _import('tpd/simi/standard/connectItem'),
      meta: {
        ...meta,
        title: '标准关联项目',
        cache: true
      }
    },
    {
      path: 'item-search',
      name: `${pre}item-search`,
      component: _import('tpd/simi/item/search'),
      meta: {
        ...meta,
        title: '项目检索',
        cache: true
      }
    },
    {
      path: 'item-edit',
      name: `${pre}item-edit`,
      component: _import('tpd/simi/item/edit'),
      meta: {
        ...meta,
        title: '项目信息',
        cache: true
      }
    },
    {
      path: 'method-search',
      name: `${pre}method-search`,
      component: _import('tpd/simi/method/search'),
      meta: {
        ...meta,
        title: '方法检索',
        cache: true
      }
    },
    {
      path: 'indicator-search',
      name: `${pre}indicator-search`,
      component: _import('tpd/simi/indicator/search'),
      meta: {
        ...meta,
        title: '指标检索',
        cache: true
      }
    },
    {
      path: 'find-standard-info',
      name: `${pre}find-standard-info`,
      component: _import('tpd/simi/find/standardInfo'),
      meta: {
        ...meta,
        title: '标准信息查询',
        cache: true
      }
    },
  ])('simi-')
}
