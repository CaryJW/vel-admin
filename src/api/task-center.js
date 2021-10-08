import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/task/list',
    method: 'get'
  })
}

export function download(id) {
  return request({
    url: '/task/download/' + id,
    method: 'get',
    responseType: 'blob'
  })
}

export function progress(data) {
  return request({
    url: '/task/progress/',
    method: 'get',
    params: data
  })
}

export function del(id) {
  return request({
    url: '/task/delete/' + id,
    method: 'get'
  })
}

export function cancel(id) {
  return request({
    url: '/task/cancel/' + id,
    method: 'get'
  })
}
