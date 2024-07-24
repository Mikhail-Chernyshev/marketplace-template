import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Settings from '../views/Settings.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: Settings,
  },

  //   {
  //     path: '/admin',
  //     name: 'Admin',
  //     component: AdminDashboard,
  //   },
  // Добавьте другие маршруты по мере необходимости
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
