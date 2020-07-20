import request from '@/utils/requestapi'

export function setStyleOptions(params) {
  return request({
    url: '/api/app_render',
    method: 'post',
    params
  })
}
