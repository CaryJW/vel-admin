import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    noCheckPermission: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: '个人信息',
        meta: { title: '个人信息', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/sys',
    component: Layout,
    // redirect: '/sys/admin-user',
    alwaysShow: true,
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'admin-user',
        component: () => import('@/views/sys/admin-user'),
        name: '管理员用户',
        meta: {
          title: '管理员用户',
          permission: [
            'adminUser::list',
            'adminUser::add',
            'adminUser::update',
            'password::update'
          ]
        }
      },
      {
        path: 'role',
        component: () => import('@/views/sys/role'),
        name: '角色权限',
        meta: {
          title: '角色权限',
          permission: [
            'role::list',
            'role::add',
            'role::update'
          ]
        }
      }
    ]
  },

  {
    path: '/monitor',
    component: Layout,
    alwaysShow: true,
    name: '系统监控',
    meta: {
      title: '系统监控',
      icon: 'el-icon-sunrise'
    },
    children: [
      {
        path: 'login-log',
        component: () => import('@/views/monitor/login-log'),
        name: '登录日志',
        meta: { title: '登录日志' }
      }
    ]
  },

  {
    path: '/table',
    component: Layout,
    children: [
      {
        path: 'complex-table',
        component: () => import('@/views/table/complex-table'),
        name: '表格',
        meta: { title: '表格' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 重新渲染路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
