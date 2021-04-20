<template>
  <div ref="element" class="relative" v-loading="loading">
    <empty
      class="transition duration-300"
      :class="loading || !end ? 'opacity-0' : ''"
    />
  </div>
</template>

<script>
  // Functions
  import { ref, watch, watchEffect, onBeforeUnmount } from 'vue';
  import { useScrollbar } from '@/components/scrollbar';
  // Components
  import Empty from '@/components/empty.vue';

  export default {
    name: 'reach-bottom',
    components: {
      Empty,
    },
    props: {
      end: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['start'],
    setup(props, { emit }) {
      const element = ref();

      const scrollbar = useScrollbar();
      const { observe, unobserve } = scrollbar;

      const isIntersecting = ref(false);
      watchEffect(() => {
        if (scrollbar?.wrap && element.value && observe) {
          observe(element.value, (entry) => {
            isIntersecting.value = entry.intersectionRatio > 0;
          });
        }
      });
      onBeforeUnmount(() => {
        if (unobserve) unobserve(element.value);
      });

      const loading = ref(false);
      function start() {
        loading.value = true;
        emit('start', finish);
      }
      function finish() {
        loading.value = false;
      }
      watch(isIntersecting, () => {
        if (isIntersecting.value && !loading.value && !props.end) {
          start();
        }
      });

      return {
        element,
        loading,
        start,
        finish,
      };
    },
  };
</script>

<style scoped>

</style>