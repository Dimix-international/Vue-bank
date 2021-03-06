import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home";
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'Main',
      auth: true,
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/Help.vue'),
    meta: {
      layout: 'Main',
      auth: true,
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth.vue'),
    meta: {
      layout: 'Auth',
      auth: false,
    }
  },
  {
    path: '/request/:id',
    name: 'Request',
    component: () => import('@/views/Request.vue'),
    meta: {
      layout: 'Main',
      auth: true,
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;

  if(requireAuth && store.getters['auth/isAuthenticated']) {
    next();
  }
  else if(requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/auth?message=auth')
  } else {
    next();
  }
})

export default router
