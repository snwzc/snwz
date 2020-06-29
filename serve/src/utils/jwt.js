/*
 * @Author: wl
 * @Date: 2020-06-13 16:29:57
 * @LastEditTime: 2020-06-13 19:33:26
 */

const jwt = require("jsonwebtoken")
const config = require('../../config')


// 生成token
function signToken(data) {
    if (!data) return false
    return new Promise((reslove, reject) => {
        jwt.sign(data, config.tokenSignString, { expiresIn: config.tokenTimeout }, (err, token) => {
            if (err) reject(err)
            reslove(token)
        })
    })
}

// 解析token
function verifyToken(token) {
    if (!token) return false
    return new Promise((reslove, reject) => {
        jwt.verify(token, config.tokenSignString, (err, data) => {
            if (err) reject(err)
            reslove(data)
        })

    })
}
module.exports = {
    signToken,
    verifyToken
}