/*
 * @Author: wl
 * @Date: 2020-06-13 18:09:39
 * @LastEditTime: 2020-06-14 12:54:55
 */
const DB = require('../common/db')
const User = require("./modules/user")
const Admin = require("./modules/admin")

// 连接测试
DB.authenticate().catch(err => {
    console.log('錯誤信息' + err);
})

module.exports = {
    User,
    Admin
}