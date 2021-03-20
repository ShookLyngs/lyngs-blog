import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/articles/index.vue')
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});