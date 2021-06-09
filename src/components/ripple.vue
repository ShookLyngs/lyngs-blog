<template>
  <component
    class="ripple"
    :is="tag"
    :class="rippleClass"
    @mousedown="stopRipple"
    @mouseup="startRipple"
  >
    <slot />
  </component>
</template>

<script>
  import { computed, ref, watchEffect } from 'vue';

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
      type: {
        type: String,
        validator: value => [ 'click', 'interval' ].includes(value),
        default: 'click',
      },
      interval: {
        type: Number,
        default: 0,
      },
    },
    setup(props) {
      // Ripple and It's effect trigger functions
      const ripple = ref(false);
      const rippleTimer = ref();
      function stopRipple() {
        clearTimeout(rippleTimer.value);
        ripple.value = false;
      }
      function startRipple() {
        return new Promise((resolve) => {
          clearTimeout(rippleTimer.value);
          ripple.value = true;
          console.log('start', ripple.value);
          rippleTimer.value = setTimeout(() => {
            ripple.value = false;
            resolve();
          }, 2000);
        });
      }

      // Interval ripple effect,
      // and watcher to observe changes of prop `type`
      const intervalTimer = ref();
      async function startInterval() {
        if (props.type === 'interval') {
          await startRipple();
          console.log('end', ripple.value);
          intervalTimer.value = setTimeout(startInterval, props.interval);
        }
      }
      watchEffect(() => {
        if (props.type === 'interval') {
          startInterval();
        } else {
          clearTimeout(intervalTimer.value);
        }
      });

      // Ripple classes
      const rippleClass = computed(() => {
        const classes = [];
        if (ripple.value) classes.push('is-rippling');
        if (props.disabled) classes.push('disable-ripple');

        return classes;
      });

      // Ripple trigger events
      function onClickDown() {
        if (props.type === 'click') stopRipple();
      }
      function onClickUp() {
        if (props.type === 'click') startRipple();
      }

      return {
        startRipple,
        stopRipple,

        rippleClass,

        onClickDown,
        onClickUp,
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