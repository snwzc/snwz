import store from '@/store'
// 自定义指令权限判断
export default {
    inserted (el, binding, vnode) {
        const { value } = binding
        const roles = store.getters && store.getters.roles

        if (value && value instanceof Array && value.length > 0) {
            const permissionRoles = value

            const hasPermission = roles.some(role => {
                return permissionRoles.includes(role)
            })

            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        } else {
            throw new Error('暂无此权限，请查看')
        }
    }
}
