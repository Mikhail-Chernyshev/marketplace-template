<template>
  <div class="siteSettings__item">
    <div class="siteSettings__item-header">
      <h2 class="siteSettings__item-title">{{ element?.title }}</h2>
      <button
        class="siteSettings__item-save"
        @click="handleSaveSetting(element?.path)"
      >
        Save
      </button>
    </div>
    <div class="siteSettings__content">
      <textarea
        v-model="localValue"
        class="siteSettings__textarea"
        rows="5"
        :placeholder="`Enter ${element?.title}...`"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  name: 'SiteSettingTextAreaItem',
  props: {
    element: {
      type: Object,
      required: true,
    },
    fetchData: { type: Object, required: true },
    modelValue: { type: String, required: true },
  },
  setup(props) {
    const localValue = ref(props.modelValue);
    const handleSaveSetting = (setting) => {
      putSettingsData(setting);
    };

    const putSettingsData = async (path) => {
      const data = new FormData();
      data.append('value', localValue.value);

      try {
        const response = await fetch(
          `${process.env.VUE_APP_BASE_URL}/admin/site-setting/${path}`,
          {
            method: 'PUT',
            body: data,
          }
        );
        if (!response.ok) {
          throw new Error('Сетевая ошибка: ' + response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        localValue.value = newValue;
      }
    );

    return { localValue, handleSaveSetting };
  },
};
</script>

<style scoped lang="scss">
.siteSettings__item {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 6px;
  width: 100%;
  &-header {
    display: flex;
    border-bottom: 1px solid #dee2e6;
    background-color: #21252908;
    padding: 8px 16px;
    justify-content: space-between;
  }
  &-title {
    margin: 0;
    font-size: 20px;
  }
  &-save {
    appearance: none;
    font-size: 16px;
    padding: 6px 12px;
    border: none;
    background-color: #e15b51;
    border-radius: 6px;
    height: 37px;
    line-height: 26px;
    font-weight: 700;
    color: #ffffff;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
