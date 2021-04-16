const user = require('./user')
const role = require('./role')
const article = require('./article')

const mocks = [
  ...user,
  ...role,
  ...article,
]

module.exports = {
  mocks
}
