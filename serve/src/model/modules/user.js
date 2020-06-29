/*
 * @Author: wl
 * @Date: 2020-06-13 18:21:03
 * @LastEditTime: 2020-06-13 19:15:10
 */
const { Sequelize } = require('sequelize');
const DB = require('../../common/db')

// 同步数据库
// DB.sync()
const User = DB.define('snwz_user', {
    username: {
        type: Sequelize.STRING(64),
    },
    password: Sequelize.STRING(64),
    user_ip: Sequelize.STRING(32),
    user_email: Sequelize.STRING(32),
    isDelete: Sequelize.STRING(5)
})

module.exports = User