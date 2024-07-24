<template>
  <Layout />
</template>

<script>
import Layout from './components/Layout/Layout.vue';

export default {
  name: 'App',
  components: {
    Layout,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
body {
  margin: 0;
}
</style>
