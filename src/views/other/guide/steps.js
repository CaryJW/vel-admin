const steps = [
  {
    element: '#hamburger-container',
    popover: {
      title: '侧边栏',
      description: '打开 && 关闭 侧边栏',
      position: 'bottom'
    }
  },
  {
    element: '#breadcrumb-container',
    popover: {
      title: '面包屑',
      description: '指示当前页面位置',
      position: 'bottom'
    }
  },
  {
    element: '#header-search',
    popover: {
      title: '页面搜索',
      description: '页面搜索，快速导航',
      position: 'left'
    }
  },
  {
    element: '#task-center',
    popover: {
      title: '任务中心',
      description: '异步导出任务中心',
      position: 'left'
    }
  },
  {
    element: '#screenfull',
    popover: {
      title: '全屏',
      description: '将页面设置为全屏',
      position: 'left'
    }
  },
  {
    element: '#size-select',
    popover: {
      title: '选择字体大小',
      description: '切换系统字体大小',
      position: 'left'
    }
  },
  {
    element: '#tags-view-container',
    popover: {
      title: '视图标签',
      description: '您访问的页面的历史记录',
      position: 'bottom'
    },
    padding: 0
  }
]

export default steps
