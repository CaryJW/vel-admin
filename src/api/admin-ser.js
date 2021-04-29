import request from '@/utils/request'
import qs from 'qs'

export function captcha() {
  return request({
    url: '/captcha',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/current-user-info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: '/admin-user/list',
    method: 'get',
    params: query
  })
}

export function addAdminUser(data) {
  return request({
    url: '/admin-user/add',
    method: 'post',
    // https://my.oschina.net/u/4636724/blog/4540395
    data: qs.stringify(data, { indices: false })
  })
}

export function updateAdminUser(data) {
  return request({
    url: '/admin-user/update',
    method: 'post',
    data: qs.stringify(data, { indices: false })
  })
}

export function updatePassword(data) {
  return request({
    url: '/admin-user/update-password',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateUsername(data) {
  return request({
    url: '/admin-user/update-username',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updateAvatar(data) {
  return request({
    url: '/admin-user/update-avatar',
    method: 'post',
    data: qs.stringify(data)
  })
}
