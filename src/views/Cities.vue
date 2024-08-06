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
              v-if="isEditNameCity && cityId === item.id"
              :title="'Update city'"
              @closeModal="closeModal"

            >
              <template #modal-input>
                <div class="category__item">
                  <label class="category__item-label">Name *</label>
                  <input
                    class="category__item-input category__item-input_borderLeft"
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
                  @click="updateCityName(item.id, item.name)"
                >
                  Save
                </button>
              </template>
            </ModalData>
            <div class="table_body_item_edit" @click="handleEdit(item)">
              <RiPencilFill size="20" />
            </div>
            <ModalData
              v-if="isOpenDeleteCity && cityId === item.id"
              :title="'Confirm'"
              :text="'Are you sure to confirm?'"
]            >
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
    const cityId = ref(null);
    const isEditNameCity = ref(false);

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

    const fetchUpdateNameCity = async (id, newName) => {
      try {
        const body = { id: id, name: newName };
        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/cities`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }
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

    const handleEdit = (item) => {
      isEditNameCity.value = true;
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

    const updateCityName = (id, name) => {
      fetchUpdateNameCity(id, name)
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error('Не удалось удалить город:', error);
        });
    };

    updateCityName;

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
      isEditNameCity,
      handleEdit,
      updateCityName,
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
.category {
  &__item {
    display: flex;
    flex-direction: column;
    padding: 0 16px 16px 16px;
    margin-top: -16px;
    &-button-upload {
      width: 120px;
      height: 120px;
      background-color: #ffffff;
      border-radius: 4px;
      border: 1px solid rgba(0, 0, 0, 0.175);
      &:hover {
        cursor: pointer;
      }
      &-input {
        width: 0;
        height: 0;
      }
    }
    &-label {
      font-size: 16px;
      font-weight: 800;
      margin: 0 0 8px 0;
      &_checkbox {
        margin-bottom: 0;
      }
    }
    &-field {
      width: 100%;
      display: flex;
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
    &-checkbox {
      height: 20px;
      margin: 0;
      margin-right: 12px;
    }
    &-lang {
      line-height: 42px;
      padding: 4px 12px;
      border-radius: 0 4px 4px 0;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      font-size: 16px;
      color: black;
      width: 32px;
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
