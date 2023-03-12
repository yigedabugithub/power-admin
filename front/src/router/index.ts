import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    // 首页
    path: '/',
    name: '/',
    component: () => import('@/views/frontend/index.vue'),
    meta: {
      title: 'home'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: Layout,
    redirect: '/admin/dashboard',
    meta: { title: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue')
      },

    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/common/errorPage/404.vue')
  },
  {
    path: '/401',
    component: () => import('@/views/common/errorPage/401.vue')
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
