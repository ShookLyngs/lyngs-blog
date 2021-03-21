import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'entry',
    redirect: '/articles',
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('@/views/articles/index.vue')
  },
  {
    path: '/memos',
    name: 'memos',
    component: () => import('@/views/memos/index.vue')
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});