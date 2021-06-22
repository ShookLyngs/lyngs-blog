<template>
  <div ref="detector" :id="id">
    <slot />
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { useMutationObserver } from '@/hooks/use-mutation-observer';

  export default {
    name: 'teleport-detector',
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    emits: [ 'update' ],
    setup(props, { emit }) {
      const detector = ref();
      useMutationObserver({
        target: detector,
        onChange({ types }) {
          if (types.includes('childList')) {
            onChildrenChange();
          }
        },
      });

      function onChildrenChange() {
        const children = [...detector.value?.children] ?? [];
        emit('update', children);
      }

      return {
        detector,
      };
    },
  };
</script>

<style scoped>

</style>