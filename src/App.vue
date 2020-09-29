<template>
  <div class="app">
    <router-view name="nav"></router-view>
    <router-view :key="key" name="main"></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  computed: {
    key() {
      return this.$route.fullPath;
    },
  },
};
</script>

<style scoped>
</style>
