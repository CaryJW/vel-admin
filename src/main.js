import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // 全局 css

import App from './App'
import store from './store'
import router from './router'

// 引入地图组件
import VueAMap from 'vue-amap'
import BaiduMap from 'vue-baidu-map'

import './icons' // 引入icon
import './permission' // 路由权限控制
import './utils/error-log' // 错误日志

import * as filters from './filters' // 全局文本过滤器

// 注册 element
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // 设置 element-ui 的默认大小
})

// 注册全局文本过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册 高德地图
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '3f1b41109d1b7c0cec52fd278cbf8ed0', // 高德地图开发者平台申请的密钥
  plugin: [
    'AMap.Autocomplete', // 输入提示插件
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView', // 地图鹰眼插件
    'AMap.ToolBar', // 地图工具条
    'AMap.MapType', // 类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    'AMap.PolyEditor', // 编辑 折线多，边形
    'AMap.CircleEditor', // 圆形编辑器插件
    'AMap.Geolocation' // 定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
  v: '1.4.4', // 默认高德 sdk 版本为 1.4.4
  uiVersion: '1.0'
})

// 注册百度地图
Vue.use(BaiduMap, {
  ak: 'iuHpuVELOtBhCQs6GKyuWk44vR66f2F9' // 百度地图开发者平台申请的密钥
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
