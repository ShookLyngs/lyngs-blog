<template>
  <ripple
    tag="button"
    class="button"
    :class="buttonClass"
    :disabled="disabled || loading"
    @click="onClick"
  >
    <slot name="prefix">
      <span :class="$slots.default ? 'mr-1' : ''" v-if="loading || icon">
        <collapse direction="horizontal" show v-if="loading">
          <loading-circle :size="16" />
        </collapse>
        <icon :name="icon" v-else-if="icon" />
      </span>
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
  import Icon from './icon';
  import Ripple from './ripple.vue';
  import Collapse from './collapse';
  import LoadingCircle from './loading/loading-indicator.vue';

  export default {
    name: 'ripple-button',
    components: {
      Icon,
      Ripple,
      Collapse,
      LoadingCircle,
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
      border: {
        type: String,
        default: 'xs',
      },
      icon: {
        type: String,
        default: '',
      },
      loading: {
        type: Boolean,
        default: false,
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
    emits: [ 'click' ],
    setup(props, { emit }) {
      const buttonClass = computed(() => {
        const classes = [];
        if (props.type) classes.push(`is-type-${props.type}`);
        if (props.size) classes.push(`is-size-${props.size}`);
        if (props.rounded) classes.push(`is-rounded-${props.rounded}`);
        if (props.border) classes.push(`is-border-${props.border}`);
        if (props.disabled) classes.push('is-disabled');
        if (props.loading) classes.push('is-loading');
        if (props.gutter) classes.push('is-gutter');
        if (props.block) classes.push('is-block');

        return classes;
      });

      function onClick() {
        if (props.disabled || props.loading) return;
        emit('click');
        console.log('clicked');
      }

      return {
        buttonClass,
        onClick,
      };
    },
  };
</script>

<style lang="less" scoped>
  .button {
    @apply inline-flex justify-center items-center transition-all duration-300;

    // Types
    // Default type
    &.is-type-default {
      @apply border-solid border-negative-700 hover:border-negative-600 active:border-negative-500;
      @apply hover:text-theme-500 active:text-theme-600;
      @apply bg-negative-900 active:bg-negative-800;

      &.is-disabled {
        @apply cursor-default bg-negative-900 text-positive-300 border-negative-700;
      }
    }
    &.is-type-theme {
      @apply border-solid border-theme-500 hover:border-theme-400 active:border-theme-300;
      @apply text-negative-900;
      @apply bg-theme-500 hover:bg-theme-400 active:bg-theme-300;

      &.is-disabled {
        @apply cursor-default border-theme-300 bg-theme-300 text-negative-600;
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

    // Border width
    &.is-border-none {
      @apply border-none;
    }
    &.is-border-xs {
      @apply border;
    }
    &.is-border-sm {
      @apply border-2;
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