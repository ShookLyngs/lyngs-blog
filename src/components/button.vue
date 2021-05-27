<template>
  <button
    class="button rounded px-5 py-1"
    :class="buttonClass"
    @mousedown="onTapDown"
    @mouseup="onTapUp"
  >
    <slot />
  </button>
</template>

<script>
  import { computed, ref } from 'vue';
  export default {
    name: 'ripple-button',
    props: {
      type: {
        type: String,
        default: 'default',
      },
    },
    setup(props) {
      const ripple = ref(false);
      const rippleTimer = ref();
      async function createRipple() {
        if (rippleTimer.value) clearTimeout(rippleTimer.value);
        ripple.value = true;
        rippleTimer.value = setTimeout(() => {
          ripple.value = false;
          console.log('changed');
        }, 10000);
      }

      const buttonClass = computed(() => {
        const classes = [];
        if (ripple.value) classes.push('is-ripple');
        if (props.type) classes.push(`is-${props.type}`);

        return classes;
      });

      function onTapDown() {
        ripple.value = false;
      }
      function onTapUp() {
        createRipple();
      }

      return {
        ripple,

        buttonClass,

        onTapDown,
        onTapUp,
      };
    },
  };
</script>

<style lang="less">
  .button {
    @apply relative transition-all duration-300;

    &.is-ripple::after {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: .2;
      content: '';
      display: block;
      position: absolute;
      pointer-events: none;
      border-radius: inherit;
      animation:
        shadow-fade 2s cubic-bezier(0.08, 0.82, 0.17, 1) forwards,
        shadow-ripple .4s cubic-bezier(0.08, 0.82, 0.17, 1) forwards;
      box-shadow: 0 0 0 0 theme('colors.theme-500');
    }

    &.is-default {
      @apply border border-solid border-negative-700 hover:border-negative-600 active:border-negative-500;
      @apply bg-negative-900 hover:text-theme-500 active:text-theme-600;
    }
  }

  @keyframes shadow-fade {
    100% {
      opacity: 0;
    }
  }
  @keyframes shadow-ripple {
    100% {
      box-shadow: 0 0 0 6px theme('colors.theme-500');
    }
  }
</style>