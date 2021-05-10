const Mock = require('mockjs')

const captcha = 'data:image/png;base64,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'
const avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  user: {
    token: 'user-token'
  }
}
const users = {
  'admin-token': {
    user: {
      'id': 1,
      'username': 'admin',
      'realname': '江大大',
      avatar,
      'status': 0,
      'password': 'e10adc3949ba59abbe56e057f20f883e',
      'loginTime': '2021-05-10 15:23:27',
      'createTime': '2021-04-20 15:46:11',
      'updateTime': '2021-04-27 16:11:43',
      'roles': null
    },
    permissionInfo: {
      'roles': [
        '超级管理员'
      ],
      'stringPermissions': [
        'sys-log:delete',
        'other_back-to-top',
        'other_clipboard',
        'role:update',
        'sys_admin-user',
        'monitor_online-user',
        'other_icons',
        'sys-log:export',
        'monitor_sys-log',
        'role:add',
        'sys_role',
        'online-user:list',
        'login-log:list',
        'other_excel_merge-header',
        'menu:update',
        'other_count-to',
        'other_upload-excel',
        'role:list',
        '_monitor',
        'menu:delete',
        'online-user:kickout',
        'admin-user:add',
        'other_tinymce',
        '_sys',
        'admin-user:list',
        'admin-user:update',
        'sys-log:list',
        'menu:add',
        'other_excel_export',
        'sys_menu',
        'other_excel',
        'password:update',
        'login-log:delete',
        'other_zip',
        'monitor_login-log',
        '_other'
      ],
      'objectPermissions': null
    }
  },
  'user-token': {
    user: {
      'id': 2,
      'username': 'user',
      'realname': '盛大大',
      avatar,
      'status': 0,
      'password': 'e10adc3949ba59abbe56e057f20f883e',
      'loginTime': '2021-05-10 15:39:41',
      'createTime': '2021-04-21 17:03:48',
      'updateTime': '2021-04-27 16:10:04',
      'roles': null
    },
    permissionInfo: {
      'roles': [
        '管理员'
      ],
      'stringPermissions': [
        'sys-log:list',
        'sys-log:delete',
        'monitor_online-user',
        'sys-log:export',
        '_monitor',
        'monitor_sys-log',
        'online-user:list',
        'monitor_login-log',
        'login-log:list'
      ],
      'objectPermissions': null
    }
  }
}
const menus = {
  'admin-token': {
    tree: [
      {
        'id': 1,
        'pid': 0,
        'icon': 'el-icon-setting',
        'name': '系统管理',
        'title': '系统管理',
        'component': 'Layout',
        'path': '/sys',
        'perms': '_sys',
        'type': 0,
        'sort': 0,
        'createTime': '2021-04-26 15:47:21',
        'updateTime': '2021-04-27 14:04:54',
        'children': [
          {
            'id': 10,
            'pid': 1,
            'icon': '',
            'name': '菜单管理',
            'title': '菜单管理',
            'component': '/sys/menu',
            'path': 'menu',
            'perms': 'sys_menu',
            'type': 0,
            'sort': 0,
            'createTime': '2021-04-26 17:25:18',
            'updateTime': '2021-04-27 14:04:31',
            'children': [
              {
                'id': 24,
                'pid': 10,
                'icon': '',
                'name': '新增',
                'title': '菜单管理',
                'component': '/sys/menu',
                'path': 'menu',
                'perms': 'menu:add',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:39:09',
                'updateTime': '2021-05-10 10:42:17',
                'children': [

                ]
              },
              {
                'id': 25,
                'pid': 10,
                'icon': '',
                'name': '编辑',
                'title': '菜单管理',
                'component': '/sys/menu',
                'path': 'menu',
                'perms': 'menu:update',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:39:23',
                'updateTime': '2021-05-10 10:42:19',
                'children': [

                ]
              },
              {
                'id': 26,
                'pid': 10,
                'icon': '',
                'name': '删除',
                'title': '菜单管理',
                'component': '/sys/menu',
                'path': 'menu',
                'perms': 'menu:delete',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:39:49',
                'updateTime': '2021-05-10 10:42:21',
                'children': [

                ]
              }
            ]
          },
          {
            'id': 2,
            'pid': 1,
            'icon': '',
            'name': '管理员用户',
            'title': '管理员用户',
            'component': '/sys/admin-user',
            'path': 'admin-user',
            'perms': 'sys_admin-user',
            'type': 0,
            'sort': 1,
            'createTime': '2021-04-26 15:49:01',
            'updateTime': '2021-04-27 14:05:42',
            'children': [
              {
                'id': 6,
                'pid': 2,
                'icon': '',
                'name': '列表',
                'title': '',
                'component': '',
                'path': '',
                'perms': 'admin-user:list',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-26 15:52:47',
                'updateTime': '2021-05-10 10:41:48',
                'children': [

                ]
              },
              {
                'id': 7,
                'pid': 2,
                'icon': '',
                'name': '新增',
                'title': '',
                'component': '',
                'path': '',
                'perms': 'admin-user:add',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-26 15:53:03',
                'updateTime': '2021-05-10 10:41:53',
                'children': [

                ]
              },
              {
                'id': 8,
                'pid': 2,
                'icon': '',
                'name': '编辑',
                'title': '',
                'component': '',
                'path': '',
                'perms': 'admin-user:update',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-26 15:53:43',
                'updateTime': '2021-05-10 10:41:55',
                'children': [

                ]
              },
              {
                'id': 9,
                'pid': 2,
                'icon': '',
                'name': '修改密码',
                'title': '',
                'component': '',
                'path': '',
                'perms': 'password:update',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-26 15:54:35',
                'updateTime': '2021-05-10 10:42:01',
                'children': [

                ]
              }
            ]
          },
          {
            'id': 17,
            'pid': 1,
            'icon': '',
            'name': '角色权限',
            'title': '角色权限',
            'component': '/sys/role',
            'path': 'role',
            'perms': 'sys_role',
            'type': 0,
            'sort': 2,
            'createTime': '2021-04-27 00:40:13',
            'updateTime': '2021-04-27 14:05:53',
            'children': [
              {
                'id': 18,
                'pid': 17,
                'icon': '',
                'name': '列表',
                'title': '',
                'component': '',
                'path': '',
                'perms': 'role:list',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 00:41:16',
                'updateTime': '2021-05-10 10:42:07',
                'children': [

                ]
              },
              {
                'id': 19,
                'pid': 17,
                'icon': '',
                'name': '新增',
                'title': '',
                'component': '',
                'path': '',
                'perms': 'role:add',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 00:42:53',
                'updateTime': '2021-05-10 10:42:09',
                'children': [

                ]
              },
              {
                'id': 20,
                'pid': 17,
                'icon': '',
                'name': '编辑',
                'title': '',
                'component': '',
                'path': '',
                'perms': 'role:update',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 00:43:16',
                'updateTime': '2021-05-10 10:42:13',
                'children': [

                ]
              }
            ]
          }
        ]
      },
      {
        'id': 4,
        'pid': 0,
        'icon': 'el-icon-sunrise',
        'name': '系统监控',
        'title': '系统监控',
        'component': 'Layout',
        'path': '/monitor',
        'perms': '_monitor',
        'type': 0,
        'sort': 1,
        'createTime': '2021-04-26 15:49:55',
        'updateTime': '2021-04-27 14:05:01',
        'children': [
          {
            'id': 22,
            'pid': 4,
            'icon': '',
            'name': '系统日志',
            'title': '系统日志',
            'component': '/monitor/sys-log',
            'path': 'sys-log',
            'perms': 'monitor_sys-log',
            'type': 0,
            'sort': 0,
            'createTime': '2021-04-27 00:49:19',
            'updateTime': '2021-04-27 14:06:11',
            'children': [
              {
                'id': 28,
                'pid': 22,
                'icon': '',
                'name': '列表',
                'title': '登录日志',
                'component': '/monitor/login-log',
                'path': 'login-log',
                'perms': 'sys-log:list',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:43:01',
                'updateTime': '2021-05-10 10:41:14',
                'children': [

                ]
              },
              {
                'id': 29,
                'pid': 22,
                'icon': '',
                'name': '删除',
                'title': '登录日志',
                'component': '/monitor/login-log',
                'path': 'login-log',
                'perms': 'sys-log:delete',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:43:29',
                'updateTime': '2021-05-10 10:42:32',
                'children': [

                ]
              },
              {
                'id': 46,
                'pid': 22,
                'icon': '',
                'name': '导出',
                'title': '系统日志',
                'component': '/monitor/sys-log',
                'path': 'sys-log',
                'perms': 'sys-log:export',
                'type': 1,
                'sort': 0,
                'createTime': '2021-05-07 12:27:00',
                'updateTime': '2021-05-10 10:42:53',
                'children': [

                ]
              }
            ]
          },
          {
            'id': 5,
            'pid': 4,
            'icon': '',
            'name': '登录日志',
            'title': '登录日志',
            'component': '/monitor/login-log',
            'path': 'login-log',
            'perms': 'monitor_login-log',
            'type': 0,
            'sort': 1,
            'createTime': '2021-04-26 15:50:46',
            'updateTime': '2021-04-27 14:06:17',
            'children': [
              {
                'id': 30,
                'pid': 5,
                'icon': '',
                'name': '列表',
                'title': '登录日志',
                'component': '/monitor/login-log',
                'path': 'login-log',
                'perms': 'login-log:list',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:45:00',
                'updateTime': '2021-05-10 10:42:36',
                'children': [

                ]
              },
              {
                'id': 31,
                'pid': 5,
                'icon': '',
                'name': '删除',
                'title': '登录日志',
                'component': '/monitor/login-log',
                'path': 'login-log',
                'perms': 'login-log:delete',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:45:13',
                'updateTime': '2021-05-10 10:42:38',
                'children': [

                ]
              }
            ]
          },
          {
            'id': 21,
            'pid': 4,
            'icon': '',
            'name': '在线用户',
            'title': '在线用户',
            'component': '/monitor/online-user',
            'path': 'online-user',
            'perms': 'monitor_online-user',
            'type': 0,
            'sort': 2,
            'createTime': '2021-04-27 00:48:46',
            'updateTime': '2021-04-27 14:06:22',
            'children': [
              {
                'id': 32,
                'pid': 21,
                'icon': '',
                'name': '列表',
                'title': '在线用户',
                'component': '/monitor/online-user',
                'path': 'online-user',
                'perms': 'online-user:list',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:45:55',
                'updateTime': '2021-05-10 10:42:40',
                'children': [

                ]
              },
              {
                'id': 33,
                'pid': 21,
                'icon': '',
                'name': '踢出用户',
                'title': '在线用户',
                'component': '/monitor/online-user',
                'path': 'online-user',
                'perms': 'online-user:kickout',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:46:09',
                'updateTime': '2021-05-10 10:42:43',
                'children': [

                ]
              }
            ]
          }
        ]
      },
      {
        'id': 34,
        'pid': 0,
        'icon': 'el-icon-guide',
        'name': '其他模块',
        'title': '其他模块',
        'component': 'Layout',
        'path': '/other',
        'perms': '_other',
        'type': 0,
        'sort': 3,
        'createTime': '2021-04-27 16:44:19',
        'updateTime': '2021-04-27 16:44:19',
        'children': [
          {
            'id': 35,
            'pid': 34,
            'icon': '',
            'name': '富文本',
            'title': '富文本',
            'component': '/other/tinymce',
            'path': 'tinymce',
            'perms': 'other_tinymce',
            'type': 0,
            'sort': 0,
            'createTime': '2021-04-29 23:49:57',
            'updateTime': '2021-04-29 23:50:13',
            'children': [

            ]
          },
          {
            'id': 36,
            'pid': 34,
            'icon': '',
            'name': '返回顶部',
            'title': '返回顶部',
            'component': '/other/back-to-top',
            'path': 'back-to-top',
            'perms': 'other_back-to-top',
            'type': 0,
            'sort': 1,
            'createTime': '2021-04-30 11:13:06',
            'updateTime': '2021-04-30 11:48:26',
            'children': [

            ]
          },
          {
            'id': 37,
            'pid': 34,
            'icon': '',
            'name': '数字滑动',
            'title': '数字滑动',
            'component': '/other/count-to',
            'path': 'count-to',
            'perms': 'other_count-to',
            'type': 0,
            'sort': 2,
            'createTime': '2021-04-30 11:48:22',
            'updateTime': '2021-04-30 11:48:22',
            'children': [

            ]
          },
          {
            'id': 38,
            'pid': 34,
            'icon': '',
            'name': '图标',
            'title': '图标',
            'component': '/other/icons',
            'path': 'icon',
            'perms': 'other_icons',
            'type': 0,
            'sort': 3,
            'createTime': '2021-04-30 13:09:47',
            'updateTime': '2021-04-30 14:27:03',
            'children': [

            ]
          },
          {
            'id': 39,
            'pid': 34,
            'icon': '',
            'name': '复制',
            'title': '复制',
            'component': '/other/clipboard',
            'path': 'clipboard',
            'perms': 'other_clipboard',
            'type': 0,
            'sort': 4,
            'createTime': '2021-04-30 15:10:56',
            'updateTime': '2021-04-30 15:10:56',
            'children': [

            ]
          },
          {
            'id': 40,
            'pid': 34,
            'icon': 'excel',
            'name': 'Excel',
            'title': 'Excel',
            'component': '/other/excel/index',
            'path': 'excel',
            'perms': 'other_excel',
            'type': 0,
            'sort': 5,
            'createTime': '2021-04-30 15:33:30',
            'updateTime': '2021-04-30 15:54:02',
            'children': [
              {
                'id': 41,
                'pid': 40,
                'icon': '',
                'name': '导出 Excel',
                'title': '导出 Excel',
                'component': '/other/excel/export-excel',
                'path': 'export',
                'perms': 'other_excel_export',
                'type': 0,
                'sort': 0,
                'createTime': '2021-04-30 15:35:10',
                'updateTime': '2021-04-30 15:35:10',
                'children': [

                ]
              },
              {
                'id': 45,
                'pid': 40,
                'icon': '',
                'name': '上传 Excel',
                'title': '上传 Excel',
                'component': '/other/excel/upload-excel',
                'path': 'upload-excel',
                'perms': 'other_upload-excel',
                'type': 0,
                'sort': 0,
                'createTime': '2021-04-30 17:56:02',
                'updateTime': '2021-04-30 17:56:02',
                'children': [

                ]
              },
              {
                'id': 43,
                'pid': 40,
                'icon': '',
                'name': '导出 多级表头',
                'title': '导出 多级表头',
                'component': '/other/excel/merge-header',
                'path': 'merge-header',
                'perms': 'other_excel_merge-header',
                'type': 0,
                'sort': 1,
                'createTime': '2021-04-30 17:31:17',
                'updateTime': '2021-04-30 17:54:37',
                'children': [

                ]
              }
            ]
          },
          {
            'id': 44,
            'pid': 34,
            'icon': 'zip',
            'name': 'Zip',
            'title': 'Zip',
            'component': '/other/zip',
            'path': 'zip',
            'perms': 'other_zip',
            'type': 0,
            'sort': 6,
            'createTime': '2021-04-30 17:47:53',
            'updateTime': '2021-04-30 17:47:53',
            'children': [

            ]
          }
        ]
      }
    ]
  },
  'user-token': {
    tree: [
      {
        'id': 4,
        'pid': 0,
        'icon': 'el-icon-sunrise',
        'name': '系统监控',
        'title': '系统监控',
        'component': 'Layout',
        'path': '/monitor',
        'perms': '_monitor',
        'type': 0,
        'sort': 1,
        'createTime': '2021-04-26 15:49:55',
        'updateTime': '2021-04-27 14:05:01',
        'children': [
          {
            'id': 22,
            'pid': 4,
            'icon': '',
            'name': '系统日志',
            'title': '系统日志',
            'component': '/monitor/sys-log',
            'path': 'sys-log',
            'perms': 'monitor_sys-log',
            'type': 0,
            'sort': 0,
            'createTime': '2021-04-27 00:49:19',
            'updateTime': '2021-04-27 14:06:11',
            'children': [
              {
                'id': 28,
                'pid': 22,
                'icon': '',
                'name': '列表',
                'title': '登录日志',
                'component': '/monitor/login-log',
                'path': 'login-log',
                'perms': 'sys-log:list',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:43:01',
                'updateTime': '2021-05-10 10:41:14',
                'children': [

                ]
              },
              {
                'id': 29,
                'pid': 22,
                'icon': '',
                'name': '删除',
                'title': '登录日志',
                'component': '/monitor/login-log',
                'path': 'login-log',
                'perms': 'sys-log:delete',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:43:29',
                'updateTime': '2021-05-10 10:42:32',
                'children': [

                ]
              },
              {
                'id': 46,
                'pid': 22,
                'icon': '',
                'name': '导出',
                'title': '系统日志',
                'component': '/monitor/sys-log',
                'path': 'sys-log',
                'perms': 'sys-log:export',
                'type': 1,
                'sort': 0,
                'createTime': '2021-05-07 12:27:00',
                'updateTime': '2021-05-10 10:42:53',
                'children': [

                ]
              }
            ]
          },
          {
            'id': 5,
            'pid': 4,
            'icon': '',
            'name': '登录日志',
            'title': '登录日志',
            'component': '/monitor/login-log',
            'path': 'login-log',
            'perms': 'monitor_login-log',
            'type': 0,
            'sort': 1,
            'createTime': '2021-04-26 15:50:46',
            'updateTime': '2021-04-27 14:06:17',
            'children': [
              {
                'id': 30,
                'pid': 5,
                'icon': '',
                'name': '列表',
                'title': '登录日志',
                'component': '/monitor/login-log',
                'path': 'login-log',
                'perms': 'login-log:list',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:45:00',
                'updateTime': '2021-05-10 10:42:36',
                'children': [

                ]
              }
            ]
          },
          {
            'id': 21,
            'pid': 4,
            'icon': '',
            'name': '在线用户',
            'title': '在线用户',
            'component': '/monitor/online-user',
            'path': 'online-user',
            'perms': 'monitor_online-user',
            'type': 0,
            'sort': 2,
            'createTime': '2021-04-27 00:48:46',
            'updateTime': '2021-04-27 14:06:22',
            'children': [
              {
                'id': 32,
                'pid': 21,
                'icon': '',
                'name': '列表',
                'title': '在线用户',
                'component': '/monitor/online-user',
                'path': 'online-user',
                'perms': 'online-user:list',
                'type': 1,
                'sort': 0,
                'createTime': '2021-04-27 03:45:55',
                'updateTime': '2021-05-10 10:42:40',
                'children': [

                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

const List = []
const count = 3
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    createTime: +Mock.Random.date('T'),
    updateTime: +Mock.Random.date('T'),
    username: '@string(5, 10)',
    realname: '@string(5, 10)',
    avatar,
    'status|1': [0, 1],
    password: '@string(6, 12)',
    loginTime: +Mock.Random.date('T'),
    roles: [{
      'id|1': [1, 2],
      'roleName|1': ['管理员', '超级管理员'],
      'remarks': '拥有绝大部分权限',
      'createTime': +Mock.Random.date('T'),
      'updateTime': +Mock.Random.date('T'),
      'adminUserId': '@increment',
      'permIds': null
    }]
  }))
}

module.exports = [
  // captcha
  {
    url: '/captcha',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          key: 'CAPTCHA_117d2f8e-dcb3-4e96-82bf-e68aa3a8929b',
          captcha: captcha
        },
        message: 'success'
      }
    }
  },

  // user login
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      if (!token) {
        return {
          code: 40000,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token,
        message: 'success'
      }
    }
  },

  // get user info
  {
    url: '/current-user-info',
    type: 'get',
    response: config => {
      const { authorization } = config.headers
      const info = users[authorization]

      // mock error
      if (!authorization) {
        return {
          code: 40001,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info,
        message: 'success'
      }
    }
  },

  // get user menus
  {
    url: '/permission/current-user',
    type: 'get',
    response: config => {
      const { authorization } = config.headers
      const info = menus[authorization]

      // mock error
      if (!authorization) {
        return {
          code: 40001,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/logout',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },

  // update username
  {
    url: '/admin-user/update-username',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },

  // update password
  {
    url: '/admin-user/update-password',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },

  {
    url: '/admin-user/list',
    type: 'get',
    response: config => {
      const { username, status, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (status && item.status !== parseInt(status)) return false
        if (username && item.username.indexOf(username) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        },
        message: 'success'
      }
    }
  },

  {
    url: '/admin-user/add',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },

  {
    url: '/admin-user/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  }

]
