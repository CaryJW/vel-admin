import request from '@/utils/request'
import qs from 'qs'

export function getTinymce() {
  return request({
    url: '/other/get-tinymce',
    method: 'get'
  })
}

export function saveTinymce(data) {
  return request({
    url: '/other/save-tinymce',
    method: 'post',
    data: qs.stringify(data)
  })
}
