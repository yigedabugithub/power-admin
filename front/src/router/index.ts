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
    redirect: '/admin/loading',
    meta: { title: 'dashboard' },
    children: [
      {
        path: 'loading/:to?',
        name: 'adminMainLoading',
        component: () => import('@/layout/components/common/loading.vue'),
        meta: {
          title: 'Loading'
        }
      }
    ]
  },

  {
    // 后台找不到页面了-可能是路由未加载上
    path: '/admin:path(.*)*',
    redirect: (to) => {
      return {
        name: 'adminMainLoading',
        params: {
          to: JSON.stringify({
            path: to.path,
            query: to.query
          })
        }
      }
    }
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/:path(.*)*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/common/errorPage/404.vue'),
    meta: {
      title: 'notFound' // 页面不存在
    }
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

router.beforeEach((to, from, next) => {
  // console.log(to, from, 'to, from')

  next()
})

export default router
