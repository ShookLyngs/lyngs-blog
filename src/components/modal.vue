<template>
  <div class="absolute z-auto">
    <transition name="fade-fast">
      <div
        class="fixed left-0 top-0 w-full h-full z-30 bg-mask-800"
        v-if="actualShow"
        @click.prevent.stop="close"
      />
    </transition>
    <transition name="scale-sm">
      <div
        class="fixed left-0 top-0 w-full h-full z-30 flex justify-center items-center"
        v-if="actualShow"
        @click.prevent.stop="close"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
  // Functions
  import { useModel } from '@/hooks/use-model';

  export default {
    name: 'modal',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    emits: [ 'update:show' ],
    setup(props, { emit }) {
      const actualShow = useModel(
        () => props.show,
        (value) => emit('update:show', value)
      );
      function open() {
        actualShow.value = true;
      }
      function close() {
        actualShow.value = false;
      }

      return {
        actualShow,
        open,
        close,
      };
    },
  };
</script>

<style scoped>

</style>