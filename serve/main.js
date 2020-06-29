/*
 * @Author: wl
 * @Date: 2020-06-13 11:00:41
 * @LastEditTime: 2020-06-13 19:06:10
 */

const koa = require('koa')
const app = new koa()

const bodyparser = require('koa-bodyparser')
const static = require('koa-static')


const config = require('./config')
const router = require("./src/router")

const { httpLog } = require('./config/log.config')

const { resData } = require('./src/common')
require('./src/model')


// 404
app.use(async (ctx, next) => {
    // 日志
    const path = ctx.path
    httpLog.info(ctx.method, path)
    await next();
    if (parseInt(ctx.status) === 404) {
        ctx.body = resData({ code: 404, msg: '404  not find ' })
    }
})

app.use(bodyparser())
// 静态文件
app.use(static(__dirname + "/public"))

// 路由
app.use(router.routes()).use(router.allowedMethods())


app.listen(config.port, (err) => {
    console.log('服务已启动');

})