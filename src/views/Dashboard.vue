<template>
  <div class="dashboard">
    <div>
      <div class="dashboard__cards">
        <DashboardCard
          title="Total Subscription"
          :value="fetchData?.totalSubscription / 1000 + ',000'"
          icon="RiMoneyDollarCircleLine"
          link="/settings/subscription-history"
        />
        <DashboardCard
          title="Shops"
          :value="fetchData?.totalShop"
          icon="RiStore2Line"
          link="/settings/subscription-history"
        />
        <DashboardCard
          title="Products"
          :value="fetchData?.totalProduct"
          icon="RiBox3Line"
          link="/settings/subscription-history"
        />
        <DashboardCard
          title="Users"
          :value="fetchData?.totalUser"
          icon="RiGroupLine"
          link="/settings/subscription-history"
        />
      </div>

      <div class="subscriptions">
        <h4 class="subscriptions__title">Recent subscriptions</h4>
        <TableForDataPage
          :items="fetchData?.recentSubscriptions"
          :headers="[
            { label: 'SUBSCRIBE BY' },
            { label: 'AMOUNT' },
            { label: 'DURATION' },
            { label: 'ISSUED AT' },
            { label: 'PROMO CODE' },
          ]"
          emptyMessage="No subscriptions found"
        >
          <template #row="{ item }">
            <td class="table_body_item">
              <router-link
                class="table_body_item_link"
                :to="'/admin/shops/' + item.shop?.id"
              >
                {{ item.shop?.name }}
              </router-link>
            </td>
            <td class="table_body_item">
              <span>{{ item.subTotalPrice }}</span>
              <span v-if="item.promoCode" class="text-muted">
                (-{{ item.discount }})
              </span>
            </td>
            <td class="table_body_item">{{ item.duration }} days</td>
            <td class="table_body_item">
              {{
                item.audit?.createdAt
                  ? formatTimestamp(item.audit?.createdAt)
                  : '--'
              }}
            </td>
            <td class="table_body_item">
              {{ item.promoCode ?? '--' }}
            </td>
          </template>
        </TableForDataPage>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import TableForDataPage from '@/components/TableForDataPage.vue';
import DashboardCard from '@/components/DashboardCard.vue';
import { formatTimestamp } from '../common/utils.js';

export default {
  name: 'DashboardPage',
  components: {
    TableForDataPage,
    DashboardCard,
  },
  setup() {
    const fetchData = ref(null);

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/dashboard`
        );
        if (!response.ok) {
          throw new Error('Сетевая ошибка: ' + response.statusText);
        }
        fetchData.value = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    onMounted(() => {
      fetchDashboardData();
    });
    return {
      fetchData,
      formatTimestamp,
    };
  },
};
</script>

<style scoped lang="scss">
.dashboard__cards {
  margin: 16px 0 8px 0;
  padding: 0 12px;
  display: flex;
  gap: 16px;
}
.subscriptions {
  margin: 28px 0 0 0;
  padding: 0 12px;
  &__title {
    margin: 0 0 16px 0;
    font-size: 24px;
    font-weight: 800;
  }
}
.table {
  &_body_item {
    padding: 16px 8px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    &_link {
      color: black;
      font-weight: 900;
      line-height: 24px;
    }
  }
}
</style>
