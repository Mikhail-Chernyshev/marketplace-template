<template>
  <div class="home">
    <div v-if="fetchData">
      <div class="row__cards">
        <div class="row__card">
          <div class="row__card_body">
            <div class="row__card_content">
              <RiMoneyDollarCircleLine :size="36" />
              <div class="row__card_info">
                <h2 class="row__card_info_title">Subscriptions</h2>
                <p class="row__card_info_number">
                  {{ fetchData.totalSubscription }}
                </p>
              </div>
            </div>
          </div>
          <div class="row__card_footer">
            <router-link
              to="/admin/settings/subscription-history"
              class="row__card_link"
            >
              View all
            </router-link>
          </div>
        </div>
        <div class="row__card">
          <div class="row__card_body">
            <div class="row__card_content">
              <RiStore2Line :size="36" />
              <div class="row__card_info">
                <h2 class="row__card_info_title">Shops</h2>
                <p class="row__card_info_number">
                  {{ fetchData.totalShop }}
                </p>
              </div>
            </div>
          </div>
          <div class="row__card_footer">
            <router-link
              to="/admin/settings/subscription-history"
              class="row__card_link"
            >
              View all
            </router-link>
          </div>
        </div>
        <div class="row__card">
          <div class="row__card_body">
            <div class="row__card_content">
              <RiBox3Line :size="36" />
              <div class="row__card_info">
                <h2 class="row__card_info_title">Products</h2>
                <p class="row__card_info_number">
                  {{ fetchData.totalProduct }}
                </p>
              </div>
            </div>
          </div>
          <div class="row__card_footer">
            <router-link
              to="/admin/settings/subscription-history"
              class="row__card_link"
            >
              View all
            </router-link>
          </div>
        </div>
        <div class="row__card">
          <div class="row__card_body">
            <div class="row__card_content">
              <RiGroupLine :size="36" />
              <div class="row__card_info">
                <h2 class="row__card_info_title">Users</h2>
                <p class="row__card_info_number">
                  {{ fetchData.totalUser }}
                </p>
              </div>
            </div>
          </div>
          <div class="row__card_footer">
            <router-link
              to="/admin/settings/subscription-history"
              class="row__card_link"
            >
              View all
            </router-link>
          </div>
        </div>
      </div>

      <div class="subscriptions">
        <h3 class="subscriptions__title">Recent subscriptions</h3>

        <table class="subscriptions__table">
          <thead class="subscriptions__table_header">
            <tr>
              <th class="subscriptions__table_header_item">SUBSCRIBE BY</th>
              <th class="subscriptions__table_header_item">AMOUNT</th>
              <th class="subscriptions__table_header_item">DURATION</th>
              <th class="subscriptions__table_header_item">ISSUED AT</th>
              <th class="subscriptions__table_header_item">PROMO CODE</th>
            </tr>
          </thead>
          <p
            class="subscriptions__nothing"
            v-if="fetchData.recentSubscriptions.length === 0"
          >
            No subscriptions
          </p>
          <tbody class="subscriptions__table_body" v-else>
            <tr v-for="el in fetchData.recentSubscriptions" :key="el.invoiceNo">
              <td class="subscriptions__table_body_item">
                <router-link
                  class="subscriptions__table_body_item_link"
                  :to="'/admin/shops/' + el.shop?.id"
                >
                  {{ el.shop?.name }}
                </router-link>
              </td>
              <td class="subscriptions__table_body_item">
                <span>{{ el.subTotalPrice }}</span>
                <span v-if="el.promoCode" class="text-muted">
                  (-{{ el.discount }})
                </span>
              </td>
              <td class="subscriptions__table_body_item">
                {{ el.duration }} days
              </td>
              <td class="subscriptions__table_body_item">
                {{ el.audit?.createdAt }}
              </td>
              <td class="subscriptions__table_body_item">
                {{ el.promoCode ?? '--' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else>Загружается...</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {
  RiBox3Line,
  RiGroupLine,
  RiMoneyDollarCircleLine,
  RiStore2Line,
} from '@remixicon/vue';

export default {
  name: 'HomePage',
  components: {
    RiBox3Line,
    RiGroupLine,
    RiMoneyDollarCircleLine,
    RiStore2Line,
  },
  setup() {
    const fetchData = ref(null);

    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          'http://192.168.0.177:8180/api/v1/admin/dashboard'
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
    };
  },
};
</script>
<style scoped lang="scss">
.row__cards {
  margin: 16px 0 8px 0;
  padding: 0 12px;
  display: flex;
  gap: 16px;
}
.row__card {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: auto;
  height: 139px;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 8px;
  &_body {
    display: flex;
    padding: 16px;
    height: 56px;
  }
  &_content {
    display: flex;
    align-items: center;
  }
  &_info {
    margin-left: 16px;
    height: 56px;
    text-align: left;

    &_title {
      font-size: 16px;
      margin: 0 0 4px 0;
    }
    &_number {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
  }
  &_footer {
    height: 100%;
    padding: 12px 16px;
    background-color: #21252908;
    border-top: 1px solid rgba(0, 0, 0, 0.175);
  }
  &_link {
    color: #2110d6;
    text-decoration: none;
  }
}
.subscriptions {
  margin: 24px 0 0 0;
  padding: 0 12px;
  &__title {
    margin: 0 0 16px 0;
    font-size: 24px;
    font-weight: 700;
  }
  &__table {
    width: 100%;
    &_header_item {
      padding: 12px 8px 12px 8px;
      text-align: left;
      font-weight: 800;
      border-bottom: 1px solid #dee2e6;
      &:first-child {
        padding-left: 16px;
      }
      &:last-child {
        padding-right: 16px;
      }
    }
    &_body_item {
      padding: 16px 8px 16px 16px;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
      &_link {
        color: black;
        font-weight: 800;
      }
    }
  }
  &__nothing {
    padding: 8px 0;
    margin: 0;
  }
}
</style>
