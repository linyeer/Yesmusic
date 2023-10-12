import { createRouter, createWebHashHistory } from 'vue-router'

import Index from '@/pages/Index.vue'
import Login from '@/pages/Login.vue'
import NotFound from '@/pages/404.vue'
import Recommend from '@/components/Recommend.vue'
import Admin from '@/pages/Admin.vue'
import UserManage from '@/components/UserManage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login' // 添加这一行
  },
  {
    path: '/user/index',
    component: Index,
    meta: { requiresAuth: true }, // 保护路由
    children: [
      {
        path: '/user/index',
        component: () => import('@/components/Like.vue')
      },
      {
        path: '/user/recommend',
        component: Recommend
      },
      {
        path: '/user/like',
        component: () => import('@/components/Like.vue')
      },
      {
        path: '/user/message',
        component: () => import('@/components/Message.vue')
      }
    ]
  },
  {
    path: '/admin/index',
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/admin/index',
        component: UserManage
      },
      {
        path: '/admin/userManage',
        component: UserManage
      },
      {
        path: '/admin/musicManage',
        component: () => import('@/components/musicManage.vue')
      },
      {
        path: '/admin/messageManage',
        component: () => import('@/components/messageManage.vue')
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  // 检查路由是否需要认证
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 检查是否有token
    if (!localStorage.getItem('token')) {
      // 如果没有token，重定向到登录页面
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

console.log('router', router)

export default router
