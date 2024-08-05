<template>
  <div class="updateCategory">
    <div class="updateCategory__header">
      <h2 class="updateCategory__header_title">Update permissions</h2>
      <h3 v-if="fetchData" class="updateCategory__header_route">
        <router-link :to="'/settings'">
          {{ `${capitalizeFirstLetter($route.meta.path)}` }}
        </router-link>
        {{ ' / ' }}
        <router-link :to="'/settings'">
          {{ capitalizeFirstLetter($route.meta.subPath) }}
        </router-link>
        /{{ fetchData.name }}
      </h3>
    </div>
    <UserPermissionsCard
      @putCategoriesData="putCategoriesData"
      @update-permissions="updatePermissions"
      :user="fetchData"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import UserPermissionsCard from '../../../components/UserPermissionsCard';

export default {
  name: 'EditUserPage',
  components: { UserPermissionsCard },
  setup() {
    const fetchData = ref([]);
    const route = useRoute();
    const capitalizeFirstLetter = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    const updatePermissions = (newPermissions) => {
      fetchData.value.permissions = newPermissions;
    };

    const fetchCategoriesData = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/users/${route.params.id}`
        );
        if (!response.ok) {
          throw new Error('Сетевая ошибка: ' + response.statusText);
        }
        fetchData.value = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    const putCategoriesData = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/staff-users/${route.params.id}/permissions`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify(fetchData.value.permissions), 
          }
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
      capitalizeFirstLetter,
      fetchData,
      updatePermissions,
      putCategoriesData,
    };
  },
};
</script>
<style scoped lang="scss">
.updateCategory {
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
