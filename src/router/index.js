import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* Router Modules */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
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
        path: '/user/home/',
        component: () => import('@/views/user/home'),
        name: 'userHome',
        meta: { title: '用户主页', noCache: true }
      }
    ]
  },
  {
    path: '/new-list',
    component: Layout,
    meta: { title: '新闻管理', icon: 'xinwen', affix: true },
    children: [
      {
        path: 'new-list',
        component: () => import('@/views/news/newList'),
        name: 'new-list',
        meta: { title: '新闻管理', affix: true }
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
    path: '/school-list',
    component: Layout,
    meta: { title: '学校管理', icon: 'xuexiao', noCache: true },
    children: [
      {
        path: '/school-list',
        component: () => import('@/views/school/schoolList'),
        name: 'school-list',
        meta: { title: '学校管理', noCache: true }
      },
      {
        path: '/school/detail',
        component: () => import('@/views/school/schoolDetail'),
        name: 'school-detail',
        hidden: true,
        meta: { title: '学校主页', noCache: true }
      }
    ]
  },
  {
    path: '/document',
    component: Layout,
    children: [
      {
        path: '/document',
        component: () => import('@/views/documents/documentList'),
        name: 'document-list',
        meta: { title: '试题管理', icon: 'zhenti', affix: true }
      }
    ]
  },
  {
    path: '/forum',
    component: Layout,
    children: [
      {
        path: '/forum',
        component: () => import('@/views/forum/list'),
        name: 'forum-list',
        meta: { title: '论坛管理', icon: 'luntan', affix: true }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    children: [
      {
        path: '/course',
        component: () => import('@/views/courses/courseList'),
        name: 'course-list',
        meta: { title: '课程管理', icon: 'kecheng', affix: true }
      }
    ]
  },
  {
    path: '/systems',
    component: Layout,
    redirect: '/systems',
    meta: { title: '系统管理', icon: 'xitong', noCache: true },
    children: [
      {
        path: '/systems/role',
        component: () => import('@/views/systems/roleList'),
        name: 'role-list',
        meta: { title: '角色管理', noCache: true }
      },
      {
        path: '/systems/menu',
        component: () => import('@/views/systems/menuList'),
        name: 'menu-list',
        meta: { title: '菜单管理', noCache: true }
      }
    ]
  },
  {
    path: '/opinion',
    component: Layout,
    children: [
      {
        path: '/opinion',
        component: () => import('@/views/opinion/opinionList'),
        name: 'course-list',
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
