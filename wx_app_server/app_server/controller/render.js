/*
 * @Author: [hsp]
 * @Date: 2020-06-28 17:17:49
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-16 18:37:07
 * @Description: 
 */
// const koa2Req = require('koa2-request')
const writeFileBuild = require('../util/writeFileBuild')
const files = require('../mode/home')
class AppRenderController {
    constructor() { }
    // get获取前台参数 ctx.query
    // 获取轮播图
    static home(ctx, next) {
        try {
            console.log(JSON.stringify(ctx.query));
            writeFileBuild.path("index.vue");
            writeFileBuild.writeFile('1212');
            ctx.body = {
                message: '成功',
                success: true,
                data: '555'
            }
        } catch (e) {
            ctx.body = {
                message: e,
                success: false,
                code: 500
            }
        }
    }
}
module.exports = AppRenderController