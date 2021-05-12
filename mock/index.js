const adminUser = require('./admin-user')
const permission = require('./permission')
const role = require('./role')
const upload = require('./upload')
const log = require('./log')
const loginLog = require('./login-log')
const activeUser = require('./active-user')
const other = require('./other')

const mocks = [
  ...adminUser,
  ...permission,
  ...role,
  ...upload,
  ...log,
  ...loginLog,
  ...activeUser,
  ...other
]

module.exports = {
  mocks
}
