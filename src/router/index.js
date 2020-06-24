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
export const constantRoutes = [
  {
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
    redirect: '/basic',
    children: [{
      path: 'basic',
      name: 'basic',
      component: () => import('@/views/basic/index'),
      meta: { title: '概况' }
    }]
  },
  /**
   * 模板
   */
  {
    path: '/template',
    component: Layout,
    redirect: '/template',
    children: [{
      path: 'template',
      name: 'template',
      component: () => import('@/views/template/index'),
      meta: { title: '模板' }
    }]
  },
  /**
* 商品
*/
  {
    path: '/product',
    component: Layout,
    redirect: '/product',
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/product/index'),
      meta: { title: '商品' }
    }]
  },
  /**
   * 订单
   */
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    children: [{
      path: 'order',
      name: 'order',
      component: () => import('@/views/order/index'),
      meta: { title: '订单' }
    }]
  },
  /**
  * 营销
  */
  {
    path: '/market',
    component: Layout,
    redirect: '/market',
    children: [{
      path: 'market',
      name: 'market',
      component: () => import('@/views/market/index'),
      meta: { title: '营销' }
    }]
  },
  /**
 * 客户
 */
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('@/views/user/index'),
      meta: { title: '客户' }
    }]
  },
  /**
  * 数据
  */
  {
    path: '/data',
    component: Layout,
    redirect: '/data',
    children: [{
      path: 'data',
      name: 'data',
      component: () => import('@/views/data/index'),
      meta: { title: '数据' }
    }]
  },
  /**
  * 资金
  */
  {
    path: '/capital',
    component: Layout,
    redirect: '/capital',
    children: [{
      path: 'capital',
      name: 'capital',
      component: () => import('@/views/capital/index'),
      meta: { title: '资金' }
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
      component: () => import('@/views/setting/index'),
      meta: { title: '设置' }
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
      meta: { title: '分销' }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/tp/table/index'),
        meta: { title: 'Table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tp/tree/index'),
        meta: { title: 'Tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/tp/form/index'),
        meta: { title: 'Form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      // icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/tp/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/tp/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/tp/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/tp/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/tp/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/tp/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/tp/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'Link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
