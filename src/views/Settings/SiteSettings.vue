<template>
  <div class="siteSettings">
    <div class="siteSettings__header">
      <h2 class="siteSettings__header_title">Site settings</h2>
      <h3 v-if="fetchData" class="siteSettings__header_route">
        <router-link :to="'/settings'">
          {{ `${capitalizeFirstLetter($route.meta.path)}` }}
        </router-link>
        {{ ' / ' }}
        <span> {{ capitalizeFirstLetter($route.meta.subPath) }} </span>
      </h3>
    </div>
    <div class="siteSettings__items">
      <SiteSettingTextAreaItem
        v-for="el in settingsArray"
        :key="el.title"
        :element="el"
        :fetchData="fetchData"
        v-model="fetchData[el?.value]"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import SiteSettingTextAreaItem from '../../components/SiteSettingTextAreaItem.vue';

export default {
  name: 'SiteSettingsPage',
  components: { SiteSettingTextAreaItem },
  setup() {
    const fetchData = ref([]);
    const settingsArray = [
      { title: 'About us', path: 'about-us', value: 'aboutUs' },
      {
        title: 'Terms and conditions',
        path: 'terms-and-conditions',
        value: 'termsAndConditions',
      },
      {
        title: 'Privacy policy',
        path: 'privacy-policy',
        value: 'privacyPolicy',
      },
    ];

    const capitalizeFirstLetter = (string) =>
      string.charAt(0).toUpperCase() + string.slice(1);

    const updatePermissions = (newPermissions) => {
      fetchData.value.permissions = newPermissions;
    };

    const fetchSettingsData = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/site-setting`
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
      fetchSettingsData();
    });

    return {
      capitalizeFirstLetter,
      fetchData,
      updatePermissions,

      settingsArray,
    };
  },
};
</script>
<style scoped lang="scss">
.siteSettings {
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
  &__items {
    display: flex;
    flex-direction: column;
    width: 82%;
  }
}
</style>
