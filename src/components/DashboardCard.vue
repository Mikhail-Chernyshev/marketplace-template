<template>
  <div class="dashboard__card">
    <div class="dashboard__card_body">
      <div class="dashboard__card_content">
        <component :is="iconComponent" :size="36" />
        <div class="dashboard__card_info">
          <h2 class="dashboard__card_info_title">{{ title }}</h2>
          <p class="dashboard__card_info_number">{{ value }}</p>
        </div>
      </div>
    </div>
    <div class="dashboard__card_footer">
      <router-link :to="link" class="dashboard__card_link">
        View all
      </router-link>
    </div>
  </div>
</template>

<script>
import * as icons from '@remixicon/vue';

export default {
  name: 'DashboardCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconComponent() {
      return icons[this.icon];
    },
  },
};
</script>

<style scoped lang="scss">
.dashboard__card {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: auto;
  height: 139px;
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 8px;
  &_body {
    display: flex;
    padding: 16px;
    height: 56px;
  }
  &_content {
    display: flex;
    align-items: center;
  }
  &_info {
    margin-left: 16px;
    height: 56px;
    text-align: left;

    &_title {
      font-size: 16px;
      margin: 0 0 4px 0;
    }
    &_number {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
  }
  &_footer {
    height: 100%;
    padding: 12px 16px;
    background-color: #21252908;
    border-top: 1px solid rgba(0, 0, 0, 0.175);
  }
  &_link {
    color: #2110d6;
    text-decoration: none;
  }
}
</style>
