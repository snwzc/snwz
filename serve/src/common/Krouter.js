/*
 * @Author: wl
 * @Date: 2020-06-13 15:10:47
 * @LastEditTime: 2020-06-13 16:45:10
 */

const Router = require('koa-router')

module.exports = (options, path) => {
    if (!path) return false

    const router = new Router({
        prefix: path
    })

    for (const url in options) {
        router[options[url].method](url, options[url].fn)
    }

    return router
}