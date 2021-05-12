const uploadResult = {
  fileName: 'f778738c-e4f8-4870-b634-56703b4acafe.gif',
  url: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
}

module.exports = [
  {
    url: '/file-operation/upload',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          uploadResult: uploadResult
        },
        message: 'success'
      }
    }
  }
]
