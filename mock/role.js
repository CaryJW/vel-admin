const Mock = require('mockjs')

const List = []
const count = 2
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    'id|1': [1, 2],
    createTime: +Mock.Random.date('T'),
    updateTime: +Mock.Random.date('T'),
    'roleName|1': ['管理员', '超级管理员'],
    'remarks|1': ['拥有绝大部分权限', '拥有全部权限'],
    'adminUserId': null,
    'permIds': null
  }))
}

module.exports = [
  {
    url: '/role/map',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          roleMap: {
            1: '超级管理员',
            2: '管理员'
          }
        },
        message: 'success'
      }
    }
  },

  {
    url: '/role/list',
    type: 'get',
    response: config => {
      const { roleName, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (roleName && item.roleName.indexOf(roleName) < 0) return false
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
    url: '/role/add',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },

  {
    url: '/role/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  }
]
