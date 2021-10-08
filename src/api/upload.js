import request from '@/utils/request'

export function upload(formData) {
  return request({
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    },
    url: '/file-operation/upload',
    method: 'post',
    data: formData
  })
}

