import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/mall/user/login/login',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/mall/user/shop/info',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
export function userList(data) {
  return request({
    url: '/mall/user/list',
    method: 'post',data
  })
}
