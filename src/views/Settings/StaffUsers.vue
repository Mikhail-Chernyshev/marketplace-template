<template>
  <div class="subscriptionHistory">
    <div class="subscriptionHistory__header">
      <h2 class="subscriptionHistory__header_title">Staff Users</h2>
      <h3 class="subscriptionHistory__header_route">
        <router-link :to="'/settings'">
          {{ capitalizeFirstLetter($route.meta.path) }}
        </router-link>
        /{{ ' Staffs' }}
      </h3>
    </div>

    <TableForDataPage
      :items="fetchData?.contents"
      :headers="headers"
      emptyMessage="No subscriptions found"
    >
      <template #row="{ item }">
        <td class="table_body_item table_body_item_bold">
          <span> {{ item.name || '' }}</span>
        </td>
        <td class="table_body_item">
          <span> {{ item.email || '' }}</span>
        </td>
        <td class="table_body_item">
          <span> {{ item.phone || '' }}</span>
        </td>
        <td class="table_body_item">
          <span> {{ item.role || '' }}</span>
        </td>
        <td class="table_body_item">
          <div class="table_body_item_buttons">
            <div class="table_body_item_edit">
              <router-link :to="`/settings/staff-users/${item.id}`">
                <RiPencilFill size="20" />
              </router-link>
            </div>
            <ModalData
              v-if="isOpenDeleteUser && userId === item.id"
              :title="'Confirm'"
              :text="`Are you sure to remove user: ${item.name}?`"
            >
              <template #modal-buttons>
                <button
                  type="button"
                  class="modal-close"
                  aria-label="Close"
                  @click="closeModal()"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="modal-confirm"
                  aria-label="Close"
                  @click="deleteCategory()"
                >
                  Proceed
                </button>
              </template>
            </ModalData>
            <button class="table_body_item_delete" @click="handleDelete(item)">
              <RiDeleteBinLine :size="20" />
            </button>
          </div>
        </td>
      </template>
    </TableForDataPage>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import TableForDataPage from '@/components/TableForDataPage.vue';
import { formatTimestamp } from '../../common/utils.js';
import { RiDeleteBinLine, RiPencilFill } from '@remixicon/vue';
import ModalData from '../../components/ModalData.vue';
import { usersStaff } from '../../api/settings/users/usersStaff';

export default {
  name: 'StaffUsersPage',
  components: {
    TableForDataPage,
    RiDeleteBinLine,
    RiPencilFill,
    ModalData,
  },
  setup() {
    const isOpenDeleteUser = ref(false);
    const userId = ref(null);
    const fetchData = ref([]);
    const headers = ref([
      { label: 'NAME', key: 'NAME', minWidth: 300 },
      { label: 'EMAIL', key: 'EMAIL', minWidth: 200 },
      { label: 'PHONE', key: 'PHONE', minWidth: 150 },
      { label: 'ROLE', key: 'ROLE', minWidth: 100 },
      { label: 'ACTION', key: 'ACTION', minWidth: 150 },
    ]);

    const capitalizeFirstLetter = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    const fetchUsersData = async () => {
      try {
        fetchData.value = usersStaff;
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        fetchData.value = [];
      }
    };
    const handleDelete = (item) => {
      isOpenDeleteUser.value = true;
      userId.value = item.id;
    };
    const closeModal = () => {
      isOpenDeleteUser.value = false;
      userId.value = null;
    };
    onMounted(() => {
      fetchUsersData();
    });

    return {
      fetchData,
      formatTimestamp,
      capitalizeFirstLetter,
      headers,
      handleDelete,
      isOpenDeleteUser,
      userId,
      closeModal,
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
    &_delete {
      width: 45px !important;
      background-color: #d50002;
      color: white;
      border-radius: 8px;
      text-align: center;
      height: 33px !important;
      border: none;
      cursor: pointer;
    }
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
.modal-confirm {
  appearance: none;
  font-size: 16px;
  padding: 6px 12px;
  border: none;
  color: white;
  background-color: #e15b51;
  border-radius: 6px;
  height: 38px;
  &:hover {
    cursor: pointer;
  }
}
</style>
