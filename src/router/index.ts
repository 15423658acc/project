import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/career-map',
      name: 'CareerMap',
      component: () => import('../views/CareerMap.vue')
    },
    {
      path: '/salary',
      name: 'Salary',
      component: () => import('../views/Salary.vue')
    },
    {
      path: '/resume',
      name: 'Resume',
      component: () => import('../views/Resume.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/Contact.vue')
    }
  ]
})

export default router