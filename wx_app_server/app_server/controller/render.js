/*
 * @Author: [hsp]
 * @Date: 2020-06-28 17:17:49
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-07-17 17:48:56
 * @Description: 
 */
// const koa2Req = require('koa2-request')
const request = require('request'); //请求接口
const writeFileBuild = require('../util/writeFileBuild');
const apihost = 'http://internal.test01.qcw100.com/rest/2.0';
function getApiData(access_token) {
    return new Promise((reslove, reject) => {
        request(apihost + '/mall/page/list?access_token=' + access_token, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); reslove(err) }
            reslove(body)
        });
    })

}
class AppRenderController {
    constructor() { }
    // get获取前台参数 ctx.query
    // 获取轮播图
    static home(ctx, next) {
        const files = require('../mode/home');
        try {
            getApiData('ubedqj07b7nq53v78oafqlaaen').then(res => {
                console.log(JSON.stringify(res));
            })
            writeFileBuild.writeFile("./src/pages/home/index.vue", files([{ name: 'basecomp_lunbotu' }]).template);
            ctx.body = {
                message: '写入成功',
                success: true,
                data: 'success'
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