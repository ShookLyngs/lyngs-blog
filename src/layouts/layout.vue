<template>
  <div class="h-full flex-auto flex flex-col" ref="content">
    <scrollbar
      disabled-horizontal
      class="flex-auto flex flex-col"
      wrap-class="flex-auto flex flex-col"
      view-class="flex-auto flex flex-col"
    >
      <layout-header />
      <main class="flex flex-col pb-36">
        <slot />
      </main>
      <layout-footer />
    </scrollbar>
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