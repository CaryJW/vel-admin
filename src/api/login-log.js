import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/loginLog/list',
    method: 'get',
    params: query
  })
}

export function del(id) {
  return request({
    url: '/loginLog/delete',
    method: 'get',
    params: id
  })
}
