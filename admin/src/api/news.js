import request from '@/utils/request'

export function getNewsList(params) {
  return request({
    url: '/getNewsList',
    method: 'get',
    params
  })
}

export function getNewsDetail(params) {
  return request({
    url: '/getNewsDetail',
    method: 'get',
    params
  })
}
export function upDateNews(data) {
  return request({
    url: '/upDateNews',
    method: 'post',
    data
  })
}

export function openTimer() {
  return request({
    url:'/openTimer',
    method:'get'
  })
}
export function stopTimer(){
  return request({
    url:'/stopTimer',
    method:'get'
  })
}

export function timerStatus(){
  return request({
    url:'/timerStatus',
    method:'get',
  })
}