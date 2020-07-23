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
// 客户列表
export function userList(data) {
  return request({
    url: '/mall/user/list',
    method: 'post',
    data
  })
}
// 黑名单列表
export function blackLists(data) {
  return request({
    url: '/mall/user/disable_list',
    method: 'post',
    data
  })
}
// 加入黑名单
export function userAddBlackList(data) {
  return request({
    url: '/mall/user/disable',
    method: 'post',
    data
  })
}
// 移出黑名单
export function userRemoveBlackList(data) {
  return request({
    url: '/mall/user/enable',
    method: 'post',
    data
  })
}