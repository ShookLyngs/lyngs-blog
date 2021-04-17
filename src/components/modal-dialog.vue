<template>
  <modal v-model:show="actualShow" v-on="$attrs">
    <div class="body w-full md:px-0 md:content flex max-h-full">
      <div class="dialog flex-1 flex flex-col rounded-lg border border-negative-600 bg-negative-900" @click.prevent.stop>
        <!-- Header -->
        <div class="dialog__header body flex justify-between items-center">
          <div class="dialog__title text-xl font-semibold">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div>
            <slot name="header-actions">
              <plain-button icon="icon-no" @click="close" />
            </slot>
          </div>
        </div>

        <!-- Content -->
        <scrollbar
          disabled-horizontal
          class="flex-auto flex flex-col"
          wrap-class="flex-auto flex flex-col"
        >
          <slot />
        </scrollbar>
      </div>
    </div>
  </modal>
</template>

<script>
  // Functions
  import { useModel } from '@/hooks/use-model';
  // Components
  import Modal from '@/components/modal.vue';
  import Scrollbar from '@/components/scrollbar';
  import PlainButton from '@/components/plain-button.vue';

  export default {
    name: 'modal-dialog',
    components: {
      Modal,
      Scrollbar,
      PlainButton,
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
    },
    emits: ['update:show'],
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
    }
  };
</script>

<style scoped>

</style>