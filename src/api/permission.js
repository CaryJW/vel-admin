import request from '@/utils/request'

export function getPermissionList() {
  return request({
    url: '/permission/allList',
    method: 'get'
  })
}
