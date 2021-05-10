const Mock = require('mockjs')

const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    createTime: +Mock.Random.date('T'),
    username: '@string(5, 10)',
    'operation|1': ['修改管理员用户密码', '更新角色', '添加权限', '删除权限'],
    time: 234,
    method: 'cc.cary.vel.adminapi.controllers.sys.AdminUserController.updatePassword()',
    params: ' passwordVo: UpdatePasswordVo(id=1, password=123456)',
    ip: '127.0.0.1',
    location: '内网IP|0|0|内网IP|内网IP',
    'type|1': [0, 1]
  }))
}

module.exports = [
  {
    url: '/log/list',
    type: 'get',
    response: config => {
      const { username, type, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (type && item.type !== parseInt(type)) return false
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
    url: '/log/export',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },

  {
    url: '/log/delete/\.*',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  }
]
