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
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'empty' }
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue'),
      meta: { layout: 'empty' }
    },
    {
      path: '/Schedule',
      name: 'Schedule',
      component: () => import('../views/ScheduleView.vue')
    },
    {
      path: '/CompleteSchedule',
      name: 'CompleteSchedule',
      component: () => import('../views/CompleteSchedule.vue')
    },
    {
      path: '/Report',
      name: 'Report',
      component: () => import('@/views/ReportView.vue')
    },
    {
      path: '/Users',
      name: 'Users',
      component: () => import('@/views/UsersView.vue')
    },
    {
      path: '/Object',
      name: 'Object',
      component: () => import('@/views/ObjectView.vue')
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
