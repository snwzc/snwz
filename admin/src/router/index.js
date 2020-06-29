import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: '用户权限 1 admin 管理员 2 editor 编辑者 3 general 普通用户'	    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: '网站数据',
          icon: 'dashboard'
        }
      }
    ]
  },
  {
    path: '/updataWpd',
    component: Layout,
    children: [
      {
        path: '/updataWpd',
        name: 'UpdataPwd',
        component: () => import('@/views/updataPwd/index'),
        mate: {
          title: '修改密码'
        }
      }
    ],
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '/news',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '新闻',
      icon: 'tree'
    },
    children: [
      {
        path: '/news-list',
        name: 'NewsList',
        component: () => import('@/views/newsManage'),
        meta: {
          title: '新闻列表',
        }
      },{
        path: '/down-news',
        name: 'DownNews',
        component: () => import('@/views/newsManage/downNews'),
        meta: {
          title: '新闻抓取管理',
          roles:['admin']
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: '/user-manage',
        name: 'UserManage',
        component: () => import('@/views/userManage'),
        meta: {
          title: '用户列表',
          icon: 'user'
        }
      }
    ]
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router