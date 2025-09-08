import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
    },
    {
      path: '/dash',
      name: 'dash',
      component: () => import('../views/DashView.vue'),
    },
    {
      path: '/image',
      name: 'image',
      component: () => import('../views/ImageView.vue'),
    },
    {
      path: '/replace',
      name: 'replace',
      component: () => import('../views/ReplaceView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/attr',
      name: 'attr',
      component: () => import('../views/AttrView.vue'),
    },
    {
      name: 'login',
      path: '/login',
      component: () => import("../views/LoginView.vue"),
    },
  ],
})

// 페이지 제목 설정
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
