<template>
  <popper
    teleport
    content-reachable
    ref="dropdown"
    :offset="0"
  >
    <template #default>
      <component class="cursor-pointer" :is="defaultSlot" />
    </template>

    <template #content>
      <slot name="dropdown" />
    </template>
  </popper>
</template>

<script>
  // Functions
  import { createDropdownShared } from './util';
  // Components
  import Popper from '@/components/popper';

  export default {
    name: 'dropdown',
    components: {
      Popper,
    },
    props: {
      closeOnClick: {
        type: Boolean,
        default: false,
      },
    },
    emits: [ 'command' ],
    setup(props, { emit, slots }) {
      // Shared dropdown props
      const { dropdown } = createDropdownShared({
        props,
        onClickItem: value => {
          emit('command', value, close);
          if (props.closeOnClick) close();
        },
      });

      // Use only the first element in the default slot
      const [ defaultSlot ] = slots.default();

      // Try to close the popper
      function close() {
        dropdown.value?.setPopperVisibility?.(false);
      }

      return {
        dropdown,
        defaultSlot,
        close,
      };
    },
  };
</script>

<style scoped>

</style>