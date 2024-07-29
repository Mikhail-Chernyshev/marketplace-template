import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Settings from '../views/Settings.vue';
import Categories from '@/views/Categories.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/categories',
    name: 'CategoriesPage',
    component: Categories,
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: Settings,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
