/*
 * @Author: wl
 * @Date: 2020-06-13 15:07:31
 * @LastEditTime: 2020-06-13 16:19:53
 */




function resData({ code = 200, msg, data } = {}) {
    return {
        code,
        msg: msg || 'success',
        data
    }
}




module.exports = {
    resData
}