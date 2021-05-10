const captcha = 'data:image/png;base64,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'
const tokens = {
  admin: {
    token: 'admin-token'
  },
  user: {
    token: 'user-token'
  }
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
        data: {
          token: token
        },
        message: 'success'
      }
    }
  }

  // get user info
  // {
  //   url: '/current-user-info',
  //   type: 'get',
  //   response: config => {
  //     // const { token } = config.query
  //     // const info = users[token]
  //
  //     // mock error
  //     if (!info) {
  //       return {
  //         code: 50008,
  //         message: 'Login failed, unable to get user details.'
  //       }
  //     }
  //
  //     return {
  //       code: 20000,
  //       data: info
  //     }
  //   }
  // },
]
