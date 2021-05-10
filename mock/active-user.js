const Mock = require('mockjs')

const List = []
const count = 50
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    userId: '@increment',
    username: '@string(5, 10)',
    'status|1': [0, 1],
    'current|1': [true, false],
    loginTime: +Mock.Random.date('T')

  }))
}

module.exports = [
  {
    url: '/active-user/list',
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
    url: '/active-user/kickout/\.*',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  }
]
