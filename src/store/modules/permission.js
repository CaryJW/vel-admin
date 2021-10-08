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
export function paresRoutes(tree) {
  const res = []

  tree.forEach(node => {
    if (node.type === constants.MENU_BUTTON) {
      return
    }

    const tmp = {}
    tmp.path = node.path
    tmp.name = node.name
    tmp.meta = {}
    tmp.meta.title = node.title
    tmp.meta.icon = node.icon

    if (node.component) {
      if (node.component === 'Layout') {
        tmp.component = Layout
      } else {
        try {
          tmp.component = _import(node.component)
        } catch (e) {
          console.log('Error:' + e) // debug
          tmp.component = () => import('@/views/error-page/404')
        }
      }
    }

    if (node.children) {
      tmp.children = paresRoutes(node.children)
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
