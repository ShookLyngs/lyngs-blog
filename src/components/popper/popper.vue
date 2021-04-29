<template>
  <!-- default slot, preventing lose sight of async-component -->
  <component
    tabindex="0"
    ref="target"
    :is="$slots.default"
    v-bind="$attrs"
    @click="$emit('click')"
    @focus="conditionAction('focus', true, 'focus')"
    @blur="conditionAction('focus', false, 'blur')"
    @mouseenter="conditionAction('hover', true, 'mouse-enter')"
    @mouseleave="conditionAction('hover', false, 'mouse-leave')"
  />

  <!-- teleport the popper to body -->
  <teleport :disabled="!teleport" :to="teleportTo">
    <div class="ls-popper__wrapper">
      <div
        class="ls-popper"
        ref="popper"
        role="tooltip"
        :class="{ 'is-show': isShowPopper, 'is-transform': transformTransition }"
      >
        <div class="ls-popper__inner">
          <div class="ls-popper__arrow" data-popper-arrow />
          <slot name="content">{{ text }}</slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
  // Functions
  import { ref, watch, nextTick } from 'vue';
  import { delayThrottle } from '@/assets/util/event';
  import { usePopper } from './hook';
  // Default values
  const triggerValues = [ 'hover', 'focus', 'manual' ];

  export default {
    name: 'popper',
    props: {
      text: {
        type: String,
        default: void 0,
      },
      placement: {
        type: String,
        default: 'bottom',
      },
      trigger: {
        type: String,
        default: 'hover',
        validator: value => triggerValues.includes(value),
      },
      offset: {
        type: [ Number, Array, Function ],
        default: () => [ 0, 10 ],
        validator: offset => {
          if (offset instanceof Function) {
            return true;
          }
          if (Array.isArray(offset)) {
            return offset.length === 2 && offset.every(item => typeof item === 'number');
          }
          return typeof offset === 'number';
        },
      },
      teleport: {
        type: Boolean,
        default: false,
      },
      teleportTo: {
        type: String,
        default: '#app',
      },
      transformTransition: {
        type: Boolean,
        default: false,
      },
      popperClass: {
        type: [ String, Array, Object ],
        default: void 0,
      },
    },
    emits: [
      'click',
      'focus', 'blur',
      'mouse-enter', 'mouse-leave',
      'open', 'close',
    ],
    setup(props, { slots, emit }) {
      // Default slot, only accept single element.
      // Or won't be able to get ref: <target>.
      const [ defaultSlot ] = slots.default();

      // Binding element refs.
      const target = ref();
      const popper = ref();

      // Using popper hook, To Generate instance of popper.
      const {
        instance,
        rebindPopper,
        updatePopper,
      } = usePopper({ target, popper, props });

      // Visibility of popper
      const isShowPopper = ref(false);

      // If visibility changes, update popper
      watch(() => isShowPopper.value, (value) => {
        if (value && instance) {
          nextTick(() => {
            updatePopper();
            emitVisibility();
          });
        }
      });

      // Set popper <visibility>, changes will be execute after 300ms.
      // In 300ms, new changes will always cover the older one.
      // And every new change will reset the timer.
      const setPopperVisible = delayThrottle((value) => {
        isShowPopper.value = value;
        nextTick(() => {
          updatePopper();
          emitVisibility();
        });
      }, 150);

      // Emit open or close event based on popper visibility
      function emitVisibility() {
        emit(isShowPopper.value ? 'open' : 'close');
      }

      // Set popper visibility, and emit event.
      // Used it on @on events.
      function conditionAction(trigger, visible, eventType, ...params) {
        if (props.trigger === trigger) setPopperVisible(visible);
        if (eventType) emit(eventType, ...params);
      }

      return {
        defaultSlot,
        target,
        popper,

        instance,

        isShowPopper,
        setPopperVisible,

        rebindPopper,
        updatePopper,
        conditionAction,
      };
    },
  }
</script>

<style lang="less">
  @popper-arrow-size: 10px;

  .ls-popper {
    @apply absolute transition duration-300 invisible opacity-0;
    z-index: 100;
    outline-width: 0;
    transition-property: padding, visibility, opacity, z-index;

    &.is-show {
      @apply visible opacity-100;
      z-index: 100;
    }
    &.is-virtual {
      @apply rounded-tl-none rounded-tr rounded-bl rounded-br;
      padding: 0;
    }
    &.is-transform {
      transition-property: padding, visibility, opacity, z-index, transform;
    }

    &__wrapper {
      position: relative;
      padding: 8px;
    }

    &__inner {
      @apply py-2 relative transition rounded-md;
      @apply border border-negative-600 bg-negative-900 text-positive-700 shadow-lg;
    }

    &__arrow,
    &__arrow::before {
      position: absolute;
      width: @popper-arrow-size;
      height: @popper-arrow-size;
      border-radius: 2px;
      background: inherit;
    }
    &__arrow {
      visibility: hidden;

      &::before {
        @apply border border-solid border-negative-600;
        content: '';
        visibility: visible;
        transform: rotate(45deg);
      }
      &::after {
        position: absolute;
        content: '';
        width: @popper-arrow-size + 4;
        height: (@popper-arrow-size * .5) + 2;
        left: -2px;
        visibility: visible;
        background: inherit;
      }
    }

    &[data-popper-placement^='top'],
    &[data-popper-placement^='bottom'] {
      padding: @popper-arrow-size 0;
    }
    &[data-popper-placement^='left'],
    &[data-popper-placement^='right'] {
      padding: 0 @popper-arrow-size;
    }
    &[data-popper-placement^='top'] .ls-popper__arrow {
      bottom: -(@popper-arrow-size * 0.5);
      &::after {
        top: -(@popper-arrow-size * 0.2);
      }
    }
    &[data-popper-placement^='bottom'] .ls-popper__arrow {
      top: -(@popper-arrow-size * 0.5);
      &::after {
        bottom: -(@popper-arrow-size * 0.2);
      }
    }
    &[data-popper-placement^='left'] .ls-popper__arrow {
      right: -(@popper-arrow-size * 0.5);

      &::after {
        height: @popper-arrow-size + 4;
        width: (@popper-arrow-size * .5) + 2;
        bottom: -2px;
        left: -(@popper-arrow-size * 0.2);
      }
    }
    &[data-popper-placement^='right'] .ls-popper__arrow {
      left: -(@popper-arrow-size * 0.5);

      &::after {
        height: @popper-arrow-size + 4;
        width: (@popper-arrow-size * .5) + 2;
        bottom: -2px;
        left: unset;
        right: -(@popper-arrow-size * 0.2);
      }
    }
  }
</style>