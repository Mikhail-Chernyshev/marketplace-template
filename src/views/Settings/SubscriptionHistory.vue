<template>
  <div class="subscriptionHistory">
    <div class="subscriptionHistory__header">
      <h2 class="subscriptionHistory__header_title">Subscription History</h2>
      <h3 class="subscriptionHistory__header_route">
        <router-link :to="'/settings'">
          {{ capitalizeFirstLetter($route.meta.path) }}
        </router-link>
        /{{ ' Subscription History' }}
      </h3>
    </div>
    <div class="subscriptionHistory__selects">
      <select class="subscriptionHistory__select" v-model="status">
        <option value=" ">All status</option>
        <option value="PENDING">Pending</option>
        <option value="SUCCESS">Success</option>
        <option value="FAILED">Failure</option>
      </select>

      <DatePickerInput :selectedDates="selectedDates" v-model="dateValue" />
    </div>

    <TableForDataPage
      :items="fetchData?.contents"
      :headers="headers"
      emptyMessage="No subscriptions found"
    >
      <template #row="{ item }">
        <td class="table_body_item table_body_item_bold">
          <router-link :to="`/shops/${item.shop.id}`">
            {{ item.shop.name || '' }}
          </router-link>
        </td>
        <td class="table_body_item">
          {{ item.subTotalPrice / 1000 + ',000' || 0 }}
          <span class="table_body_item_skinny" v-if="item.discount">
            {{ `(-${item.discount})` || 0 }}
          </span>
        </td>
        <td class="table_body_item">
          <span>{{ item.invoiceNo || '' }}</span>
        </td>
        <td class="table_body_item">
          <small
            v-if="item.status === 'SUCCESS'"
            class="table_body_item_status table_body_item_status_approved"
          >
            {{ item.status }}
          </small>
          <small
            v-else-if="item.status === 'PENDING'"
            class="table_body_item_status table_body_item_status_pending"
          >
            {{ item.status }}
          </small>
          <small
            v-else-if="item.status === 'FAILURE'"
            class="table_body_item_status table_body_item_status_disabled"
          >
            {{ item.status }}
          </small>
          <span v-else class="table_body_item_status">{{ item.status }}</span>
        </td>
        <td class="table_body_item">
          <span>
            {{
              item.audit?.createdAt
                ? formatTimestamp(item.audit?.createdAt)
                : '--'
            }}
          </span>
        </td>
        <td class="table_body_item">
          <ModalData
            title="Subscription Detail"
            :item="item"
            v-if="isShowSubscription && shopId === item.shop.id"
          >
            <template #modal-buttons>
              <button
                type="button"
                class="modal-close"
                aria-label="Close"
                @click="closeSubscription()"
              >
                Close
              </button>
            </template>
          </ModalData>
          <button
            @click="showSubscription(item.shop.id)"
            class="table_body_item_view"
          >
            <RiEyeFill :size="20" />
          </button>
        </td>
      </template>
    </TableForDataPage>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import DatePickerInput from '../../components/DatePickerInput.vue';
import TableForDataPage from '@/components/TableForDataPage.vue';
import { formatTimestamp } from '../../common/utils.js';
import { RiEyeFill } from '@remixicon/vue';
import ModalData from '../../components/ModalData.vue';

export default {
  name: 'SubscriptionHistoryPage',
  components: {
    DatePickerInput,
    TableForDataPage,
    RiEyeFill,
    ModalData,
  },
  setup() {
    const fetchData = ref([]);
    const status = ref(' ');
    const dateValue = ref('');
    const selectedDates = ref([]);
    const isShowSubscription = ref(false);
    const shopId = ref(0);
    const headers = ref([
      { label: 'SUBSCRIBE BY', key: 'SUBSCRIBE', minWidth: 200 },
      { label: 'AMOUNT', key: 'AMOUNT', minWidth: 200 },
      { label: 'INVOICE NO', key: 'INVOICE', minWidth: 150 },
      { label: 'STATUS', key: 'STATUS', minWidth: 150 },
      { label: 'ISSUED AT', key: 'ISSUED', minWidth: 200 },
      { label: 'ACTION', key: 'ACTION', minWidth: 150 },
    ]);

    const capitalizeFirstLetter = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    const showSubscription = (id) => {
      isShowSubscription.value = true;
      shopId.value = id;
    };

    const closeSubscription = () => {
      isShowSubscription.value = false;
      shopId.value = 0;
    };

    const fetchSubscriptionsData = async () => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/shop-subscriptions?time-zone=Europe/Moscow`;
      url += status.value !== ' ' ? `&status=${status.value}` : '';
      url += dateValue.value
        ? `&from-date=${selectedDates.value[0]}&to-date=${selectedDates.value[1]}`
        : '';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        fetchData.value = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        fetchData.value = [];
      }
    };
    watch([dateValue, status], fetchSubscriptionsData);

    onMounted(() => {
      fetchSubscriptionsData();
    });

    return {
      fetchData,
      status,
      formatTimestamp,
      selectedDates,
      dateValue,
      capitalizeFirstLetter,
      headers,
      isShowSubscription,
      showSubscription,
      shopId,
      closeSubscription,
    };
  },
};
</script>
<style scoped lang="scss">
.subscriptionHistory {
  padding: 16px 12px;
  flex-grow: 1;
  &__header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 30px;
    &_title {
      font-size: 30px;
      margin: -3px 0 0 0;
      height: 38px;
      flex: 1 0;
    }
    &_route {
      font-size: 16px;
      margin: 0;
      font-weight: 500;
      & > a:visited {
        color: inherit;
      }
    }
  }
  &__selects {
    display: flex;
    gap: 18px;
    margin-bottom: 18px;
  }
  &__select {
    font-size: 16px;
    padding: 6px 16px 6px 12px;
    width: auto;
    height: 50px;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    &:focus {
      border-color: rgb(225, 91, 81);
      outline: none;
    }
  }
}
.table {
  &_body_item {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-weight: 500;
    &_bold {
      padding: 16px 8px;
      font-weight: 900;
      text-decoration: underline;
      & > a {
        color: inherit;
      }
    }
    &_skinny {
      font-weight: 400;
    }
    &_view {
      width: 45px !important;
      background-color: #e15b51;
      color: white;
      border-radius: 6px;
      text-align: center;
      height: 32px !important;
      border: none;
      &:hover {
        cursor: pointer;
      }
      > svg {
        margin-top: 3px;
      }
    }
    &_status {
      font-size: 14px;
      &_approved {
        color: #00a524;
      }
      &_disabled {
        color: #d50002;
      }
      &_pending {
        color: #ff9017;
      }
    }
  }
}
.modal-close {
  appearance: none;
  font-size: 16px;
  padding: 6px 12px;
  border: none;
  background-color: #c9c9c9;
  border-radius: 6px;
  height: 38px;
  &:hover {
    cursor: pointer;
  }
}
</style>
