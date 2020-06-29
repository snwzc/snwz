/*
 * @Author: wl
 * @Date: 2020-06-14 12:41:01
 * @LastEditTime: 2020-06-14 12:55:47
 */
const DB = require('../../common/db')
const sequelize = require('sequelize')

// DB.sync()
module.exports = DB.define('admin_user', {
    username: sequelize.STRING(32),
    password: sequelize.STRING(64),
    status: sequelize.TINYINT(5)
})



