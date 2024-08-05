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
      :headers="[
        { label: 'NAME', minWidth: 400 },
        { label: 'CREATED AT', minWidth: 250, width: 250 },
        { label: 'ACTION', minWidth: 200, width: 200 },
      ]"
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
            <button
              :disabled="false"
              class="table_body_item_delete"
              @click="showConfirmDialog"
            >
              <RiDeleteBinLine size="20" />
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

export default {
  name: 'CategoriesPage',
  components: { RiDeleteBinLine, RiPencilFill, TableForDataPage },
  setup() {
    const fetchData = ref(null);

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

    onMounted(() => {
      fetchCategoriesData();
    });

    return {
      fetchData,
      formatTimestamp,
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
    }
  }
}
</style>
