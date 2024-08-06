<template>
  <div class="categories">
    <div class="categories__header">
      <h2 class="categories__header_title">Categories</h2>
      <router-link
        to="categories/create-category"
        class="categories__header_button"
      >
        Add new
      </router-link>
    </div>

    <TableForDataPage
      :items="fetchData"
      :headers="tableHeaders"
      emptyMessage="No categories found"
    >
      <template #row="{ item }">
        <td class="table_body_item">
          <span>{{ item.names[0]?.name }}</span>
        </td>
        <td class="table_body_item">
          {{ formatTimestamp(item.audit?.createdAt) }}
        </td>
        <td class="table_body_item">
          <div class="table_body_item_buttons">
            <div class="table_body_item_edit">
              <router-link :to="`/categories/${item.id}`">
                <RiPencilFill size="20" />
              </router-link>
            </div>

            <ModalData
              v-if="isOpenDeleteCategory && categoryId === item.id"
              :title="'Confirm'"
              :text="'Are you sure to delete?'"
              @closeModal="closeModal"
            >
              <template #modal-buttons>
                <button type="button" class="modal-close" @click="closeModal()">
                  Cancel
                </button>
                <button
                  type="button"
                  class="modal-confirm"
                  @click="confirmDeleteCategory()"
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
import { formatTimestamp } from '../common/utils.js';
import { RiDeleteBinLine, RiPencilFill } from '@remixicon/vue';
import TableForDataPage from '@/components/TableForDataPage.vue';
import ModalData from '../components/ModalData.vue';

export default {
  name: 'CategoriesPage',
  components: { RiDeleteBinLine, RiPencilFill, TableForDataPage, ModalData },
  setup() {
    const fetchData = ref(null);
    const isOpenDeleteCategory = ref(false);
    const categoryId = ref(0);
    const tableHeaders = [
      { label: 'NAME', minWidth: 400 },
      { label: 'CREATED AT', minWidth: 250, width: 250 },
      { label: 'ACTION', minWidth: 200, width: 200 },
    ];

    const fetchCategoriesData = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/categories/0/list`
        );
        if (!response.ok) {
          throw new Error('Сетевая ошибка: ' + response.statusText);
        }
        fetchData.value = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    const fetchDeleteCategory = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/categories/${categoryId.value}`,
          { method: 'DELETE' }
        );
        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        throw error;
      } finally {
        fetchCategoriesData();
      }
    };

    const handleDelete = (item) => {
      isOpenDeleteCategory.value = true;
      categoryId.value = item.id;
    };

    const closeModal = () => {
      isOpenDeleteCategory.value = false;
      categoryId.value = null;
    };

    const confirmDeleteCategory = () => {
      fetchDeleteCategory()
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error('Не удалось удалить категорию:', error);
        });
    };

    onMounted(() => {
      fetchCategoriesData();
    });

    return {
      fetchData,
      formatTimestamp,
      handleDelete,
      closeModal,
      isOpenDeleteCategory,
      categoryId,
      confirmDeleteCategory,
      tableHeaders,
    };
  },
};
</script>
<style scoped lang="scss">
.categories {
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
      &:hover {
        cursor: pointer;
      }
    }
  }
}
.table {
  &_body_item {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;

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
