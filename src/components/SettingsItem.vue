<template>
  <div
    :style="{ width: `calc(33.3% - ${numberForWidth * 16}px)` }"
    role="button"
    class="item"
  >
    <div :style="{ backgroundColor: bgColor }" class="item__icon">
      <slot name="icon">{{ icon }}</slot>
    </div>
    <div class="item__content">
      <h6 class="item__content_title">{{ title || '' }}</h6>
      <p class="item__content_subtitle">{{ subtitle || '' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    numberForWidth: { type: String, default: '' },
    bgColor: { type: String, default: '' },
  },
};
</script>

<style scoped lang="scss">
.item {
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 8px;
  display: flex;
  gap: 16px;
  &__icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__content {
    display: flex;
    flex-direction: column;
    &_title {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 800;
    }
    &_subtitle {
      margin: 0;
      font-size: 14px;
    }
  }
}
</style>
