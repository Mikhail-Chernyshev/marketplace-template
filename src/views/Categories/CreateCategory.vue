<template>
  <div class="createCategory">
    <div class="createCategory__header">
      <h2 class="createCategory__header_title">Add category</h2>
      <h3 class="createCategory__header_route">
        <router-link :to="'/'"> {{ 'Dashboard ' }} </router-link>/
        <router-link :to="'/settings'">
          {{ capitalizeFirstLetter($route.meta.path) }}
        </router-link>
        /{{ ' Add category' }}
      </h3>
    </div>
    <CategoryItem :update="false" />
  </div>
</template>

<script>
import { formatTimestamp } from '../../common/utils.js';
import CategoryItem from '../../components/CategoryItem';

export default {
  name: 'CreateCategoryPage',
  components: { CategoryItem },
  setup() {
    const capitalizeFirstLetter = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    return {
      formatTimestamp,
      capitalizeFirstLetter,
    };
  },
};
</script>
<style scoped lang="scss">
.createCategory {
  padding: 16px 12px;
  flex-grow: 1;
  &__header {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 30px;
    &_title {
      font-size: 30px;
      margin: -3px 0 0 0;
      height: 38px;
      flex: 1 0;
    }
    &_route {
      font-size: 16px;
      margin: 0;
      font-weight: 500;
      & > a:visited {
        color: inherit;
      }
    }
  }
  &__selects {
    display: flex;
    gap: 18px;
    margin-bottom: 18px;
  }
  &__select {
    font-size: 16px;
    padding: 6px 16px 6px 12px;
    width: auto;
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
</style>
