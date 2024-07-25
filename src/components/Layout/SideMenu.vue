<template>
  <div
    class="sideMenu sideMenu_transition-width"
    :class="{ sideMenu_expanded: expanded }"
  >
    <div class="sideMenu__header">
      <img class="sideMenu__logo" src="/images/logo.png" />
      <h1
        class="sideMenu__title"
        :class="{ sideMenu__title_hidden: !expanded }"
      >
        {{ appName }}
      </h1>
    </div>
    <ul class="sideMenu__nav">
      <MenuItem to="/admin" label="Dashboard" :expanded="expanded">
        <template #icon>
          <RiComputerLine
            class="sideMenu__navItemIcon"
            :class="{ sideMenu__navItemIcon_expanded: expanded }"
            :size="!expanded ? 24 : 20"
          />
        </template>
      </MenuItem>
      <div class="sideMenu__border-bottom"></div>
      <p class="sideMenu__subTitle" v-if="expanded">CONTENTS</p>

      <MenuItem to="/admin/categories" label="Categories" :expanded="expanded">
        <template #icon>
          <RiBookmarkLine
            class="sideMenu__navItemIcon"
            :class="{ sideMenu__navItemIcon_expanded: expanded }"
            :size="!expanded ? 24 : 20"
          />
        </template>
      </MenuItem>
      <MenuItem to="/admin/cities" label="Cities" :expanded="expanded">
        <template #icon>
          <RiMap2Line
            class="sideMenu__navItemIcon"
            :class="{ sideMenu__navItemIcon_expanded: expanded }"
            :size="!expanded ? 24 : 20"
          />
        </template>
      </MenuItem>
      <MenuItem to="/admin/shops" label="Shops" :expanded="expanded">
        <template #icon>
          <RiStore2Line
            class="sideMenu__navItemIcon"
            :class="{ sideMenu__navItemIcon_expanded: expanded }"
            :size="!expanded ? 24 : 20"
          />
        </template>
      </MenuItem>
      <MenuItem to="/admin/products" label="Products" :expanded="expanded">
        <template #icon>
          <RiBox3Line
            class="sideMenu__navItemIcon"
            :class="{ sideMenu__navItemIcon_expanded: expanded }"
            :size="!expanded ? 24 : 20"
          />
        </template>
      </MenuItem>

      <div class="sideMenu__border-bottom"></div>

      <MenuItem to="/admin/users" label="Users" :expanded="expanded">
        <template #icon>
          <RiGroupLine
            class="sideMenu__navItemIcon"
            :class="{ sideMenu__navItemIcon_expanded: expanded }"
            :size="!expanded ? 24 : 20"
          />
        </template>
      </MenuItem>
      <MenuItem to="/admin/settings" label="Settings" :expanded="expanded">
        <template #icon>
          <RiSettings3Line
            class="sideMenu__navItemIcon"
            :class="{ sideMenu__navItemIcon_expanded: expanded }"
            :size="!expanded ? 24 : 20"
          />
        </template>
      </MenuItem>
    </ul>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
import {
  RiBookmarkLine,
  RiBox3Line,
  RiComputerLine,
  RiGroupLine,
  RiMap2Line,
  RiSettings3Line,
  RiStore2Line,
} from '@remixicon/vue';
export default {
  props: {
    expanded: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    MenuItem,
    RiBookmarkLine,
    RiBox3Line,
    RiComputerLine,
    RiGroupLine,
    RiMap2Line,
    RiSettings3Line,
    RiStore2Line,
  },

  setup() {
    const appName = process.env.VUE_APP_APP_NAME;

    return {
      appName,
    };
  },
};
</script>

<style scoped lang="scss">
.sideMenu {
  width: 70px;
  display: flex;
  flex-direction: column;
  background-color: rgb(43, 52, 69);

  &_expanded {
    width: 250px;
  }

  &__header {
    display: flex;
    height: 70px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  &__logo {
    height: 36px;
    width: 36px;
    margin-right: 16px;
  }

  &__title {
    margin: 0;
    font-size: 24px;
    color: #f3f4f6;
    font-weight: 900;

    &_hidden {
      display: none;
    }
  }

  &__nav {
    margin: 0;
    padding: 8px 0 0 0;
    &ItemIcon_expanded {
      margin-right: 8px;
    }
  }

  &__border-bottom {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__subTitle {
    margin: 16px 0;
    padding: 0 16px;
    font-weight: 800;
    font-size: 14px;
    height: 21px;
    color: rgba(255, 255, 255, 0.5) !important;
  }
  &_transition-width {
    transition: width 0.3s ease;
  }
}
</style>
