import request from '@/utils/request'

// 订单列表
export function getOrderList(data) {
  return request({
    url: '/mall/order/list',
    method: 'post',
    data
  })
}
// 订单详情
export function getOrderDetail(data) {
  return request({
    url: '/mall/order/detail',
    method: 'post',
    data
  })
}
// 订单退款列表
export function getOrderRefundList(data) {
  return request({
    url: '/mall/order/refund/list',
    method: 'post',
    data
  })
}

// 订单退款详情
export function getOrderRefundDetail(data) {
  return request({
    url: '/mall/order/refund/detail',
    method: 'post',
    data
  })
}

// 订单评价列表
export function getOrderCommentList(data) {
  return request({
    url: '/mall/order/comment/list',
    method: 'post',
    data
  })
}
// 订单评价回复
export function getOrderCommentReply(data) {
  return request({
    url: '/mall/order/comment/reply',
    method: 'post',
    data
  })
}



