/*
 * @Author: [hsp]
 * @Date: 2020-06-28 17:06:48
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-20 15:53:44
 * @Description: 
 */
const Router = require('koa-router');
// 页面生成
const AppRenderController = require('../controller/render');
module.exports = () => {
    const router = new Router();
    router.get('/', async (ctx, next) => {
        ctx.body = "首页222";
    }) // 首页
    //生成
    router.post('/api/app_render', AppRenderController.home)
    return router;
}