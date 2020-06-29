/*
 * @Date: 2020-01-07 18:04:58
 * @LastEditors  : WL
 * @LastEditTime : 2020-01-07 18:24:27
 */
import { Message, MessageBox } from 'element-ui'
export function confirm (txt) {
    return MessageBox.confirm(txt || '是否确定此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
}
export function message (type, txt) {
    Message({
        showClose: true,
        message: txt || '操作成功!',
        type: type || 'success'
    })
}
