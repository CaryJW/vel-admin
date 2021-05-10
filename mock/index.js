const user = require('./user')
const role = require('./role')
const article = require('./article')

const adminUser = require('./admin-user')

const mocks = [
  ...user,
  ...role,
  ...article,
  ...adminUser
]

module.exports = {
  mocks
}
