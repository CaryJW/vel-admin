import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // 全局 css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // 引入语言包
import './icons' // 引入icon
import './permission' // 路由权限控制
import './utils/error-log' // 错误日志

import * as filters from './filters' // 全局文本过滤器

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // 设置 element-ui 的默认大小
  i18n: (key, value) => i18n.t(key, value)
})

// 注册全局文本过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
