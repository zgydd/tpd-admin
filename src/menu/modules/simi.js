export default {
    path: '/simi',
    title: '标准方法库',
    icon: 'puzzle-piece',
    children: (pre => [{
        title: '标准库',
        icon: 'book',
        children: [{
            path: `${pre}standard-search`,
            title: '标准检索',
            icon: 'search'
        }]
    }, {
        title: '项目库',
        icon: 'tasks',
        children: [{
            path: `${pre}item-search`,
            title: '项目检索',
            icon: 'search'
        }]
    }, {
        title: '方法库',
        icon: 'sitemap',
        children: [{
            path: `${pre}method-search`,
            title: '方法检索',
            icon: 'search'
        }]
    }, {
        title: '指标库',
        icon: 'line-chart',
        children: [{
            path: `${pre}indicator-search`,
            title: '指标检索',
            icon: 'search'
        }]
    }])('/simi/')
}