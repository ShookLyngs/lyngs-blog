<template>
  <div ref="element" class="relative" v-loading="loading">
    <empty
      class="transition duration-300"
      :class="loading ? 'opacity-0' : ''"
    />
  </div>
</template>

<script>
  // Functions
  import { ref, watch, watchEffect } from 'vue';
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
      const isIntersecting = ref(false);
      function onIntersection(entry) {
        isIntersecting.value = entry.intersectionRatio > 0;
      }
      watchEffect(() => {
        if (scrollbar?.wrap && element.value) {
          scrollbar.observe(element.value, onIntersection);
        }
      });

      const loading = ref(false);
      function start() {
        loading.value = true;
        emit('start', finish);
      }
      function finish() {
        console.log('end');
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
      };
    },
  };
</script>

<style scoped>

</style>