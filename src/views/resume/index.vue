<template>
  <page />
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import Empty from '@/components/empty.vue';

  export default {
    name: 'resume-index',
    components: {
      Page: defineAsyncComponent({
        loader: () => import('./page.vue'),
        loadingComponent: Empty,
      })
    },
  };
</script>