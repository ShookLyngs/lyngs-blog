<template>
  <ripple
    tag="button"
    class="button"
    :class="buttonClass"
    :disabled="disabled"
  >
    <slot name="prefix">
      <icon
        :name="icon"
        :class="$slots.default ? 'mr-1' : ''"
        v-if="icon"
      />
    </slot>

    <slot name="text">
      <span>
        <slot />
      </span>
    </slot>

    <slot name="suffix" />
  </ripple>
</template>

<script>
  // Functions
  import { computed } from 'vue';
  // Components
  import Ripple from './ripple.vue';
  import Icon from './icon';

  export default {
    name: 'ripple-button',
    components: {
      Ripple,
      Icon,
    },
    props: {
      type: {
        type: String,
        default: 'default',
      },
      size: {
        type: String,
        default: 'md',
      },
      rounded: {
        type: String,
        default: 'default',
      },
      icon: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      block: {
        type: Boolean,
        default: false,
      },
      gutter: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const buttonClass = computed(() => {
        const classes = [];
        if (props.type) classes.push(`is-type-${props.type}`);
        if (props.size) classes.push(`is-size-${props.size}`);
        if (props.rounded) classes.push(`is-rounded-${props.rounded}`);
        if (props.disabled) classes.push('is-disabled');
        if (props.gutter) classes.push('is-gutter');
        if (props.block) classes.push('is-block');

        return classes;
      });

      return {
        buttonClass,
      };
    },
  };
</script>

<style lang="less" scoped>
  .button {
    @apply inline-flex justify-center items-center transition-all duration-300;

    // Types
    &.is-type-default {
      @apply border border-solid border-negative-700 hover:border-negative-600 active:border-negative-500;
      @apply bg-negative-900 hover:text-theme-500 active:text-theme-600;

      &.is-disabled {
        @apply cursor-default bg-negative-900 text-positive-300 border-negative-700;
      }
    }

    // Sizes
    &.is-size-xs {
      @apply px-3 h-7 text-xs;
    }
    &.is-size-sm {
      @apply px-4 h-8 text-sm;
    }
    &.is-size-md {
      @apply px-5 h-9 text-base;
    }
    &.is-size-lg {
      @apply px-6 h-11 text-lg;
    }

    // Rounded
    &.is-rounded-none {
      @apply rounded-none;
    }
    &.is-rounded-sm {
      @apply rounded-sm;
    }
    &.is-rounded-default {
      @apply rounded;
    }
    &.is-rounded-md {
      @apply rounded-md;
    }
    &.is-rounded-lg {
      @apply rounded-lg;
    }
    &.is-rounded-xl {
      @apply rounded-xl;
    }
    &.is-rounded-2xl {
      @apply rounded-2xl;
    }
    &.is-rounded-3xl {
      @apply rounded-3xl;
    }
    &.is-rounded-full {
      @apply rounded-full;
    }

    // Gutter
    &:not(:first-child) {
      &.is-gutter {
        @apply ml-2;
      }
    }

    // Block
    &.is-block {
      @apply w-full;
    }
  }
</style>