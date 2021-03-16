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
    @apply box-border px-6 h-10 text-sm font-semibold text-center transition duration-300 select-none;
    @apply rounded-md border-3 border-theme-500;
    @apply text-theme-600 hover:shadow-lg active:bg-theme-500 active:text-negative-900;
    min-width: 110px;
    transform: scale3d(1, 1, 1);

    &:active {
      transform: scale3d(.96, .96, 1);
    }
    &:focus {
      &:not(:focus-visible) {
        outline: none;
      }
    }
  }
</style>