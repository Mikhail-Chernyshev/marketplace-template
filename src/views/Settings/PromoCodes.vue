<template>
  <div class="subscriptionPlan">
    <div class="subscriptionPlan__header">
      <div class="subscriptionPlan__header-x">
        <h2 class="subscriptionPlan__header_title">Promo Codes</h2>
        <select class="subscriptionPlan__header_select" v-model="typePromos">
          <option value=" ">All promos</option>
          <option value="AVAILABLE">Available</option>
          <option value="USED">Used</option>
        </select>

        <router-link
          to="promo-codes/create-promo-code"
          class="subscriptionPlan__header_button"
        >
          Add new
        </router-link>
      </div>

      <h3 class="subscriptionPlan__header_route">
        <router-link :to="'/settings'">
          {{ capitalizeFirstLetter($route.meta.path) }}
        </router-link>
        /{{ ' Promo codes' }}
      </h3>
    </div>

    <TableForDataPage
      :items="fetchData?.contents"
      :headers="headers"
      emptyMessage="No promocodes found"
    >
      <template #row="{ item }">
        <td class="table_body_item table_body_item_bold">
          <span> {{ item.code || '' }} </span>
        </td>
        <td class="table_body_item">
          {{ item.value / 1000 + ',000' || 0 }}
        </td>
        <td class="table_body_item">
          <span>{{ item.valueType === 'FIXED_AMOUNT' ? '.00' : '%' }}</span>
        </td>
        <td class="table_body_item">
          <span class="table_body_item_status">{{
            item.used ? 'YES' : 'NO'
          }}</span>
        </td>
        <td class="table_body_item">
          <span>
            {{ item.expiredAt ? formatTimestamp(item.expiredAt) : '--' }}
          </span>
        </td>
        <td class="table_body_item">
          <div class="table_body_item_buttons">
            <div class="table_body_item_edit">
              <router-link :to="`/settings/promo-codes/update/${item.id}`">
                <RiPencilFill size="20" />
              </router-link>
            </div>
            <ModalData
              v-if="isOpenDeletePromocode && promocodeId === item.id"
              :title="'Confirm'"
              :text="'Are you sure to delete?'"
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
                  @click="deletePromocode()"
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
import { ref, onMounted, watch } from 'vue';
import TableForDataPage from '@/components/TableForDataPage.vue';
import { formatTimestamp } from '../../common/utils.js';
import { RiPencilFill, RiDeleteBinLine } from '@remixicon/vue';
import ModalData from '../../components/ModalData.vue';
import { promos } from '../../api/settings/promos/promos';

export default {
  name: 'PromoCodesPage',
  components: {
    TableForDataPage,
    RiPencilFill,
    RiDeleteBinLine,
    ModalData,
  },
  setup() {
    const fetchData = ref([]);
    const isOpenDeletePromocode = ref(false);
    const promocodeId = ref(null);
    const typePromos = ref(' ');
    const headers = ref([
      { label: 'CODE', key: 'CODE', minWidth: 250 },
      { label: 'AMOUNT', key: 'AMOUNT', minWidth: 200 },
      { label: 'TYPE', key: 'TYPE', minWidth: 150 },
      { label: 'USED', key: 'USED', minWidth: 100 },
      { label: 'EXPIRED AT', key: 'EXPIRED', minWidth: 200 },
      { label: 'ACTION', key: 'ACTION', minWidth: 100 },
    ]);

    const handleDelete = (item) => {
      isOpenDeletePromocode.value = true;
      promocodeId.value = item.id;
    };
    const capitalizeFirstLetter = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    const closeModal = () => {
      isOpenDeletePromocode.value = false;
      promocodeId.value = null;
    };

    const fetchDeletePromocode = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/subscription-promos/${promocodeId.value}`,
          { method: 'DELETE' }
        );
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        fetchPromoCodesData();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        throw error;
      }
    };
    const deletePromocode = () => {
      fetchDeletePromocode()
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error('Не удалось удалить город:', error);
        });
    };
    const fetchPromoCodesData = async () => {
      // let url = `${process.env.VUE_APP_BASE_URL}/admin/subscription-promos`;

      // if (typePromos.value !== ' ') {
      //   url += `?${typePromos.value.toLowerCase()}=true`;
      // }

      try {
        // const response = await fetch(url);
        // if (!response.ok) {
        //   throw new Error('Ошибка: ' + response.statusText);
        // }
        fetchData.value = promos;
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        fetchData.value = [];
      }
    };
    watch(typePromos, fetchPromoCodesData);

    onMounted(() => {
      fetchPromoCodesData();
    });

    return {
      fetchData,
      formatTimestamp,
      capitalizeFirstLetter,
      headers,
      handleDelete,
      isOpenDeletePromocode,
      promocodeId,
      deletePromocode,
      closeModal,
      typePromos,
    };
  },
};
</script>
<style scoped lang="scss">
.subscriptionPlan {
  padding: 16px 12px;
  flex-grow: 1;
  &__header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 30px;
    &_select {
      font-size: 16px;
      padding: 6px 16px 6px 12px;
      width: 137px;
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
    &_button {
      color: #ffffff;
      border-radius: 6px;
      width: 92px;
      height: 38px;
      background-color: #e15b51;
      display: block;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
      line-height: 37px;
      appearance: none;
      text-decoration: none;
      &:hover {
        cursor: pointer;
      }
    }
    &-x {
      display: flex;
      align-items: center;
    }

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
      &:hover {
        cursor: pointer;
      }
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
