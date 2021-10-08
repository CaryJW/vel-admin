import request from '@/utils/request'
import qs from 'qs'

export function getConfigureByValue(value) {
  return request({
    url: '/configure/get-by-value/' + value,
    method: 'get'
  })
}

export function savePasswordStrategy(data) {
  return request({
    url: '/configure/save-password-strategy',
    method: 'post',
    data: qs.stringify(data)
  })
}
