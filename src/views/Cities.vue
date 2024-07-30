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

export default {
  name: 'CitiesPage',
  components: {
    RiDeleteBinLine,
    TableForDataPage,
  },
  setup() {
    const fetchData = ref([]);
    const nameAscending = ref(true);

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
      console.log('Удалить элемент', item);
    };

    return {
      fetchData,
      nameAscending,
      filterData,
      handleDelete,
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
  width: 100%;
  &_header_item {
    padding: 8px;
    text-align: left;
    font-weight: 900;
    border-bottom: 1px solid #dee2e6;
    width: 24%;
    position: relative;
    &:first-child {
      width: 81%;
    }
    &:last-child {
      width: 19%;
    }
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
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
    font-weight: 900;

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
      border-radius: 6px;
      text-align: center;
      height: 32px !important;
      border: none;
      > svg {
        margin-top: 3px;
      }
    }
  }
}

</style>
