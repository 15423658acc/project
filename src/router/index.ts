import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: { 
        keepAlive: true, // 启用缓存
        transitionName: 'fade'
      }
    },
    {
      path: '/career-map',
      name: 'CareerMap',
      component: () => import('../views/CareerMap.vue'),
      meta: { 
        keepAlive: true,
        transitionName: 'slide-left'
      }
    },
    {
      path: '/salary',
      name: 'Salary',
      component: () => import('../views/Salary.vue'),
      meta: { 
        keepAlive: true,
        transitionName: 'slide-right'
      }
    },
    {
      path: '/resume',
      name: 'Resume',
      component: () => import('../views/Resume.vue'),
      meta: { 
        keepAlive: false,
        transitionName: 'zoom'
      }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue'),
      meta: { 
        keepAlive: false,
        transitionName: 'flip'
      }
    }
  ]
})

export default router