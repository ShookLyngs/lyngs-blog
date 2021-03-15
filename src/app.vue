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