<template>
  <li class="dropdown-item">
    <div class="dropdown-item__divider" v-if="dividedTop" />
    <div class="dropdown-item__content">
      <slot />
    </div>
    <div class="dropdown-item__divider" v-if="dividedBottom" />
  </li>
</template>

<script>
  // Functions
  import { useDropdownShared } from './util';
  import { computed } from 'vue';

  export default {
    name: 'dropdown-item',
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      divided: {
        type: [ Boolean, String ],
        validator: value => typeof value === 'boolean' || ['top', 'bottom'].includes(value),
        default: false,
      },
      value: {
        type: [ String, Number ],
        default: '',
      },
    },
    setup(props) {
      // Shared DATA
      const shared = useDropdownShared();

      // Disabled
      const disabled = computed(() => props.disabled || (shared.menuProps?.disabled ?? false));

      // Divided
      const divided = computed(() => props.divided === true ? 'top' : props.divided);
      const dividedTop = computed(() => divided.value === 'top');
      const dividedBottom = computed(() => divided.value === 'bottom');

      // Class
      const itemClass = computed(() => {
        const classes = [];

        if (disabled.value) classes.push('is-disabled');
        if (dividedTop.value) classes.push('is-divided--top');
        if (dividedBottom.value) classes.push('is-divided--bottom');
        return classes;
      });

      return {
        dividedTop,
        dividedBottom,
        itemClass,
      };
    },
  };
</script>

<style lang="less" scoped>
  .dropdown-item {
    &__content {
      @apply relative body-x py-1 transition cursor-pointer select-none hover:bg-negative-800 active:bg-negative-700;
    }
    &.is-disabled {
      @apply opacity-70 cursor-not-allowed bg-transparent;
    }

    &__divider {
      @apply h-px my-2 w-full bg-negative-700;
    }
  }
</style>