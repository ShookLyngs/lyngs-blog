<template>
  <page />
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import Skeleton from './skeleton.vue';

  export default {
    name: 'article-post-index',
    components: {
      Page: defineAsyncComponent({
        loader: () => import('./page.vue'),
        loadingComponent: Skeleton,
      })
    },
  };
</script>