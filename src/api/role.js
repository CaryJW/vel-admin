import request from '@/utils/request'
import qs from 'qs'

export function fetchList(query) {
  return request({
    url: '/role/list',
    method: 'get',
    params: query
  })
}

export function getRoleMap() {
  return request({
    url: '/role/map',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateRole(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data: qs.stringify(data)
  })
}
