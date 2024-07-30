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
        class="form-check"
      >
        <input
          id="featuredCheck"
          class="form-check-input"
          type="checkbox"
          v-model="query.featured"
        />
        <label for="featuredCheck" class="form-check-label fw-medium">
          Featured
        </label>
      </div>
      <div
        :style="{ display: 'flex', alignItems: 'center', fontWeight: '600' }"
        class="form-check"
      >
        <input
          id="discountCheck"
          class="form-check-input"
          type="checkbox"
          v-model="query.discount"
        />
        <label for="discountCheck" class="form-check-label fw-medium">
          Discount
        </label>
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
            <span class="table_body_item_status">{{ item.price }}</span>
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
    &_select {
      font-size: 16px;
      padding: 6px 16px 6px 12px;
      width: 127px;
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
}
.table {
  width: 100%;
  &_header_item {
    padding: 8px;
    text-align: left;
    font-weight: 900;
    border-bottom: 1px solid #dee2e6;
    position: relative;

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
</style>
