import { auth } from '@/configs/firebase';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requireAuth: true }
    },
    {
      path: '/Login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/Skemaer',
      name: 'skemaer',
      component: () => import('../views/ScheduleView.vue')
    },
    {
      path: '/CompleteSchedule',
      name: 'CompleteSchedule',
      component: () => import('../views/CompleteSchedule.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next('/');
  } else {
    next();
  }
});
export default router;
