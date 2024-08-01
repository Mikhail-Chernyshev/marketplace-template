<template>
  <div class="cities">
    <div class="cities__header">
      <h2 class="cities__header_title">Products</h2>
      <input
        class="cities__header_search"
        id="searchInput"
        type="search"
        placeholder="Search..."
        v-model="searchQuery"
      />
      <div
        :style="{
          display: 'flex',
          alignItems: 'center',
          marginRight: '12px',
          fontWeight: '600',
        }"
        class="cities__header_checkboxs"
      >
        <input
          id="featuredCheck"
          class="cities__header_checkbox"
          type="checkbox"
          v-model="query.featured"
        />
        <label for="featuredCheck"> Featured </label>
      </div>
      <div
        :style="{ display: 'flex', alignItems: 'center', fontWeight: '600' }"
        class="form-check"
      >
        <input
          id="discountCheck"
          class="cities__header_checkbox"
          type="checkbox"
          v-model="query.discount"
        />
        <label for="discountCheck"> Discount </label>
      </div>
    </div>
    <TableForDataPage
      :items="fetchData?.contents"
      :headers="[
        { label: 'IMAGE', key: 'image', minWidth: 100 },
        { label: 'NAME', key: 'name', minWidth: 250 },
        { label: 'PRICE', key: 'price', minWidth: 150 },
        { label: 'CATEGORY', key: 'category', minWidth: 100 },
        { label: 'DISCOUNT', key: 'discount', minWidth: 100 },
        { label: 'FEATURED', key: 'featured', minWidth: 100 },
      ]"
      emptyMessage="No products"
    >
      <template #row="{ item }">
        <td class="table_body_item">
          <img
            class="table_body_item_image"
            :src="'/images/placeholder.jpeg'"
            alt="Product Image"
          />
        </td>
        <td class="table_body_item">
          <RouterLink
            :style="{ color: 'black', fontWeight: '900' }"
            :to="`/products/${item.slug}`"
            class="text-dark"
          >
            {{ item.name }}
          </RouterLink>
        </td>
        <td class="table_body_item">
          <span>{{ item.price }}</span>
        </td>
        <td class="table_body_item">
          <span>{{ item?.category?.name ? item?.category?.name : '-' }}</span>
        </td>
        <td class="table_body_item">
          <span :style="{ color: '#D50002', fontWeight: '500' }">
            {{
              item?.discount?.value ? '-' + item?.discount?.value + ' %' : '-'
            }}
          </span>
        </td>
        <td class="table_body_item">
          <input
            class="table_body_item_switch"
            type="checkbox"
            role="switch"
            :checked="item.featured"
            @change="handleChangeFeatured(item.id, item.featured)"
          />
        </td>
      </template>
    </TableForDataPage>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { formatTimestamp } from '../common/utils.js';
import TableForDataPage from '@/components/TableForDataPage.vue';

export default {
  name: 'CitiesPage',
  components: { TableForDataPage },
  setup() {
    const fetchData = ref([]);
    const nameAscending = ref(true);
    const searchQuery = ref('');
    const chedasdasd = ref(false);
    const query = ref({
      featured: false,
      discount: false,
    });

    const handleChangeFeatured = (id, featured) => {
      if (!featured) {
        updateFeatureStatus(id, 'make-featured');
      } else {
        updateFeatureStatus(id, 'remove-featured');
      }
    };

    const fetchProductsData = async () => {
      let url = `${process.env.VUE_APP_BASE_URL}/admin/products`;

      if (searchQuery.value !== '') {
        url += `?q=${searchQuery.value}`;
      } else {
        const queryParams = [];
        if (query.value.featured !== undefined) {
          queryParams.push(`featured=${query.value.featured}`);
        }
        if (query.value.discount !== undefined) {
          queryParams.push(`discount=${query.value.discount}`);
        }
        if (queryParams.length) {
          url += `?${queryParams.join('&')}`;
        }
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

    const updateFeatureStatus = async (id, path) => {
      try {
        let response;
        response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/products/${id}/${path}`,
          { method: 'PUT' }
        );

        if (!response.ok) {
          throw new Error('Ошибка: ' + response.statusText);
        } else {
          console.log('Success');
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    watch(searchQuery, fetchProductsData);
    watch(() => query.value.featured, fetchProductsData);
    watch(() => query.value.discount, fetchProductsData);

    onMounted(() => {
      fetchProductsData();
    });

    return {
      fetchData,
      nameAscending,
      searchQuery,
      query,
      formatTimestamp,
      chedasdasd,
      updateFeatureStatus,
      handleChangeFeatured,
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
      padding: 6px 16px;
      width: 213px;
      font-size: 18px;
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
    &_checkbox {
      width: 16px;
      height: 16px;
      margin-right: 8px;
      border: 1px solid rgba(0, 0, 0, 0.175);
      border-radius: 4px;
    }
  }
}
.table {
  &_body_item {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-weight: 900;
    &_image {
      width: 34px;
      height: 34px;
      object-fit: contain;
      border: 1px solid #dee2e6;
      border-radius: 6px;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
