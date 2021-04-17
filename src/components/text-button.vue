<template>
  <button class="text-button" :class="classes">
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
  import { computed } from 'vue';

  export default {
    name: 'text-button',
    props: {
      type: {
        type: String,
        default: 'theme',
        validator: (value) => ['theme', 'gray'].includes(value),
      },
      padding: {
        type: String,
        default: 'md',
        validator: (value) => ['xs', 'sm', 'md'].includes(value),
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      text: {
        type: [String, Number],
        default: '',
      },
    },
    setup(props) {
      const classes = computed(() => {
        const result = [];

        if (props.type) {
          result.push(`text-button--${props.type}`);
        }
        if (props.padding) {
          result.push(`w-${props.padding}`);
        }
        if (props.disabled) {
          result.push('is-disabled');
        }

        return result;
      });

      return {
        classes,
      };
    },
  };
</script>

<style lang="less" scoped>
  .text-button {
    @apply scale-card inline-flex justify-center items-center;
    @apply rounded-md box-border h-10 text-sm font-semibold text-center;
    outline: none;

    &:active {
      box-shadow: none;
    }

    // padding x
    &.w-xs {
      @apply px-0;
    }
    &.w-sm {
      @apply px-2;
    }
    &.w-md {
      @apply px-6;
    }

    // types
    &--gray {
      @apply md:hover:bg-negative-700 active:bg-negative-500 md:active:bg-negative-500;
      @apply text-positive-700 active:text-theme-600;

      &.is-disabled {
        @apply active:text-positive-700;
        opacity: 0.6;
      }
    }

    // status
    &.is-disabled {
      cursor: default;

      &:active {
        box-shadow: none;
        transform: scale3d(1, 1, 1);
      }
    }
  }
</style>
