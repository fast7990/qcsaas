import request from '@/utils/request'
// 搜索 获取数据列表
export function getProductList(data) {
    return request({
      url: '/mall/product/list',
      method: 'post',
      data
    })
}
// 添加
export function getProductCreate(data) {
    return request({
      url: '/mall/product/create',
      method: 'post',
      data
    })
}
// 上架
export function getProductOnShelf(data) {
  return request({
    url: '/mall/product/on_shelf',
    method: 'post',
    data
  })
}
// 下架
export function getProductOffShelf(data) {
  return request({
    url: '/mall/product/off_shelf',
    method: 'post',
    data
  })
}
// 获取商品分类
export function getProductCategoryList(data) {
  return request({
    url: '/mall/product/category/list',
    method: 'post',
    data
  })
}
// 添加商品分类
export function getProductCategoryCreate(data) {
  return request({
    url: '/mall/product/category/create',
    method: 'post',
    data
  })
}

// 创建标签
export function getProductTagCreate(data) {
  return request({
    url: '/mall/product/tag/create',
    method: 'post',
    data
  })
}
// 获取标签列表 
export function getProductTagList(data) {
  return request({
    url: '/mall/product/tag/list',
    method: 'post',
    data
  })
}
// 删除
export function getProductTagDelete(data) {
  return request({
    url: '/mall/product/tag/delete',
    method: 'post',
    data
  })
}