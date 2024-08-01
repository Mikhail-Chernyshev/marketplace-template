<template>
  <div class="cities">
    <div class="cities__header">
      <h2 class="cities__header_title">Shops</h2>
      <input
        class="cities__header_search"
        id="searchInput"
        type="search"
        placeholder="Search..."
        v-model="searchQuery"
        @input="updateInput"
      />
      <select class="cities__header_select" v-model="status">
        <option value=" ">All status</option>
        <option value="PENDING">Pending</option>
        <option value="APPROVED">Approved</option>
        <option value="DISABLED">Disabled</option>
      </select>
    </div>

    <TableForDataPage
      :items="fetchData.contents"
      :headers="[
        { label: 'IMAGE', minWidth: 100 },
        { label: 'NAME', minWidth: 200 },
        { label: 'HEADLINE', minWidth: 100 },
        { label: 'STATUS', minWidth: 120 },
        { label: 'EXPIRED AT', minWidth: 150 },
        { label: 'CREATED AT', minWidth: 150 },
        { label: 'ACTION', minWidth: 150 },
      ]"
      emptyMessage="No shops found"
    >
      <template #row="{ item }">
        <td class="table_body_item">
          <img
            class="table_body_item_image"
            :src="'/images/placeholder.jpeg'"
            alt="Shop Logo"
          />
        </td>
        <td class="table_body_item">
          <span>{{ item.name }}</span>
        </td>
        <td class="table_body_item">
          <span>{{ item.headline }}</span>
        </td>
        <td class="table_body_item">
          <small
            v-if="item.status === 'APPROVED'"
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
            v-else-if="item.status === 'DISABLED'"
            class="table_body_item_status table_body_item_status_disabled"
          >
            {{ item.status }}
          </small>
          <span v-else class="table_body_item_status">{{ item.status }}</span>
        </td>
        <td class="table_body_item">
          <span>{{
            item.expiredAt ? formatTimestamp(item.expiredAt).slice(0, 11) : '--'
          }}</span>
        </td>
        <td class="table_body_item">
          <span>{{
            item.audit.createdAt
              ? formatTimestamp(item.audit.createdAt).slice(0, 11)
              : '--'
          }}</span>
        </td>
        <td class="table_body_item">
          <div class="table_body_item_buttons">
            <div class="table_body_item_edit">
              <router-link :to="`/admin/categories/${item.id}`">
                <RiPencilFill size="20" />
              </router-link>
            </div>
          </div>
        </td>
      </template>
    </TableForDataPage>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { RiPencilFill } from '@remixicon/vue';
import TableForDataPage from '@/components/TableForDataPage.vue';
import { formatTimestamp } from '../common/utils.js';

export default {
  name: 'CitiesPage',
  components: {
    RiPencilFill,
    TableForDataPage,
  },
  setup() {
    const fetchData = ref([]);
    const searchQuery = ref('');
    const status = ref(' ');

    const updateInput = () => {
      setTimeout(() => {
        fetchShopsData(searchQuery);
      }, 800);
    };

    const fetchShopsData = async () => {
      try {
        let response;
        if (searchQuery.value === '' && status?.value) {
          response = await fetch(
            `${process.env.VUE_APP_BASE_URL}/admin/shops?status=${status?.value}`
          );
        } else if (searchQuery.value !== '' && status?.value) {
          response = await fetch(
            `${process.env.VUE_APP_BASE_URL}/admin/shops?status=${status?.value}&q=${searchQuery.value}`
          );
        } else if (searchQuery.value !== '' && !status?.value) {
          response = await fetch(
            `${process.env.VUE_APP_BASE_URL}/admin/shops?q=${searchQuery.value}`
          );
        } else {
          response = await fetch(`${process.env.VUE_APP_BASE_URL}/admin/shops`);
        }

        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        fetchData.value = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        fetchData.value = [];
      }
    };

    watch(status, fetchShopsData);

    onMounted(() => {
      fetchShopsData();
    });

    return {
      fetchData,
      searchQuery,
      status,
      updateInput,
      formatTimestamp,
    };
  },
};
</script>
<style scoped lang="scss">
.cities {
  padding: 16px 12px;
  flex-grow: 1;
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    &_title {
      font-size: 32px;
      margin: -3px 0 0 0;
      height: 38px;
      flex: 1 0;
    }
    &_search {
      padding: 6px 16px;
      width: 213px;
      font-size: 18px;
      height: 50px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      margin-right: 16px;
      &:focus {
        border-color: rgb(225, 91, 81);
        outline: none;
      }
    }
    &_select {
      font-size: 16px;
      padding: 6px 16px 6px 12px;
      width: 127px;
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
}
.table {
  &_body_item {
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-weight: 900;
    &_image {
      width: 80px;
      height: 80px;
      object-fit: contain;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      padding: 0;
      margin: 0;
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
    &_buttons {
      display: flex;
      gap: 10px;
    }
    &_edit {
      width: 45px !important;
      background-color: #c9c9c9;
      border-radius: 8px;
      text-align: center;
      height: 21px !important;
      padding: 6px 0;
      cursor: pointer;
    }
    &_edit > a {
      color: black;
    }
  }
}
</style>
