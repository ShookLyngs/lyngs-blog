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
  import { ref, /*watchEffect*/ } from 'vue';
  import { useRoute } from 'vue-router';
  import { createResizeObserver } from '@/hooks/use-resize-observer';
  // Components
  import LayoutHeader from './header.vue';
  import LayoutFooter from './footer.vue';
  import Scrollbar from '@/components/scrollbar';

  export default {
    name: 'layout',
    components: {
      LayoutHeader,
      LayoutFooter,
      Scrollbar,
    },
    setup() {
      // Create ResizeObserver on content scroller
      const content = ref(null);
      createResizeObserver(content);

      const scrollbar = ref(null);
      const route = useRoute();
      console.log(route);
      //const lastPath = ref(route.path);
      /*watchEffect(() => {
        console.log(route);
        if (route.path !== lastPath.value && scrollbar.value) {
          console.log(scrollbar.value);
          //scrollbar.value.scrollTo(0, 0);
        }

        lastPath.value = route.path;
      });*/

      return {
        content,
        scrollbar,
      };
    },
  };
</script>

<style scoped>

</style>