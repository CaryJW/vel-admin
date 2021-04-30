import { constantRoutes } from '@/router'
import { getCurrentUserTree } from '@/api/permission'
import _import from '@/router/_import'
import Layout from '@/layout'
import constants from '@/libs/constants'

/**
 * 解析后端传递过来的路由
 * @param routes
 * @returns {[]}
 */
export function paresRoutes(routes) {
  const res = []

  routes.forEach(route => {
    if (route.type === constants.MENU_BUTTON) {
      return
    }

    const tmp = {}
    tmp.path = route.path
    tmp.name = route.name
    tmp.meta = {}
    tmp.meta.title = route.title
    tmp.meta.icon = route.icon

    if (route.component) {
      if (route.component === 'Layout') {
        tmp.component = Layout
      } else {
        try {
          tmp.component = _import(route.component)
        } catch (e) {
          console.log('Error:' + e) // debug
          tmp.component = () => import('@/views/error-page/404')
        }
      }
    }

    if (route.children) {
      tmp.children = paresRoutes(route.children)
    }

    res.push(tmp)
  })

  res.push({ path: '*', redirect: '/404', hidden: true })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise((resolve, reject) => {
      getCurrentUserTree().then(response => {
        const { tree } = response.data
        const accessedRoutes = paresRoutes(tree)

        commit('SET_ROUTES', accessedRoutes)

        resolve(accessedRoutes)
      }).catch(error => {
        console.log('Error:' + error) // debug
        reject([])
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
