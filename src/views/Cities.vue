<template>
  <div class="cities">
    <div class="cities__header">
      <h2 class="cities__header_title">Cities</h2>
      <ModalData
        v-if="isOpenCreateCity"
        :title="'Add city'"
        @closeModal="closeModal"
      >
        <template #modal-input>
          <div class="modal__item">
            <label class="modal__item-label">Name *</label>
            <input
              class="modal__item-input"
              v-model="newCity"
              type="text"
              placeholder="Enter city name"
            />
          </div>
        </template>
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
            @click="createCity()"
          >
            Proceed
          </button>
        </template>
      </ModalData>

      <button class="cities__header_button" @click="openCreateModal()">
        Add new
      </button>
    </div>

    <TableForDataPage
      :items="fetchData"
      :headers="tableHeaders"
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
              v-if="isEditNameCity && cityId === item.id"
              :title="'Update city'"
              @closeModal="closeModal"
            >
              <template #modal-input>
                <div class="modal__item">
                  <label class="modal__item-label">Name *</label>
                  <input
                    class="modal__item-input"
                    v-model="item.name"
                    type="text"
                    placeholder="Enter city name"
                  />
                </div>
              </template>
              <template #modal-buttons>
                <button
                  type="button"
                  class="modal-confirm"
                  aria-label="Close"
                  @click="updateCity(item.id, item.name)"
                >
                  Save
                </button>
              </template>
            </ModalData>
            <div class="table_body_item_edit" @click="openEditModal(item)">
              <RiPencilFill size="20" />
            </div>
            <ModalData
              v-if="isOpenDeleteCity && cityId === item.id"
              :title="'Confirm'"
              :text="'Are you sure to delete?'"
              @closeModal="closeModal"
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
            <button class="table_body_item_delete" @click="openDeleteModal(item)">
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
import { RiDeleteBinLine, RiPencilFill } from '@remixicon/vue';
import TableForDataPage from '@/components/TableForDataPage.vue';
import ModalData from '../components/ModalData.vue';

export default {
  name: 'CitiesPage',
  components: {
    RiDeleteBinLine,
    TableForDataPage,
    ModalData,
    RiPencilFill,
  },
  setup() {
    const fetchData = ref([]);
    const nameAscending = ref(true);
    const isOpenDeleteCity = ref(false);
    const isOpenCreateCity = ref(false);
    const cityId = ref(null);
    const isEditNameCity = ref(false);
    const newCity = ref('');
    const tableHeaders = [
      { label: 'NAME', key: 'name', sortable: true, minWidth: 400 },
      { label: 'ACTION', key: 'action', minWIdth: 200 },
    ];

    onMounted(() => {
      fetchCitiesData();
    });

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

    const fetchCityAction = async (url, method, body) => {
      try {
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error('Error: ' + response.statusText);
        fetchCitiesData();
        closeModal();
      } catch (error) {
        console.error('Error with city action:', error);
      }
    };

    const createCity = () => {
      fetchCityAction(`${process.env.VUE_APP_BASE_URL}/admin/cities`, 'POST', {
        name: newCity.value,
      });
    };

    const updateCity = (id, name) => {
      fetchCityAction(`${process.env.VUE_APP_BASE_URL}/admin/cities`, 'PUT', {
        id,
        name,
      });
    };

    const deleteCity = () => {
      fetchCityAction(
        `${process.env.VUE_APP_BASE_URL}/admin/cities/${cityId.value}`,
        'DELETE'
      );
    };

    const filterData = (key, ascending) => {
      nameAscending.value = ascending;
      fetchData.value = [...fetchData.value].sort((f, s) => {
        return ascending
          ? f[key].localeCompare(s[key])
          : s[key].localeCompare(f[key]);
      });
    };

    const openDeleteModal = (item) => {
      isOpenDeleteCity.value = true;
      cityId.value = item.id;
    };

    const openCreateModal = () => {
      isOpenCreateCity.value = true;
    };

    const openEditModal = (item) => {
      isEditNameCity.value = true;
      cityId.value = item.id;
    };

    const closeModal = () => {
      isOpenDeleteCity.value = false;
      isEditNameCity.value = false;
      isOpenCreateCity.value = false;
      cityId.value = null;
      newCity.value = '';
    };

    return {
      fetchData,
      nameAscending,
      filterData,
      openDeleteModal,
      isOpenDeleteCity,
      cityId,
      closeModal,
      deleteCity,
      createCity,
      isEditNameCity,
      openEditModal,
      updateCity,
      isOpenCreateCity,
      openCreateModal,
      newCity,
      tableHeaders,
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
      border: none;
      &:hover {
        cursor: pointer;
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
.modal {
  &-close {
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
  &-confirm {
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
  &__item {
    display: flex;
    flex-direction: column;
    padding: 0 16px 16px 16px;
    margin-top: -16px;

    &-label {
      font-size: 16px;
      font-weight: 800;
      margin: 0 0 8px 0;
      &_checkbox {
        margin-bottom: 0;
      }
    }

    &-input {
      height: 42px;
      padding: 4px 12px;
      border-radius: 4px;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      flex: 1 1 auto;
      font-size: 16px;
      color: black;
    }
  }
}
</style>
