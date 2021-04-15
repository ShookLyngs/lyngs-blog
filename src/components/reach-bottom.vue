<template>
  <div ref="element" class="relative" v-loading="true">
    <empty />
  </div>
</template>

<script>
  // Functions
  import { ref, watchEffect } from 'vue';
  import { useScrollbar } from '@/components/scrollbar';
  // Components
  import Empty from '@/components/empty.vue';
  import {useModel} from '@/hooks/use-model';

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
        emit('start', setResult);
      }
      function setResult() {
        
      }
      watchEffect(() => {
        if (isIntersecting.value && !props.end) {
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