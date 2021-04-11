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
    component: () => import('@/views/articles/index.vue'),
  },
  {
    path: '/article/view/:id',
    name: 'article-view',
    component: () => import('@/views/article-detail/index.vue'),
  },
  {
    path: '/article/post',
    name: 'article-post',
    component: () => import('@/views/article-post/index.vue'),
  },

  {
    path: '/memos',
    name: 'memos',
    component: () => import('@/views/memos/index.vue'),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(/*to, from, savedPosition*/) {
    return { top: 0 };
  },
});
