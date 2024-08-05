<template>
  <div class="settings">
    <div class="settings__header">
      <h2 class="settings__header_title">Settings</h2>
    </div>
    <div class="settings__container">
      <h3 class="settings__container_title">WEBSITE</h3>
      <div class="settings__container_items">
        <SettingsItem
          path="staff-users"
          title="Staff"
          subtitle="Manage staff users"
          bgColor="#00A524"
          numberForWidth="3"
        >
          <template #icon>
            <RiGroupLine :size="32" :color="'white'" />
          </template>
        </SettingsItem>
        <SettingsItem
          title="Site Settings"
          subtitle="Manage site settings"
          bgColor="#C9C9C9"
          numberForWidth="3"
        >
          <template #icon>
            <RiEditBoxLine :size="32" />
          </template>
        </SettingsItem>
      </div>
    </div>
    <div class="settings__container">
      <h3 class="settings__container_title">SUBSCRIPTIONS</h3>
      <div class="settings__container_items">
        <SettingsItem
          title="Subscrription plans"
          subtitle="Manage subscription plans"
          bgColor="#E15B51"
          numberForWidth="2"
        >
          <template #icon>
            <RiMoneyDollarCircleLine :size="32" :color="'white'" />
          </template>
        </SettingsItem>
        <SettingsItem
          title="Promo Codes"
          subtitle="Manage subscription promos"
          bgColor="#FF9017"
          numberForWidth="2"
        >
          <template #icon>
            <RiDiscountPercentLine :size="32" :color="'white'" />
          </template>
        </SettingsItem>
        <SettingsItem
          title="Subscription history"
          subtitle="View subscription logs"
          bgColor="#C9C9C9"
          numberForWidth="2"
        >
          <template #icon>
            <RiCalendarLine :size="32" />
          </template>
        </SettingsItem>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsItem from '../components/SettingsItem.vue';
import {
  RiCalendarLine,
  RiDiscountPercentLine,
  RiEditBoxLine,
  RiGroupLine,
  RiMoneyDollarCircleLine,
} from '@remixicon/vue';

export default {
  name: 'PageSettings',
  components: {
    SettingsItem,
    RiCalendarLine,
    RiDiscountPercentLine,
    RiEditBoxLine,
    RiGroupLine,
    RiMoneyDollarCircleLine,
  },
};
</script>
<style scoped lang="scss">
.settings {
  padding: 16px 12px;
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    &_title {
      font-size: 32px;
      margin: -3px 0 0 0;
      height: 38px;
      flex: 1 0;
    }
  }
  &__container {
    display: flex;
    flex-direction: column;
    &_title {
      font-size: 14px;
      padding: 0 0 8px 0;
      margin: 0 0 16px 0;
      border-bottom: 1px solid #dee2e6;
    }
    &_items {
      display: flex;
      gap: 20px;
      margin-bottom: 48px;
    }
  }
}
</style>
