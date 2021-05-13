const tree = {
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
              'title': '',
              'component': '',
              'path': '',
              'perms': 'menu:add',
              'type': 1,
              'sort': 0,
              'createTime': '2021-04-27 03:39:09',
              'updateTime': '2021-05-13 14:39:26',
              'children': [

              ]
            },
            {
              'id': 25,
              'pid': 10,
              'icon': '',
              'name': '编辑',
              'title': '',
              'component': '',
              'path': '',
              'perms': 'menu:update',
              'type': 1,
              'sort': 0,
              'createTime': '2021-04-27 03:39:23',
              'updateTime': '2021-05-13 14:39:27',
              'children': [

              ]
            },
            {
              'id': 26,
              'pid': 10,
              'icon': '',
              'name': '删除',
              'title': '',
              'component': '',
              'path': '',
              'perms': 'menu:delete',
              'type': 1,
              'sort': 0,
              'createTime': '2021-04-27 03:39:49',
              'updateTime': '2021-05-13 14:39:28',
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
          'updateTime': '2021-05-13 14:38:45',
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
      'updateTime': '2021-05-13 14:38:51',
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
              'title': '',
              'component': '',
              'path': '',
              'perms': 'sys-log:list',
              'type': 1,
              'sort': 0,
              'createTime': '2021-04-27 03:43:01',
              'updateTime': '2021-05-13 14:39:28',
              'children': [

              ]
            },
            {
              'id': 29,
              'pid': 22,
              'icon': '',
              'name': '删除',
              'title': '',
              'component': '',
              'path': '',
              'perms': 'sys-log:delete',
              'type': 1,
              'sort': 0,
              'createTime': '2021-04-27 03:43:29',
              'updateTime': '2021-05-13 14:39:28',
              'children': [

              ]
            },
            {
              'id': 46,
              'pid': 22,
              'icon': '',
              'name': '导出',
              'title': '',
              'component': '',
              'path': '',
              'perms': 'sys-log:export',
              'type': 1,
              'sort': 0,
              'createTime': '2021-05-07 12:27:00',
              'updateTime': '2021-05-13 14:39:42',
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
          'updateTime': '2021-05-13 14:38:51',
          'children': [
            {
              'id': 30,
              'pid': 5,
              'icon': '',
              'name': '列表',
              'title': '',
              'component': '',
              'path': '',
              'perms': 'login-log:list',
              'type': 1,
              'sort': 0,
              'createTime': '2021-04-27 03:45:00',
              'updateTime': '2021-05-13 14:39:29',
              'children': [

              ]
            },
            {
              'id': 31,
              'pid': 5,
              'icon': '',
              'name': '删除',
              'title': '',
              'component': '',
              'path': '',
              'perms': 'login-log:delete',
              'type': 1,
              'sort': 0,
              'createTime': '2021-04-27 03:45:13',
              'updateTime': '2021-05-13 14:39:29',
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
              'title': '',
              'component': '',
              'path': '',
              'perms': 'online-user:list',
              'type': 1,
              'sort': 0,
              'createTime': '2021-04-27 03:45:55',
              'updateTime': '2021-05-13 14:39:30',
              'children': [

              ]
            },
            {
              'id': 33,
              'pid': 21,
              'icon': '',
              'name': '踢出用户',
              'title': '',
              'component': '',
              'path': '',
              'perms': 'online-user:kickout',
              'type': 1,
              'sort': 0,
              'createTime': '2021-04-27 03:46:09',
              'updateTime': '2021-05-13 14:39:31',
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
}

module.exports = [
  {
    url: '/permission/tree',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: tree,
        message: 'success'
      }
    }
  },

  {
    url: '/permission/add',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          permission: {
            'id': 6,
            'pid': 2,
            'icon': '',
            'name': '添加',
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
          }
        },
        message: 'success'
      }
    }
  },

  {
    url: '/permission/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },

  {
    url: '/permission/role/\.*',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          'permIds': [1, 10, 24, 25, 26, 2, 6, 7, 8, 9, 17, 18, 19, 20, 4, 22, 28, 29, 46, 5, 30, 31, 21, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45, 43, 44]
        },
        message: 'success'
      }
    }
  }
]
