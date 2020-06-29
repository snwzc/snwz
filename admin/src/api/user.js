/*
 * @Date: 2019-12-23 16:58:44
 * @LastEditors  : WL
 * @LastEditTime : 2020-01-07 17:33:32
 */
import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
export function getUserList (params) {
  return request({
    url: '/getUserList',
    method: 'get',
    params
  })
}
export function upDataInfo (data) {
  return request({
    url: '/user/upDataUserInfo',
    method: 'post',
    data
  })
}
export function upDataPassword (data) {
  return request({
    url: '/user/updataPassword',
    method: 'post',
    data
  })
}
export function upDataJur (data) {
  return request({
    url: '/permissionUpdata',
    method: 'post',
    data
  })
}
export function addUser (data) {
  return request({
    url: '/user/sginIn',
    method: 'post',
    data
  })
}
