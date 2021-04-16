<template>
  <div ref="element" :style="elementStyle">
    <resize-observer @resize="onResize">
      <keep-alive>
        <slot v-if="show" />
      </keep-alive>
    </resize-observer>
  </div>
</template>

<script>
  // Functions
  import {ref, computed, watch, inject, onBeforeMount} from 'vue';
  import { useScrollbar } from '@/components/scrollbar';
  // Components
  import ResizeObserver from '@/components/resize-observer.vue';

  export default {
    name: 'lazy',
    components: {
      ResizeObserver,
    },
    setup() {
      const element = ref();
      const elementStyle = computed(() => {
        const { width, height } = rect.value;
        return {
          width: `${width}px`,
          height: `${height}px`,
        };
      });

      const { add, remove } = inject('lazyGroup', null);
      onBeforeMount(() => remove(element.value));
      watch(element, () => {
        if (add && remove && element.value) {
          add(element.value, (canShow) => {
            console.log(canShow);
          });
        }
      });


      const show = ref(true);
      function onIntersection({ intersectionRatio }) {
        show.value = intersectionRatio > 0;
      }

      const scrollbar = useScrollbar();
      const observed = ref();
      watch(element, () => {
        if (element.value) {
          scrollbar.observe(element.value, onIntersection);
          observed.value = element.value;
        } else if (!element.value && observed.value) {
          scrollbar.unobserve(observed.value);
          observed.value = null;
        }
      });

      const rect = ref({ x: null, y: null });
      function onResize(sizes) {
        rect.value = sizes;
      }

      return {
        element,
        elementStyle,
        show,
        onResize,
      };
    },
  };
</script>

<style scoped>

</style>