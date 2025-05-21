import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { getAuth } from 'firebase/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
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
      component: () => import('../views/ScheduleView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/CompleteSchedule',
      name: 'CompleteSchedule',
      component: () => import('../views/CompleteSchedule.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Report',
      name: 'Report',
      component: () => import('@/views/ReportView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Users',
      name: 'Users',
      component: () => import('@/views/UsersView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Object',
      name: 'Object',
      component: () => import('@/views/ObjectView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/Specific/:id',
      name: 'Specific',
      props: true,
      component: () => import('@/views/SpecificView.vue'),
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const currentUser = getAuth().currentUser;

  if (requiresAuth && !currentUser) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
