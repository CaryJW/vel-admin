import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/active-user/list',
    method: 'get',
    params: query
  })
}

export function kickout(id) {
  return request({
    url: '/active-user/kickout/' + id,
    method: 'get'
  })
}
