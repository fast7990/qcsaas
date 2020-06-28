/*
 * @Descripttion: 
 * @version: 
 * @Author: huangshaopeng
 * @Date: 2020-06-04 22:15:19
 * @LastEditors: [hsp]
 * @LastEditTime: 2020-06-28 19:24:26
 */
var http = require('http'); //用来启服务
const https = require('https')
// var fs = require('fs'); //用来读取文件
// var url = require('url');//引入url模块
// var path = require('path');//引入path模块
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
const config = require('./app_server/config.js')
const { default: enforceHttps } = require('koa-sslify')
const logger = require('./app_server/log')
const Koa = require('koa');
const app = new Koa();
// Routes
const router = require('./app_server/router/index')();

// app.use(enforceHttps());
app.use(bodyParser());
app.use(cors({
    origin: '*',
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// http错误处理
const errHandle = async (ctx, next) => {
    try {
        logger.info('方法：' + ctx.method + '-' + '接口名：' + ctx.url + ',' + 'body:' + JSON.stringify(ctx.request.body))
        next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500
        ctx.body = err.message
        logger.error('错误为：', err, err.statusCode)
    }
}
app.use(errHandle) // http_err
app.use(router.routes());
app.use(router.allowedMethods());
// SSL options
var options = {
    key: '',  //ssl文件路径
    cert: ''  //ssl文件路径
}
// http 请求
http.createServer(app.callback()).listen(config.httpport, () => {
    console.log(`listen in http://localhost:${config.httpport}`)
})
// https 请求
// https.createServer(options, app.callback()).listen(config.httpsport, () => {
//     console.log(`listen in https://localhost:${config.httpsport}`)
// })

// app.listen(config.httpport, () => {
//     console.log(`listen in http://localhost:${config.httpport}`)
// })