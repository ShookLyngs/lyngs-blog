<template>
  <div class="absolute z-auto">
    <transition name="fade-fast">
      <div
        class="fixed left-0 top-0 w-full h-full z-50 bg-modal-800"
        v-if="actualShow"
        @click.stop.prevent
      />
    </transition>
    <transition :name="transitionName">
      <div
        class="fixed left-0 top-0 w-full h-full z-50 flex justify-center"
        v-if="actualShow"
        @click.stop.prevent="onClickModal"
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
      closeOnClickModal: {
        type: Boolean,
        default: false,
      },
      transitionName: {
        type: String,
        default: 'scale-sm',
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
      function onClickModal() {
        if (props.closeOnClickModal) {
          close();
        }
      }

      return {
        actualShow,
        open,
        close,
        onClickModal,
      };
    },
  };
</script>

<style scoped>

</style>