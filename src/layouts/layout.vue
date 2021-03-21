<template>
  <div class="h-full flex-auto flex flex-col">
    <div class="flex-auto flex flex-col overflow-y-auto" ref="content">
      <layout-header />
      <main class="flex flex-col">
        <slot />
      </main>
      <layout-footer />
    </div>
  </div>
</template>

<script>
  // Functions
  import { ref } from 'vue';
  import { createResize } from '@/hooks/use-resize';
  // Components
  import LayoutHeader from './header.vue';
  import LayoutFooter from './footer.vue';

  export default {
    name: 'layout',
    components: {
      LayoutHeader,
      LayoutFooter,
    },
    setup() {
      // Create ResizeObserver on content scroller
      const content = ref(null);
      createResize(content);

      return {
        content,
      };
    },
  };
</script>

<style scoped>

</style>