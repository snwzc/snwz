/*
 * @Author: wl
 * @Date: 2020-06-13 15:07:25
 * @LastEditTime: 2020-06-13 16:45:45
 */

const md5js = require('md5.js')



// MD5 加密
function MD5(str) {
    if (!str) return false
    return new md5js().update(str).digest('hex')
}



module.exports = {
    MD5
}