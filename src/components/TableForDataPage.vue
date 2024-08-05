<template>
  <div>
    <table class="table">
      <p class="nothing" v-if="items?.length === 0">
        {{ emptyMessage }}
      </p>
      <thead v-else class="table_header">
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            :style="{
              width: header.width + 'px',
              minWidth: header.minWidth + 'px',
            }"
            class="table_header_item"
          >
            {{ header.label }}
            <button
              v-if="header.sortable"
              class="table_header_item_filter"
              @click="toggleSort(header.key)"
            >
              <RiArrowUpLine v-if="!isSortedAscending(header.key)" size="20" />
              <RiArrowDownLine v-else size="20" />
            </button>
          </th>
        </tr>
      </thead>

      <tbody class="table_body">
        <tr v-for="item in items" :key="item.id">
          <slot name="row" :item="item"></slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { RiArrowUpLine, RiArrowDownLine } from '@remixicon/vue';
import { ref, computed } from 'vue';

export default {
  name: 'TableForDataPage',
  components: { RiArrowUpLine, RiArrowDownLine },

  props: {
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    emptyMessage: {
      type: String,
      default: 'No items',
    },
  },
  setup(props, { emit }) {
    const sortKey = ref(null);
    const sortAscending = ref(true);

    const sortedItems = computed(() => {
      if (!sortKey.value) {
        return props.items;
      }
      return [...props.items].sort((a, b) => {
        const aValue = a[sortKey.value];
        const bValue = b[sortKey.value];
        if (aValue < bValue) return sortAscending.value ? -1 : 1;
        if (aValue > bValue) return sortAscending.value ? 1 : -1;
        return 0;
      });
    });

    const toggleSort = (key) => {
      if (sortKey.value === key) {
        sortAscending.value = !sortAscending.value;
      } else {
        sortKey.value = key;
        sortAscending.value = true;
      }
      emit('sort', key, sortAscending.value);
    };

    const isSortedAscending = (key) => {
      return sortKey.value === key && sortAscending.value;
    };

    return {
      sortedItems,
      toggleSort,
      isSortedAscending,
    };
  },
};
</script>

<style scoped lang="scss">
.nothing {
  width: auto;
  border-radius: 8px;
  background-color: #cfe2ff;
  padding: 12px 16px;
  color: #052c65;
  border: 1px solid #9ec5fe;
}
.table {
  width: 100%;
  &_header_item {
    padding: 8px 8px;
    height: 24px;
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
}
</style>
