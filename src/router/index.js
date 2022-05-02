import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: import('@/views/login'),
    name: 'login'
  },
  {
    path: '',
    name: 'home',
    component: () => import('@/views/home')
  },
  {
    path: '/qa',
    name: 'qa',
    component: () => import('@/views/qa')
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/views/video')
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('@/views/me')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
