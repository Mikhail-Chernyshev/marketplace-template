import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Settings from '../views/Settings.vue';
import Categories from '@/views/Categories.vue';
import Cities from '@/views/Cities.vue';
import Shops from '@/views/Shops.vue';
import Products from '@/views/Products.vue';
import Users from '../views/Users.vue';
import SubscriptionHistory from '../views/Settings/SubscriptionHistory.vue';
import CreateCategory from '@/views/Categories/CreateCategory.vue';
import UpdateCategory from '@/views/Categories/UpdateCategory.vue';
import StaffUsers from '@/views/Settings/StaffUsers.vue';
import EditUser from '@/views/Settings/StaffUsers/EditUser.vue';
import SiteSettings from '@/views/Settings/SiteSettings.vue';
import SubscriptionPlan from '../views/Settings/SubscriptionPlan.vue';
import UpdateSubscriptionPlan from '../views/Settings/SubscriptionPlan/UpdateSubscriptionPlan.vue';
import CreateSubscriptionPlan from '../views/Settings/SubscriptionPlan/CreateSubscriptionPlan.vue';
import PromoCodes from '../views/Settings/PromoCodes.vue';
import UpdatePromoCode from '../views/Settings/PromoCodes/UpdatePromoCode.vue';
import CreatePromoCode from '../views/Settings/PromoCodes/CreatePromoCode.vue';


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
    path: '/settings/promo-codes',
    name: 'PromoCodesPage',
    component: PromoCodes,
    meta: {
      path: 'settings',
      subPath: 'promo-codes',
    },
  },
  {
    path: '/settings/promo-codes/:id',
    name: 'PromoCodesPageCreate',
    component: CreatePromoCode,
    meta: {
      path: 'settings',
      subPath: 'promo-codes',
    },
  },
  {
    path: '/settings/promo-codes/update/:id',
    name: 'PromoCodesPageUpdate',
    component: UpdatePromoCode,
    meta: {
      path: 'settings',
      subPath: 'promo-codes',
    },
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
    path: '/settings/subscription-plans',
    name: 'SubscriptionPlansPage',
    component: SubscriptionPlan,
    meta: {
      path: 'settings',
      subPath: 'Subscription Plans',
    },
  },
  {
    path: '/settings/subscription-plans/create-subscription-plan',
    name: 'CreateSubscriptionPlansPage',
    component: CreateSubscriptionPlan,
    meta: {
      path: 'settings',
      subPath: 'Subscription Plans',
    },
  },
  {
    path: '/settings/subscription-plans/update/:id',
    name: 'UpdateSubscriptionPlansPage',
    component: UpdateSubscriptionPlan,
    meta: {
      path: 'settings',
      subPath: 'Subscription Plans',
    },
  },
  {
    path: '/settings/site-setting',
    name: 'SiteSettingsPage',
    component: SiteSettings,
    meta: {
      path: 'settings',
      subPath: 'site settings',
    },
  },

  {
    path: '/settings/staff-users',
    name: 'StaffUsersPage',
    component: StaffUsers,
    meta: {
      path: 'settings',
      subPath: 'staff-users',
    },
  },
  {
    path: '/settings/staff-users/:id',
    name: 'EditUserPage',
    component: EditUser,
    meta: {
      path: 'settings',
      subPath: 'staff-users',
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
