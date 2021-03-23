<template>
  <button class="border-button" :class="classes">
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
  import { computed } from 'vue';

  export default {
    name: 'border-button',
    props: {
      type: {
        type: String,
        default: 'theme',
        validator: value => [ 'theme', 'gray' ].includes(value),
      },
      text: {
        type: [ String, Number ],
        default: '',
      },
    },
    setup(props) {
      const classes = computed(() => {
        const result = [];

        if (props.type) {
          result.push(`border-button--${props.type}`);
        }

        return result;
      });

      return {
        classes
      };
    },
  };
</script>

<style lang="less" scoped>
  .border-button {
    @apply scale-card inline-flex justify-center items-center;
    @apply box-border h-10 text-sm font-semibold text-center;
    @apply border-2 active:shadow-lg;

    & + & {
      @apply ml-2;
    }

    &--gray {
      @apply px-3 rounded-md border-negative-700 bg-negative-900 active:border-theme-500;
      @apply text-positive-700 active:text-theme-600;
    }
    &--theme {
      @apply px-6 rounded-md border-3 border-theme-500;
      @apply text-theme-600 active:bg-theme-500 active:text-negative-900;
      min-width: 110px;
    }
  }
</style>