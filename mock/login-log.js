const Mock = require('mockjs')

const List = []
const count = 50
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    username: '@string(5, 10)',
    location: '内网IP|0|0|内网IP|内网IP',
    ip: '127.0.0.1',
    system: 'Windows 10',
    browser: 'Chrome 88',
    loginTime: +Mock.Random.date('T')
  }))
}

module.exports = [
  {
    url: '/login-log/list',
    type: 'get',
    response: config => {
      const { username, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
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
    url: '/login-log/delete/\.*',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  }
]
