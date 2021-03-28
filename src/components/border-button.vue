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
      padding: {
        type: String,
        default: 'md',
        validator: value => [ 'sm', 'md' ].includes(value),
      },
      height: {
        type: String,
        default: 'md',
        validator: value => [ 'sm', 'md' ].includes(value),
      },
      borderWidth: {
        type: String,
        default: 'sm',
        validator: value => [ 'sm', 'md' ].includes(value),
      },
      disabled: {
        type: Boolean,
        default: false,
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
        if (props.padding) {
          result.push(`w-${props.padding}`);
        }
        if (props.height) {
          result.push(`h-${props.padding}`);
        }
        if (props.borderWidth) {
          result.push(`border-${props.borderWidth}`);
        }
        if (props.disabled) {
          result.push('is-disabled');
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
    @apply rounded-md box-border text-sm font-semibold text-center;
    @apply active:shadow-lg;

    & + & {
      @apply ml-2;
    }

    // padding x
    &.w-sm {
      @apply px-3;
    }
    &.w-md {
      @apply px-6;
    }

    // height x
    &.h-sm {
      @apply h-8;
    }
    &.h-md {
      @apply h-10;
    }

    // border-width
    &.border-sm {
      border-width: 2px;
    }
    &.border-md {
      border-width: 3px;
    }

    // types
    &--gray {
      @apply border-negative-700 bg-negative-900 active:border-theme-500;
      @apply text-positive-700 active:text-theme-600;

      &.is-disabled {
        @apply active:border-negative-700 active:text-positive-700;
        opacity: .6;
      }
    }
    &--theme {
      @apply border-theme-500;
      @apply text-theme-600 active:bg-theme-500 active:text-negative-900;

      &.is-disabled {
        @apply active:bg-transparent active:text-theme-600;
        opacity: .6;
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