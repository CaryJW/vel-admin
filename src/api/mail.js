import request from '@/utils/request'

export function sendCaptcha(params) {
  return request({
    url: '/mail/send-captcha',
    method: 'get',
    params: params
  })
}
