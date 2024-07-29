<template>
  <div class="categories">
    <div class="categories__header">
      <h2 class="categories__header_title">Categories</h2>

      <Link
        href="/admin/categories/create-category"
        class="categories__header_button"
      >
        Add new
      </Link>
    </div>

    <table class="subscriptions__table">
      <thead class="subscriptions__table_header">
        <tr>
          <th class="subscriptions__table_header_item">NAME</th>
          <th class="subscriptions__table_header_item">CREATED AT</th>
          <th class="subscriptions__table_header_item">ACTION</th>
        </tr>
      </thead>
      <p class="subscriptions__nothing" v-if="fetchData?.length === 0">
        No subscriptions
      </p>
      <tbody class="subscriptions__table_body" v-else>
        <tr v-for="el in fetchData" :key="el.id">
          <td class="subscriptions__table_body_item">
            <span>{{ el.names[0].name }}</span>
          </td>
          <td class="subscriptions__table_body_item">
            {{ formatTimestamp(el.audit?.createdAt) }}
          </td>
          <td class="subscriptions__table_body_item">
            <div class="subscriptions__table_body_item_buttons">
              <div class="subscriptions__table_body_item_edit">
                <router-link :to="`/admin/categories/${el.id}`">
                  <RiPencilFill size="20" />
                </router-link>
              </div>
              <button
                :disabled="false"
                class="subscriptions__table_body_item_delete"
                @click="showConfirmDialog"
              >
                <RiDeleteBinLine size="20" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { formatTimestamp } from '../commom/utils.js';
import { RiDeleteBinLine, RiPencilFill } from '@remixicon/vue';
export default {
  name: 'CategoriesPage',
  components: { RiDeleteBinLine, RiPencilFill },
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
    margin-bottom: 29px;
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
    }
  }
}
.subscriptions {
  &__table {
    width: 100%;
    &_header_item {
      padding: 8px;
      text-align: left;
      font-weight: 900;
      border-bottom: 1px solid #dee2e6;
      width: 24%;
      &:first-child {
        width: 57%;
      }
      &:last-child {
        width: 19%;
      }
    }

    &_body_item {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #dee2e6;
      &_link {
        color: black;
        font-weight: 800;
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
  &__nothing {
    padding: 8px 0;
    margin: 0;
  }
}
</style>
