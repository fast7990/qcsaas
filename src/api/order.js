import request from '@/utils/request'

// 订单退款列表
export function getOrderRefundList(data) {
  return request({
    url: '/mall/order/refund/list',
    method: 'post',
    data
  })
}

