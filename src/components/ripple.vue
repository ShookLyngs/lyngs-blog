<template>
  <component
    class="ripple"
    :class="rippleClass"
    :is="tag"
    @mousedown="stopRipple"
    @mouseup="startRipple"
  >
    <slot />
  </component>
</template>

<script>
  import { computed, ref } from 'vue';

  export default {
    name: 'ripple',
    props: {
      tag: {
        type: String,
        default: 'div',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const ripple = ref(false);
      const rippleTimer = ref();
      function stopRipple() {
        clearTimeout(rippleTimer.value);
        ripple.value = false;
      }
      function startRipple() {
        ripple.value = true;
        rippleTimer.value = setTimeout(() => ripple.value = false, 2000);
      }

      const rippleClass = computed(() => {
        const classes = [];
        if (ripple.value) classes.push('is-rippling');
        if (props.disabled) classes.push('disable-ripple');

        return classes;
      });

      return {
        startRipple,
        stopRipple,

        rippleClass,
      };
    },
  };
</script>

<style lang="less" scoped>
  .ripple {
    @apply relative;

    &:not(.disable-ripple) {
      &.is-rippling::after {
        @apply top-0 bottom-0 left-0 right-0 block absolute;
        opacity: .08;
        content: '';
        pointer-events: none;
        border-radius: inherit;
        box-shadow: 0 0 0 0 theme('colors.positive-800');
        animation:
          ripple-fade-out 2s cubic-bezier(0.08, 0.82, 0.17, 1) forwards,
          shadow-grow .4s cubic-bezier(0.08, 0.82, 0.17, 1) forwards;
      }
    }
  }

  @keyframes ripple-fade-out {
    100% {
      opacity: 0;
    }
  }
  @keyframes shadow-grow {
    100% {
      box-shadow: 0 0 0 6px theme('colors.positive-800');
    }
  }
</style>