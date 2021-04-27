<template>
  <modal-dialog :show="actualShow" v-on="$attrs">
    <div>content</div>
  </modal-dialog>
</template>

<script>
  // Functions
  // import { h } from 'vue';
  import { useModel } from '@/hooks/use-model';
  // Components
  import ModalDialog from '@/components/modal-dialog.vue';

  export default {
    name: 'confirm',
    components: {
      ModalDialog,
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      }
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
    },
    /*render() {
      const slot = this.$slots.default;

      return h(ModalDialog, {
        show: this.actualShow,
        ...this.$attrs,
      }, slot ?? this.);
    },*/
  };
</script>

<style scoped>

</style>