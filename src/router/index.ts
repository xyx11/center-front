// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import AppPage from '@/views/AppPage.vue';

export const routes = [
    { path: '/', redirect: '/mail' },
    { path: '/mail', name: 'mail', component: Home },
    { path: '/app', name: 'app', component: AppPage },
    // …其他路由
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
