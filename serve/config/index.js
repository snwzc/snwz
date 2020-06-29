/*
 * @Author: wl
 * @Date: 2020-06-13 15:03:29
 * @LastEditTime: 2020-06-13 20:03:43
 */
const pro = require('./config.pro')
const dev = require('./config.dev')

const config = process.env.NODE_ENV == 'dev' ? dev : pro

module.exports = {
    port: 3000,
    // cookies
    cookieAuthName: 'snwzc-t',
    // jwt 设置
    tokenSignString: "snwzc_blog",
    tokenTimeout: '24h',

    // 环境相关配置
    ...config
}