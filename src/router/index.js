import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Settings from '../views/Settings.vue';
import Categories from '@/views/Categories.vue';
import Cities from '@/views/Cities.vue';
import Shops from '@/views/Shops.vue';
import Products from '@/views/Products.vue';
import Users from '../views/Users.vue';
import SubscriptionHistory from '../views/Subscription/SubscriptionHistory.vue';
import CreateCategory from '@/views/Categories/CreateCategory.vue';
import UpdateCategory from '@/views/Categories/UpdateCategory.vue';

const routes = [
  {
    path: '/',
    name: 'DashboardPage',
    component: Dashboard,
  },
  {
    path: '/categories',
    name: 'CategoriesPage',
    component: Categories,
  },
  {
    path: '/categories/:id',
    name: 'UpdateCategoryPage',
    component: UpdateCategory,
    meta: {
      path: 'categories',
      subPath: 'update-category',
    },
  },
  {
    path: '/categories/create-category',
    name: 'CreateCategoryPage',
    component: CreateCategory,
    meta: {
      path: 'categories',
      subPath: 'create-category',
    },
  },
  {
    path: '/settings',
    name: 'SettingsPage',
    component: Settings,
  },
  {
    path: '/settings/subscription-history',
    name: 'SubscriptionHistoryPage',
    component: SubscriptionHistory,
    meta: {
      path: 'settings',
      subPath: 'subscription-history',
    },
  },
  {
    path: '/cities',
    name: 'CitiesPage',
    component: Cities,
  },
  {
    path: '/shops',
    name: 'ShopsPage',
    component: Shops,
  },
  {
    path: '/products',
    name: 'ProductsPage',
    component: Products,
  },
  {
    path: '/users',
    name: 'UsersPage',
    component: Users,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
