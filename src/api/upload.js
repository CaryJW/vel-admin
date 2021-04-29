import request from '@/utils/request'

export function upload(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    },
    url: '/file-operation/upload',
    method: 'post',
    data: formData
  })
}

