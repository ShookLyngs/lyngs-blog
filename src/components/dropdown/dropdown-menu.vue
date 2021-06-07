<template>
  <ul class="py-2">
    <slot />
  </ul>
</template>

<script>
  // Functions
  import { useDropdownShared } from './util';

  export default {
    name: 'dropdown-menu',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      useDropdownShared({
        menuProps: props,
      });
    },
  };
</script>

<style scoped>

</style>