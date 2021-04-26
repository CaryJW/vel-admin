import request from '@/utils/request'
import qs from 'qs'

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

export function add(data) {
  return request({
    url: '/permission/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function update(data) {
  return request({
    url: '/permission/update',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function del(id) {
  return request({
    url: '/permission/delete/' + id,
    method: 'get'
  })
}

export function rolePerms(id) {
  return request({
    url: '/permission/role/' + id,
    method: 'get'
  })
}

