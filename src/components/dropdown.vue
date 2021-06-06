<template>
  <popper
    content-reachable
    :offset="0"
    :trigger="trigger"
    :placement="placement"
  >
    <slot />

    <template #content>
      <slot name="content" />
    </template>
  </popper>
</template>

<script>
  // Components
  import Popper from '@/components/popper';

  export default {
    name: 'dropdown',
    components: {
      Popper,
    },
    props: {
      trigger: {
        type: String,
        default: 'hover',
      },
      placement: {
        type: String,
        default: 'bottom',
      },
    },
  };
</script>

<style scoped>

</style>