/*
 * @Author: wl
 * @Date: 2020-06-13 18:18:21
 * @LastEditTime: 2020-06-13 18:44:11
 */
const config = require('../../config')
const sequelize = require('sequelize')

const DB = new sequelize(config.sequezlie)



module.exports = DB