<template>
  <button
    class="button rounded px-8 py-3"
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
    setup() {
      const ripple = ref(false);
      const rippleTimer = ref();
      async function createRipple() {
        if (rippleTimer.value) clearTimeout(rippleTimer.value);
        ripple.value = true;
        rippleTimer.value = setTimeout(() => ripple.value = false, 4000);
      }

      const buttonClass = computed(() => {
        return ripple.value ? 'is-ripple' : '';
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

<style lang="less" scoped>
  .button {
    @apply relative;

    &.is-ripple::after {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      display: block;
      position: absolute;
      pointer-events: none;
      border-radius: inherit;
      animation-fill-mode: forwards;
      animation:
        shadow-fade 2s cubic-bezier(0.08, 0.82, 0.17, 1),
        shadow-ripple .4s cubic-bezier(0.08, 0.82, 0.17, 1);
      box-shadow: 0 0 0 0 theme('colors.theme-500');
      opacity: .2;
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