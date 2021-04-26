import request from '@/utils/request'

export function getPermissionList() {
  return request({
    url: '/permission/allList',
    method: 'get'
  })
}

export function getTree() {
  return request({
    url: '/permission/tree',
    method: 'get'
  })
}

export function getCurrentUserTree() {
  return request({
    url: '/permission/current-user',
    method: 'get'
  })
}
