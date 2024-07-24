<template>
  <div
    :style="{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    }"
  >
    <div
      :style="{
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
      }"
    >
      <h1 :style="{ margin: 0 }">{{ appName }}</h1>
      <SideMenu expanded="{delayExpanded}" />
    </div>
    <div
      :style="{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }"
    >
      <header :style="{ height: '100px' }">
        <h1 :style="{ margin: 0 }">{{ appName }}</h1>
      </header>
      <main :style="{ height: '100%' }">
        <router-view></router-view>
      </main>
      <footer :style="{ height: '100px' }">© 2023 Мой сайт</footer>
    </div>
  </div>
</template>

<script>
import SideMenu from './SideMenu.vue';
export default {
  name: ' MainLayout',
  components: {
    SideMenu,
  },
  data() {
    return {
      appName: process.env.VUE_APP_APP_NAME,
    };
  },
  mounted() {
    console.log(123, process.env);
  },
};
</script>

<style scoped></style>
