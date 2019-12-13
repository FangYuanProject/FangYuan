import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* Router Modules */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user-list',
    meta: { title: '用户管理', icon: 'yonghu', noCache: true },
    children: [
      {
        path: '/user-list',
        component: () => import('@/views/user/list'),
        name: 'user-list',
        meta: { title: '用户列表', noCache: true }
      },
      {
        path: '/user-profile',
        component: () => import('@/views/user/home'),
        name: 'user-profile',
        meta: { title: '用户主页', noCache: true }
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    redirect: '/news-list',
    meta: { title: '新闻管理', icon: 'xinwen', affix: true },
    children: [
      {
        path: '/news-list',
        component: () => import('@/views/news/newList'),
        name: 'news-list',
        meta: { title: '新闻列表', affix: true }
      },
      {
        path: '/news-detail',
        component: () => import('@/views/news/newsDetail'),
        name: 'newsDetail',
        hidden: true,
        meta: { title: '新建新闻', affix: true }
      }
    ]
  },
  {
    path: '/school',
    component: Layout,
    redirect: '/school-list',
    meta: { title: '学校管理', icon: 'xuexiao', noCache: true },
    children: [
      {
        path: '/school-list',
        component: () => import('@/views/school/schoolList'),
        name: 'school-list',
        meta: { title: '学校管理', noCache: true }
      },
      {
        path: '/school-detail',
        component: () => import('@/views/school/schoolDetail'),
        name: 'school-detail',
        hidden: true,
        meta: { title: '学校主页', noCache: true }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redircet: '/test-list',
    children: [
      {
        path: '/test-list',
        component: () => import('@/views/documents/documentList'),
        name: 'document-list',
        meta: { title: '试题管理', icon: 'zhenti', affix: true }
      }
    ]
  },
  {
    path: '/post',
    component: Layout,
    redirect: '/post-list',
    children: [
      {
        path: '/post-list',
        component: () => import('@/views/forum/list'),
        name: 'forum-list',
        meta: { title: '论坛管理', icon: 'luntan', affix: true }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redircet: '/goods-list',
    children: [
      {
        path: '/goods-list',
        component: () => import('@/views/courses/courseList'),
        name: 'goods-list',
        meta: { title: '商品管理', icon: 'kecheng', affix: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/role',
    meta: { title: '系统管理', icon: 'xitong', noCache: true },
    children: [
      {
        path: '/system/role',
        component: () => import('@/views/systems/roleList'),
        name: 'role-list',
        meta: { title: '角色管理', noCache: true }
      },
      {
        path: '/system/menu',
        component: () => import('@/views/systems/menuList'),
        name: 'menu-list',
        meta: { title: '菜单管理', noCache: true }
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback-list',
    children: [
      {
        path: '/feedback-list',
        component: () => import('@/views/opinion/opinionList'),
        name: 'feedback-list',
        meta: { title: '意见反馈', icon: 'yijian', affix: true }
      }
    ]
  }
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'Profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
