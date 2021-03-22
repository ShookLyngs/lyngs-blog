<template>
  <layout>
    <router-view />
  </layout>
</template>

<script>
  import Layout from '@/layouts/layout.vue';

  export default {
    name: 'app',
    components: {
      Layout,
    },
  };
</script>

<style lang="less">
  //@import "@/assets/styles/index.less";
</style>