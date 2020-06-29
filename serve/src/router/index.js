/*
 * @Author: wl
 * @Date: 2020-06-13 15:06:41
 * @LastEditTime: 2020-06-13 17:03:31
 */

const fs = require('fs')

const Router = require('koa-router')
const Krouter = require('../common/Krouter')
const auth = require('../common/auth')

const router = new Router({
    prefix: '/api'
})

// 鉴权
router.use(auth)


krouter()

function krouter() {
    const rList = fs.readdirSync(__dirname + "/modules")
    for (let i = 0; i < rList.length; i++) {
        const path = '/' + rList[i].split('.')[0]
        let routers = require('./modules' + path)
        router.use(Krouter(routers, path).routes())
    }
}



module.exports = router