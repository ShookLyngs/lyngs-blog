<template>
  <button class="border-button">
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script>
  export default {
    name: 'border-button',
    props: {
      text: {
        type: [ String, Number ],
        default: '',
      },
    },
  };
</script>

<style lang="less" scoped>
  .border-button {
    @apply scale-card box-border px-6 h-10 text-sm font-semibold text-center;
    @apply rounded-md border-3 border-theme-500;
    @apply text-theme-600 active:shadow-lg active:bg-theme-500 active:text-negative-900;
    min-width: 110px;
  }
</style>