<template>
  <div class="users">
    <div class="users__header">
      <h2 class="users__header_title">Users</h2>
      <select class="users__header_select" v-model="query.typeConnect">
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>
      <input
        class="users__header_search"
        id="searchInput"
        type="search"
        :placeholder="'By ' + query.typeConnect + '...'"
        v-model="searchQuery"
      />
    </div>

    <TableForDataPage
      :items="fetchData.contents"
      :headers="tableHeaders"
      emptyMessage="No users found"
    >
      <template #row="{ item }">
        <td class="table_body_item">
          <span> {{ item.name }} </span>
        </td>
        <td class="table_body_item">
          <span> {{ item.email }} </span>
        </td>
        <td class="table_body_item">
          <span> {{ item.phone }} </span>
        </td>
        <td class="table_body_item">
          <span>{{ item.role ? item.role : '-' }}</span>
        </td>
        <td class="table_body_item">
          <span>{{
            item.audit.createdAt ? formatTimestamp(item.audit.createdAt) : '--'
          }}</span>
        </td>
        <td class="table_body_item">
          <div class="table_body_item_edit">
            <RiPencilFill
              @click="handleOpenActionUser($event, item.id)"
              size="20"
            />
            <ul
              v-if="isOpenActionUser?.open && isOpenActionUser?.id === item.id"
              class="table_body_item-role"
            >
              <li
                v-if="item.role !== 'USER'"
                role="button"
                @click="handleAdminAction(item.id, 'dismiss')"
                class="table_body_item-role-item"
              >
                Dismiss Admin
              </li>
              <li
                v-else
                role="button"
                @click="handleAdminAction(item.id, 'grant')"
                class="table_body_item-role-item"
              >
                Grant Admin
              </li>
            </ul>
          </div>
        </td>
      </template>
    </TableForDataPage>
  </div>
</template>

<script>
import { ref, onMounted, watch, inject } from 'vue';
import { formatTimestamp } from '../common/utils.js';
import { RiPencilFill } from '@remixicon/vue';
import TableForDataPage from '@/components/TableForDataPage.vue';

export default {
  name: 'UsersPage',
  components: {
    RiPencilFill,
    TableForDataPage,
  },
  setup() {
    const fetchData = ref([]);
    const searchQuery = ref('');
    const query = ref({
      typeConnect: 'email',
    });
    const isOpenActionUser = inject('isOpenActionUser');
    const tableHeaders = [
      { label: 'NAME', key: 'name', minWidth: 300 },
      { label: 'EMAIL', key: 'email', minWidth: 200 },
      { label: 'PHONE', key: 'phone', minWidth: 150 },
      { label: 'ROLE', key: 'role', minWidth: 100 },
      { label: 'CREATED AT', key: 'createdAt', minWidth: 200 },
      { label: 'ACTION', key: 'action', minWidth: 150 },
    ];

    const handleOpenActionUser = (event, idUser) => {
      event.stopPropagation();
      isOpenActionUser.value.open = true;
      isOpenActionUser.value.id = idUser;
    };

    const fetchUsersData = async () => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/users`;

      if (searchQuery.value !== '') {
        url += `?${query.value.typeConnect}=${searchQuery.value}`;
      }
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

    const handleAdminAction = async (id, action) => {
      let url;
      if (action === 'grant') {
        url = `${process.env.VUE_APP_BASE_URL}/admin/users/${id}/grant-admin`;
      } else if (action === 'dismiss') {
        url = `${process.env.VUE_APP_BASE_URL}/admin/staff-users/${id}/dismiss-admin`;
      } else {
        console.error('Invalid action:', action);
        return;
      }

      try {
        const response = await fetch(url, { method: 'PUT' });
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        fetchUsersData();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    watch(searchQuery, fetchUsersData);

    onMounted(() => {
      fetchUsersData();
    });

    return {
      fetchData,
      searchQuery,
      query,
      formatTimestamp,
      isOpenActionUser,
      handleOpenActionUser,
      handleAdminAction,
      tableHeaders,
    };
  },
};
</script>
<style scoped lang="scss">
.users {
  padding: 16px 12px;
  flex-grow: 1;
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 22px;
    &_title {
      font-size: 32px;
      margin: -3px 0 0 0;
      height: 38px;
      flex: 1 0;
    }
    &_search {
      padding: 6px 12px;
      width: 205px;
      font-size: 18px;
      height: 50px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 0px 6px 6px 0px;
      &:focus {
        border-color: rgb(225, 91, 81);
        outline: none;
      }
    }
    &_select {
      font-size: 16px;
      padding: 6px 16px 6px 12px;
      width: 97px;
      height: 50px;
      background-color: #f3f4f6;
      border: 1px solid #e5e7eb;
      border-radius: 6px 0px 0px 6px;
      &:focus {
        border-color: rgb(225, 91, 81);
        outline: none;
      }
    }
  }
}
.table {
  &_body_item {
    padding: 11.5px 8px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-weight: 500;
    &:first-child {
      font-weight: 900;
    }
    &-role {
      position: absolute;
      top: 20px;
      right: 16px;
      width: 160px;
      height: 32px;
      outline: 1px solid rgba(0, 0, 0, 0.175);
      border-radius: 8px;
      z-index: 5;
      background-color: #ffffff;
      padding: 10px 0;
      list-style-type: none;
      &-item {
        height: 24px;
        font-weight: 500;
        padding: 4px 16px;
        color: #d50002;
        &:hover {
          cursor: pointer;
          background-color: rgba(252, 91, 91);
          color: #ffffff;
        }
      }
    }
    &_edit {
      position: relative;
      width: 45px !important;
      background-color: #e15a51;
      border-radius: 6px;
      text-align: center;
      height: 21px !important;
      padding: 6px 0;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
