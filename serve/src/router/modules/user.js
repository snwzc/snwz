/*
 * @Author: wl
 * @Date: 2020-06-13 15:55:43
 * @LastEditTime: 2020-06-14 13:08:15
 */
const { resData } = require('../../common')
const { signToken } = require('../../utils/jwt')
const config = require('../../../config')
const { User, Admin } = require('../../model')
const { MD5 } = require('../../utils')


module.exports = {
    '/': {
        method: 'get',
        fn: async ctx => {

            const list = await User.findAll({
                attributes: { exclude: ['password', 'ip'] }
            })

            ctx.body = resData({ data: { list } })

        }
    },
    "/login": {
        method: "post",
        fn: async ctx => {
            const { username, password } = ctx.request.body
            if (!username || !password) return ctx.body = resData({ code: '402', msg: "缺少参数" })

            const result = await User.findOne({
                where: { username }
            })

            if (!result) {
                return ctx.body = resData({ msg: '用户不存在', code: 404 })
            }

            if (result.password == MD5(password)) {
                const token = await signToken({ username })
                ctx.cookies.set(config.cookieAuthName, token)
                return ctx.body = resData({ code: 200, msg: '登陆成功', data: { token } })
            } else {
                return ctx.body = resData({ code: 402, msg: '密码不正确' })
            }


        }
    },
    "/sign": {
        method: 'post',
        fn: async ctx => {
            const { username, password, user_email } = ctx.request.body

            if (!username || !password) return ctx.body = resData({ code: 402, msg: "缺少参数" })

            let result = await User.findOne({
                where: {
                    username
                }
            })

            if (result) return ctx.body = resData({ code: 401, msg: '用户已存在' })

            let data = await User.create({
                username,
                password: MD5(password),
                user_email,
                isDelete: '0'
            })

            if (data) return ctx.body = resData({ msg: '注册成功' })
        }
    },
    "/admin/login": {
        method: 'post',
        fn: async ctx => {
            const { username, password } = ctx.request.body;
            if (!username || !password) return ctx.body = resData({ code: 403, msg: '参数缺少' })

            const data = await Admin.findOne({ where: { username } })
            if (!data) return ctx.body = resData({ code: 402, msg: "账号不存在" })

            if (data.password == MD5(password)) {
                const token = signToken({ username })
                ctx.cookies.set(config.cookieAuthName, token)
                return ctx.body = resData({ data: token })
            } else {
                return ctx.body = resData({ code: 401, msg: '密码错误' })
            }
        }
    },
    "/admin/sign": {
        method: 'post',
        fn: async ctx => {

        }
    }
}