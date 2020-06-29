/*
 * @Author: wl
 * @Date: 2020-06-13 16:29:46
 * @LastEditTime: 2020-06-13 19:39:16
 */
const { verifyToken } = require('../utils/jwt')
const { resData } = require('../common')
const config = require('../../config')

// 过滤不需要认证的路由
const filterPath = ['/api/user/login','/api/user/sign']


module.exports = async (ctx, next) => {
    const path = ctx.path
    const token = ctx.cookies.get(config.cookieAuthName)
    // 查看是否在过滤名单
    if (filterPath.includes(path)) {
        return await next()
    }
    if (!token) return ctx.body = resData({ code: 401, msg: '认证信息不存在' })
    // 解析token 是否过期
    try {
        let result = await verifyToken(token)
        await next()
    } catch (error) {
        return ctx.body = resData({ code: 401, msg: '登录信息过期,重新登录' })
    }
}