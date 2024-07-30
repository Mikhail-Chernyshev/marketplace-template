<template>
  <div class="cities">
    <div class="cities__header">
      <h2 class="cities__header_title">Users</h2>
      <select
        class="cities__header_select"
        v-model="query.status"
        @change="updateStatus"
      >
        <option value="email">Email</option>
        <option value="phone">Phone</option>
      </select>
      <input
        class="cities__header_search"
        id="searchInput"
        type="search"
        :placeholder="'By ' + query.status + '...'"
        v-model="searchQuery"
      />
    </div>

    <TableForDataPage
      :items="fetchData.contents"
      :headers="[
        { label: 'NAME', key: 'name' },
        { label: 'EMAIL', key: 'email' },
        { label: 'PHONE', key: 'phone' },
        { label: 'ROLE', key: 'role' },
        { label: 'CREATED AT', key: 'createdAt' },
        { label: 'ACTION', key: 'action' },
      ]"
      emptyMessage="No users found"
    >
      <template #row="{ item }">
        <td class="table_body_item">
          <span class="table_body_item_status">{{ item.name }}</span>
        </td>
        <td class="table_body_item">
          <span class="table_body_item_status">{{ item.email }}</span>
        </td>
        <td class="table_body_item">
          <span class="table_body_item_status">{{ item.phone }}</span>
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
              v-if="isOpenActionUser.open && isOpenActionUser.id === item.id"
              class="header__locales"
            >
              <li
                v-if="item.role !== 'USER'"
                role="button"
                @click="handleDismissAdmin(item.id)"
                class="header__locales-item"
              >
                Dismiss Admin
              </li>
              <li
                v-else
                role="button"
                @click="handleGrantAdmin(item.id)"
                class="header__locales-item"
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
  name: 'CitiesPage',
  components: {
    RiPencilFill,
    TableForDataPage,
  },
  setup() {
    const fetchData = ref([]);
    const searchQuery = ref('');
    const query = ref({
      status: 'email',
    });
    const isOpenActionUser = inject('isOpenActionUser');

    const handleOpenActionUser = (event, idUser) => {
      event.stopPropagation();
      isOpenActionUser.value.open = !isOpenActionUser.value.open;
      isOpenActionUser.value.id = idUser;
    };

    const fetchUsersData = async () => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/users`;

      if (searchQuery.value !== '') {
        url += `?${query.value.status}=${searchQuery.value}`;
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

    const handleDismissAdmin = async (id) => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/staff-users/${id}/dismiss-admin`;
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

    const handleGrantAdmin = async (id) => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/users/${id}/grant-admin`;
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
      handleDismissAdmin,
      handleGrantAdmin,
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
.nothing {
  width: auto;
  border-radius: 8px;
  background-color: #cfe2ff;
  padding: 12px 16px;
  color: #052c65;
  border: 1px solid #9ec5fe;
}
.table {
  width: 100%;
  &_header_item {
    padding: 8px;
    text-align: left;
    font-weight: 900;
    border-bottom: 1px solid #dee2e6;
    width: 24%;
    position: relative;
    &:first-child {
      width: 28%;
    }
    &:nth-child(2) {
      width: 19%;
    }
    &:nth-child(3) {
      width: 16%;
    }
    &:nth-child(4) {
      width: 9%;
    }
    &:nth-child(5) {
      width: 18%;
    }
    &:last-child {
      width: 8%;
    }
    &_filter {
      width: 20px;
      height: 20px;
      border: none;
      background-color: #ffffff;
      padding: 0;
      margin: 0;
      position: absolute;
      left: 66px;
      color: rgb(225, 91, 81);
      cursor: pointer;
    }
  }

  &_body_item {
    padding: 11.5px 8px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-weight: 500;
    &:first-child {
      font-weight: 900;
    }

    &_image {
      width: 34px;
      height: 34px;
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
    &_link {
      color: black;
      font-weight: 800;
    }
    &_buttons {
      display: flex;
      gap: 10px;
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
    &_delete {
      width: 45px !important;
      background-color: #d50002;
      color: white;
      border-radius: 8px;
      text-align: center;
      height: 33px !important;
      border: none;
    }
  }
}

#featuredCheck {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 4px;
}

#featuredCheck:hover {
  accent-color: #e15b51 !important;
}
#featuredCheck:checked {
  accent-color: #e15b51 !important;
}
#discountCheck {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 4px;
}
#discountCheck:hover {
  accent-color: #e15b51 !important;
}
.header {
  height: 70px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  &__container {
    padding: 0 16px;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__toggle {
    display: flex;
    align-items: center;
    &:hover {
      cursor: pointer;
    }
  }
  &__locale {
    padding-right: 8px;
  }
  &__localeToggle {
    font-weight: 500;
    &:hover {
      cursor: pointer;
      color: rgba(252, 91, 91);
    }
    &::after {
      display: inline-block;
      margin-left: 0.255em;
      vertical-align: 0.255em;
      content: '';
      border-top: 5px solid;
      border-right: 0.3em solid transparent;
      border-bottom: 0;
      border-left: 0.3em solid transparent;
    }
  }
  &__locales {
    position: absolute;
    top: 19px;
    right: 0;
    width: 160px;
    height: 30px;
    outline: 1px solid rgba(0, 0, 0, 0.175);
    border-radius: 8px;
    z-index: 5;
    background-color: #ffffff;
    padding: 10px 0;
    list-style-type: none;

    &-item {
      color: #d50002;
      height: 24px;
      text-align: left;
      font-weight: 500;
      padding: 4px 16px;
      &:hover {
        cursor: pointer;
        background-color: rgba(252, 91, 91);
        color: #ffffff;
      }
    }
    &-divider {
      height: 0;
      width: 100%;
      border-top: 1px solid rgba(0, 0, 0, 0.175);
      display: block;
      margin: 8px 0;
    }
  }
}
</style>
