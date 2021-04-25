import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/login-log/list',
    method: 'get',
    params: query
  })
}

export function del(id) {
  return request({
    url: '/login-log/delete/' + id,
    method: 'get'
  })
}
