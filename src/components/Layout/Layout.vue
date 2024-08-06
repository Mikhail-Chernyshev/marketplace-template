<template>
  <div class="layout" @click="handleClickOutside()">
    <SideMenu :expanded="isSideMenuExpanded" />
    <div
      class="layout__main-content"
      :class="{ 'layout__main-content_expanded': isSideMenuExpanded }"
    >
      <HeaderLayout
        :isLocaleChoice="isLocaleChoice"
        :showLocaleChoice="showLocaleChoice"
        :toggleSideMenuExpansion="toggleSideMenuExpansion"
      />
      <main class="main">
        <router-view></router-view>
      </main>
      <footer class="footer">Copyright © 2024 Petrosoft</footer>
    </div>
  </div>
</template>

<script>
import SideMenu from './SideMenu.vue';
import HeaderLayout from './HeaderLayout.vue';
import { ref } from 'vue';
import { provide } from 'vue';

export default {
  name: 'MainLayout',
  components: {
    SideMenu,
    HeaderLayout,
  },
  setup() {
    const isSideMenuExpanded = ref(true);
    const isLocaleChoice = ref(false);
    const isOpenActionUser = ref({
      id: null,
      open: false,
    });
    function toggleSideMenuExpansion() {
      isSideMenuExpanded.value = !isSideMenuExpanded.value;
    }
    function handleClickOutside() {
      if (isLocaleChoice.value) {
        isLocaleChoice.value = !isLocaleChoice.value;
      }
      if (isOpenActionUser.value.open) {
        isOpenActionUser.value.open = !isOpenActionUser.value.open;
        isOpenActionUser.value.id = null;
      }
    }
    function showLocaleChoice() {
      isLocaleChoice.value = !isLocaleChoice.value;
    }
    provide('isOpenActionUser', isOpenActionUser);
    return {
      isSideMenuExpanded,
      toggleSideMenuExpansion,
      isLocaleChoice,
      handleClickOutside,
      showLocaleChoice,
      isOpenActionUser,
    };
  },
};
</script>

<style scoped>
.layout {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.layout__main-content {
  display: flex;
  flex-direction: column;
  width: calc(100% - 70px);
}
.layout__main-content_expanded {
  width: calc(100% - 250px);
}
.main {
  height: calc(100% - 140px);
}
.footer {
  height: 70px;
  padding: 0 16px;
  background-color: rgba(243, 244, 246);
  color: rgba(33, 37, 41, 0.75);
  line-height: 70px;
  font-weight: 500;
}
</style>
