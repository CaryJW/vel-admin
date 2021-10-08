import request from '@/utils/request'
import qs from 'qs'

export function captcha() {
  return request({
    url: '/site/captcha',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/site/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/site/current-user-info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/site/logout',
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
    data: qs.stringify(data)
  })
}

export function updateAdminUser(data) {
  return request({
    url: '/admin-user/update',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function updatePassword(data) {
  return request({
    url: '/admin-user/update-password',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function ownUpdatePassword(data) {
  return request({
    url: '/admin-user/own-update-password',
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
