/**
 * @Author: [hsp]
 * @Date: 2020-06-23 13:12:51
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-06-23 15:45:29
 * @Description: order
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/home',
  meta: {
    title: '概况'
  },
  children: [{
    path: 'home',
    name: 'home',
    component: () => import('@/views/basic/index'),
    meta: {
      title: '概况'
    }
  }]
},
/**
 * 模板
 */
{
  path: '/template',
  component: Layout,
  redirect: '/template',
  meta: {
    title: '模板'
  },
  children: [{
    path: 'mall',
    name: 'mall',
    component: () => import('@/views/template/mall'),
    meta: {
      title: '商城页面'
    }
  }, {
    path: 'addMallPage',
    name: 'addMallPage',
    hidden: true,
    component: () => import('@/views/template/addMallPage'),
    meta: {
      title: '商城页面'
    }
  }, {
    path: 'mallColor',
    name: 'mallColor',
    component: () => import('@/views/template/mallColor'),
    meta: {
      title: '商城色系'
    }
  }, {
    path: 'productList',
    name: 'productList',
    component: () => import('@/views/template/productList'),
    meta: {
      title: '商品列表模板'
    }
  }, {
    path: 'user',
    name: 'user',
    component: () => import('@/views/template/user'),
    meta: {
      title: '个人中心模板'
    }
  }, {
    path: 'template',
    name: 'template',
    component: () => import('@/views/template/index'),
    meta: {
      title: '模板'
    }
  }]
},
/**
 * 商品
 */
{
  path: '/product',
  component: Layout,
  redirect: '/product',
  name: 'productbox',
  meta: {
    title: '商品'
  },
  children: [{
    path: 'product',
    name: 'product',
    component: () => import('@/views/product/index'),
    meta: {
      title: '商品管理'
    }
  }, {
    path: 'add_product',
    name: 'add_product',
    hidden: true,
    component: () => import('@/views/product/add_product'),
    meta: {
      title: '添加商品'
    }
  }, {
    path: 'import',
    name: 'import',
    component: () => import('@/views/product/import'),
    meta: {
      title: '批量导入'
    }
  }, {
    path: 'classify',
    name: 'classify',
    component: () => import('@/views/product/classify'),
    meta: {
      title: '商品分类'
    }
  }, {
    path: 'label',
    name: 'label',
    component: () => import('@/views/product/label'),
    meta: {
      title: '商品标签'
    }
  }]
},
/**
 * 订单
 */
{
  path: '/order',
  component: Layout,
  redirect: '/order',
  meta: {
    title: '订单'
  },
  children: [{
    path: 'order',
    name: 'order',
    component: () => import('@/views/order/index'),
    meta: {
      title: '订单管理'
    }
  },{
    path: 'order/details',
    name: 'order_details',
    component: () => import('@/components/order/orderDetails'),
  },{
    path: 'order/refundDetails',
    name: 'order_refund_details',
    component: () => import('@/components/order/orderRefundDetails'),
  }, {
    path: 'send_product',
    name: 'send_product',
    component: () => import('@/views/order/send_product'),
    meta: {
      title: '批量发货'
    }
  }, {
    path: 'refund_manage',
    name: 'refund_manage',
    component: () => import('@/views/order/refund_manage'),
    meta: {
      title: '退款管理'
    }
  }, {
    path: 'bulk_refund',
    name: 'bulk_refund',
    component: () => import('@/views/order/bulk_refund'),
    meta: {
      title: '批量退款'
    }
  }, {
    path: 'comment',
    name: 'comment',
    component: () => import('@/views/order/comment'),
    meta: {
      title: '评论管理'
    }
  }]
},
/**
 * 营销
 */
{
  path: '/market',
  component: Layout,
  redirect: '/market/seckill',
  meta: {
    title: '营销'
  },
  children: [{
    path: 'seckill',
    name: 'seckill',
    component: () => import('@/views/market/seckill'),
    meta: {
      title: '限时秒杀'
    }
  }, {
    path: 'group',
    name: 'group',
    component: () => import('@/views/market/group'),
    meta: {
      title: '多人拼团'
    }
  }, {
    path: 'coupon',
    name: 'coupon',
    component: () => import('@/views/market/coupon'),
    meta: {
      title: '优惠券'
    }
  }, {
    path: 'bargaining',
    name: 'bargaining',
    component: () => import('@/views/market/bargaining'),
    meta: {
      title: '好友砍价'
    }
  }, {
    path: 'rebate',
    name: 'rebate',
    component: () => import('@/views/market/rebate'),
    meta: {
      title: '满减满折'
    }
  }, {
    path: 'free_shipping',
    name: 'free_shipping',
    component: () => import('@/views/market/free_shipping'),
    meta: {
      title: '满包邮'
    }
  }]
},
/**
 * 客户
 */
{
  path: '/user',
  component: Layout,
  redirect: '/user',
  meta: {
    title: '客户'
  },
  children: [{
    path: 'user',
    name: 'user',
    component: () => import('@/views/user/index'),
    meta: {
      title: '客户管理'
    }
  }, {
    path: 'details',
    name: 'details',
    component: () => import('@/views/user/customerDetails'),
  },{
    path: 'customer_label',
    name: 'customer_label',
    component: () => import('@/views/user/customer_label'),
    meta: {
      title: '客户标签'
    }
  }, {
    path: 'blacklist',
    name: 'blacklist',
    component: () => import('@/views/user/blacklist'),
    meta: {
      title: '黑名单'
    }
  }, {
    path: 'member',
    name: 'member',
    component: () => import('@/views/user/member'),
    meta: {
      title: '会员管理'
    }
  }, {
    path: 'integral',
    name: 'integral',
    component: () => import('@/views/user/integral'),
    meta: {
      title: '积分设置'
    }
  }, {
    path: 'stored_value',
    name: 'stored_value',
    component: () => import('@/views/user/stored_value'),
    meta: {
      title: '储值设置'
    }
  }]
},
/**
 * 数据
 */
{
  path: '/data',
  component: Layout,
  redirect: '/data',
  meta: {
    title: '数据'
  },
  children: [{
    path: 'data',
    name: 'data',
    component: () => import('@/views/data/index'),
    meta: {
      title: '数据概况'
    }
  }, {
    path: 'passenger_flow',
    name: 'passenger_flow',
    component: () => import('@/views/data/passenger_flow'),
    meta: {
      title: '客流数据'
    }
  }, {
    path: 'sell',
    name: 'sell',
    component: () => import('@/views/data/sell'),
    meta: {
      title: '销售数据'
    }
  }, {
    path: 'product',
    name: 'product',
    component: () => import('@/views/data/product'),
    meta: {
      title: '商品数据'
    }
  }]
},
/**
 * 资金
 */
{
  path: '/capital',
  component: Layout,
  redirect: '/capital',
  meta: {
    title: '资金'
  },
  children: [{
    path: 'capital',
    name: 'capital',
    component: () => import('@/views/capital/acconut'),
    meta: {
      title: '资金概况'
    }
  }, {
    path: 'bill_statistics',
    name: 'bill_statistics',
    component: () => import('@/views/capital/bill_statistics'),
    meta: {
      title: '账单统计'
    }
  }, {
    path: 'transaction_detail',
    name: 'transaction_detail',
    component: () => import('@/views/capital/transaction_detail'),
    meta: {
      title: '交易明细'
    }
  }, {
    path: 'refund_detail',
    name: 'refund_detail',
    component: () => import('@/views/capital/refund_detail'),
    meta: {
      title: '退款明细'
    }
  }, {
    path: 'stored_value_detail',
    name: 'stored_value_detail',
    component: () => import('@/views/capital/stored_value_detail'),
    meta: {
      title: '储值明细'
    }
  }, {
    path: 'integral_detail',
    name: 'integral_detail',
    component: () => import('@/views/capital/integral_detail'),
    meta: {
      title: '积分明细'
    }
  }, {
    path: 'application',
    name: 'application',
    component: () => import('@/views/capital/application'),
    meta: {
      title: '功能应用'
    }
  }]
},
/**
 * 设置
 */
{
  path: '/setting',
  component: Layout,
  redirect: '/setting',
  children: [{
    path: 'setting',
    name: 'setting',
    component: () => import('@/views/setting/stores'),
    meta: {
      title: '设置'
    }
  }]
},
/**
 * 分销
 */
{
  path: '/distribution',
  component: Layout,
  redirect: '/distribution',
  children: [{
    path: 'distribution',
    name: 'distribution',
    component: () => import('@/views/distribution/index'),
    meta: {
      title: '分销'
    }
  }]
},
// {
//   path: '/example',
//   component: Layout,
//   redirect: '/example/table',
//   name: 'Example',
//   meta: {
//     title: 'Example'
//   },
//   children: [{
//     path: 'table',
//     name: 'Table',
//     component: () => import('@/views/tp/table/index'),
//     meta: {
//       title: 'Table'
//     }
//   },
//   {
//     path: 'tree',
//     name: 'Tree',
//     component: () => import('@/views/tp/tree/index'),
//     meta: {
//       title: 'Tree'
//     }
//   }
//   ]
// },
// {
//   path: '/form',
//   component: Layout,
//   children: [{
//     path: 'index',
//     name: 'Form',
//     component: () => import('@/views/tp/form/index'),
//     meta: {
//       title: 'Form'
//     }
//   }]
// },

// {
//   path: '/nested',
//   component: Layout,
//   redirect: '/nested/menu1',
//   name: 'Nested',
//   meta: {
//     title: 'Nested',
//     // icon: 'nested'
//   },
//   children: [{
//     path: 'menu1',
//     component: () => import('@/views/tp/nested/menu1/index'), // Parent router-view
//     name: 'Menu1',
//     meta: {
//       title: 'Menu1'
//     },
//     children: [{
//       path: 'menu1-1',
//       component: () => import('@/views/tp/nested/menu1/menu1-1'),
//       name: 'Menu1-1',
//       meta: {
//         title: 'Menu1-1'
//       }
//     },
//     {
//       path: 'menu1-2',
//       component: () => import('@/views/tp/nested/menu1/menu1-2'),
//       name: 'Menu1-2',
//       meta: {
//         title: 'Menu1-2'
//       },
//       children: [{
//         path: 'menu1-2-1',
//         component: () => import('@/views/tp/nested/menu1/menu1-2/menu1-2-1'),
//         name: 'Menu1-2-1',
//         meta: {
//           title: 'Menu1-2-1'
//         }
//       },
//       {
//         path: 'menu1-2-2',
//         component: () => import('@/views/tp/nested/menu1/menu1-2/menu1-2-2'),
//         name: 'Menu1-2-2',
//         meta: {
//           title: 'Menu1-2-2'
//         }
//       }
//       ]
//     },
//     {
//       path: 'menu1-3',
//       component: () => import('@/views/tp/nested/menu1/menu1-3'),
//       name: 'Menu1-3',
//       meta: {
//         title: 'Menu1-3'
//       }
//     }
//     ]
//   },
//   {
//     path: 'menu2',
//     component: () => import('@/views/tp/nested/menu2/index'),
//     meta: {
//       title: 'menu2'
//     }
//   }
//   ]
// },

// {
//   path: 'external-link',
//   component: Layout,
//   children: [{
//     path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
//     meta: {
//       title: 'Link'
//     }
//   }]
// },

// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
