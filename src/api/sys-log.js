import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/log/list',
    method: 'get',
    params: query
  })
}

export function del(id) {
  return request({
    url: '/log/delete/' + id,
    method: 'get'
  })
}

export function excelExport(query) {
  return request({
    url: '/log/export',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}
