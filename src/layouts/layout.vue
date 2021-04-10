<template>
  <div class="h-full flex-auto flex flex-col" ref="content">
    <scrollbar
      disabled-horizontal
      ref="scroll"
      class="flex-auto flex flex-col"
      wrap-class="flex-auto flex flex-col"
      view-class="flex-auto flex flex-col"
      @scroll="onScroll"
    >
      <keep-alive>
        <layout-header />
      </keep-alive>

      <main class="main flex flex-col pb-36">
        <slot />
      </main>

      <keep-alive>
        <layout-footer />
      </keep-alive>
    </scrollbar>
  </div>
</template>

<script>
  // Functions
  import { ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import { createResizeObserver } from '@/hooks/use-resize-observer';
  import { createLayoutState } from '@/hooks/use-layout-state';

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
      createResizeObserver(content);

      // Watch route changes
      // When route updated, scroll content to the top
      const scroll = ref();
      const route = useRoute();
      const lastFullPath = ref(route.fullPath);
      watchEffect(() => {
        if (route.fullPath !== lastFullPath.value && scroll.value) {
          scroll.value.scrollTo(0, 0);
        }
        lastFullPath.value = route.fullPath;
      });

      // Update scrollTop
      const scrollTop = ref(0);
      function onScroll({ scrollTop: top }) {
        scrollTop.value = top;
      }

      // Create layout state store
      createLayoutState({
        scrollTop,
      });

      return {
        content,
        scroll,

        scrollTop,
        onScroll,
      };
    },
  };
</script>

<style lang="less" scoped>
  .main {
    min-height: calc(100vh - 80px);
  }
</style>
