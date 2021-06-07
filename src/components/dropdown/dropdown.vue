<template>
  <popper
    teleport
    content-reachable
    :offset="0"
  >
    <template #default>
      <component :is="defaultSlot" />
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
    setup(props, { slots }) {
      // Shared dropdown props
      createDropdownShared(props);

      // Use only the first element in the default slot
      const [ defaultSlot ] = slots.default();

      return {
        defaultSlot,
      };
    },
  };
</script>

<style scoped>

</style>