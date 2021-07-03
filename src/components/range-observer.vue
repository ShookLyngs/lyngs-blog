<template>
  <component ref="element" :is="defaultSlot" />
</template>

<script>
  import { ref } from 'vue';
  import { useScrollbar } from '@/components/scrollbar';

  export default {
    name: 'reach-top',
    props: {
      offsetY: {
        type: Number,
        default: 70,
      },
    },
    emits: [ 'enter', 'update', 'leave' ],
    setup(props, { slots, emit }) {
      const [ defaultSlot ] = slots.default();

      const element = ref();
      function getElementRect() {
        const realElement = element.value?.$el ?? element.value;
        const rect = realElement?.getBoundingClientRect?.();
        return rect ?? {};
      }

      const isInRange = ref(false);
      const { onScroll, getWrapSizes } = useScrollbar();
      onScroll(() => {
        if (!element.value) return;

        const rect = getElementRect();
        const { top, bottom } = rect;
        if (top === void 0 || bottom === void 0) {
          return;
        }

        const { bottom: wrapBottom } = getWrapSizes();
        if (top <= wrapBottom && bottom >= props.offsetY) {
          if (!isInRange.value) {
            isInRange.value = true;
            emit('enter', rect);
          } else {
            emit('update', rect);
          }
        } else if (isInRange.value) {
          isInRange.value = false;
          emit('leave');
        }
      });

      return {
        defaultSlot,
        element,
      };
    },
  };
</script>

<style scoped>

</style>