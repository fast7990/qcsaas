/*
 * @Author: [hsp]
 * @Date: 2020-07-16 16:34:43
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-16 16:38:19
 * @Description: 
 */
const open = function () {
    const vm = this
    return [
        {
            // type：''  可以通过type类型来判断展示那些组件内容
            modules: [
                {
                    id: 'baseInfo',
                    refName: 'baseInfo',
                    component: () => import('@/components/BaseInfo/BaseInfo.vue')
                }
            ]
        }
    ]
}

export const openModules = vm => {
    return open.call(vm)
}