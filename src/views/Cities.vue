<template>
  <div class="cities">
    <div class="cities__header">
      <h2 class="cities__header_title">Cities</h2>
    </div>

    <TableForDataPage
      :items="fetchData"
      :headers="[
        { label: 'NAME', key: 'name', sortable: true, minWidth: 400 },
        { label: 'ACTION', key: 'action', minWIdth: 200 },
      ]"
      emptyMessage="No cities found"
      @sort="filterData"
    >
      <template #row="{ item }">
        <td class="table_body_item">
          <span>{{ item.name }}</span>
        </td>

        <td class="table_body_item">
          <div class="table_body_item_buttons">
            <ModalData
              v-if="isOpenDeleteCity && cityId === item.id"
              :title="'Confirm'"
              :text="'Are you sure to confirm?'"
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
                  @click="deleteCity()"
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
import { RiDeleteBinLine } from '@remixicon/vue';
import TableForDataPage from '@/components/TableForDataPage.vue';
import ModalData from '../components/ModalData.vue';

export default {
  name: 'CitiesPage',
  components: {
    RiDeleteBinLine,
    TableForDataPage,
    ModalData,
  },
  setup() {
    const fetchData = ref([]);
    const nameAscending = ref(true);
    const isOpenDeleteCity = ref(false);
    const cityId = ref(null);

    const fetchCitiesData = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/cities`
        );
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
        fetchData.value = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        fetchData.value = [];
      }
    };

    const fetchDeleteCity = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/cities/${cityId.value}`,
          { method: 'DELETE' }
        );
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        throw error;
      }
    };

    onMounted(() => {
      fetchCitiesData();
    });

    const filterData = (key, ascending) => {
      nameAscending.value = ascending;
      fetchData.value = [...fetchData.value].sort((f, s) => {
        return ascending
          ? f[key].localeCompare(s[key])
          : s[key].localeCompare(f[key]);
      });
    };

    const handleDelete = (item) => {
      isOpenDeleteCity.value = true;
      cityId.value = item.id;
    };

    const closeModal = () => {
      isOpenDeleteCity.value = false;
      cityId.value = null;
    };

    const deleteCity = () => {
      fetchDeleteCity()
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error('Не удалось удалить город:', error);
        });
    };

    return {
      fetchData,
      nameAscending,
      filterData,
      handleDelete,
      isOpenDeleteCity,
      cityId,
      closeModal,
      fetchDeleteCity,
      deleteCity,
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
    }
  }
}
.table {
  &_body_item {
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-weight: 900;

    &_buttons {
      display: flex;
      gap: 10px;
    }

    &_delete {
      width: 45px !important;
      background-color: #d50002;
      color: white;
      border-radius: 6px;
      text-align: center;
      height: 32px !important;
      border: none;
      > svg {
        margin-top: 3px;
      }
      :hover {
        cursor: pointer;
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
