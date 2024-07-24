<template>
  <div class="d-flex flex-column flex-shrink-0 h-100 text-light">
    <div
      class="hstack text-white custom-border-bottom"
      :class="{ 'px-3': expanded, 'justify-content-center': !expanded }"
      :style="{ minHeight: '70px' }"
    >
      <img src="/images/logo.png" width="36" height="36" alt="" />
      <h4 v-if="expanded" class="mb-0 ms-3 fw-bold">{{ appName }}</h4>
    </div>

    <div class="scrollbar-none" style="overflow-y: auto">
      <ul
        class="nav flex-column text-center"
        :class="{ 'text-lg-start': expanded }"
      >
        <MenuItem to="/admin" label="Dashboard" :expanded="expanded" />
        <div class="custom-border-bottom"></div>

        <span
          v-if="expanded"
          class="text-white-50 my-3 small fw-bold px-3 text-uppercase"
        >
          CONTENTS
        </span>

        <MenuItem to="/admin/banners" label="Banners" :expanded="expanded" />
        <MenuItem
          to="/admin/categories"
          label="Categories"
          :expanded="expanded"
        />
        <MenuItem to="/admin/cities" label="Cities" :expanded="expanded" />
        <MenuItem to="/admin/shops" label="Shops" :expanded="expanded" />
        <MenuItem to="/admin/products" label="Products" :expanded="expanded" />

        <div class="custom-border-bottom mb-2"></div>

        <MenuItem to="/admin/users" label="Users" :expanded="expanded" />
        <MenuItem to="/admin/settings" label="Settings" :expanded="expanded" />
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import MenuItem from './MenuItem.vue'; 

export default {
  components: {
    MenuItem,
  },
  setup() {
    const expanded = ref(true); 
    const appName = process.env.NEXT_PUBLIC_APP_NAME; 

    // const getIcon = (iconName) => {
    //   return <${iconName} size="${!expanded.value ? 24 : 20}" />; //
    // };

    return {
      expanded,
      appName,
      //   getIcon,
    };
  },
};
</script>

<style scoped>
.custom-border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
}
.scrollbar-none {
  scrollbar-width: none; 
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
