<template>
  <!-- default slot, preventing lose sight of async-component -->
  <component
    tabindex="0"
    ref="target"
    :is="defaultSlot"
    v-bind="$attrs"
    @click="$emit('click')"
    @focus="conditionAction('focus', true, 'focus')"
    @blur="conditionAction('focus', false, 'blur')"
    @mouseenter="conditionAction('hover', true, 'mouse-enter')"
    @mouseleave="conditionAction('hover', false, 'mouse-leave')"
  />

  <!-- teleport the popper to body -->
  <teleport :disabled="!teleport" :to="teleportTo">
    <div
      class="ls-popper"
      ref="popper"
      role="tooltip"
      :class="{ 'is-show': isShowPopper, 'is-transform': transformTransition }"
    >
      <div class="ls-popper__inner">
        <slot name="content">{{ text }}</slot>
      </div>
      <div class="ls-popper__arrow" data-popper-arrow />
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
      'mouse-enter',
      'mouse-leave',
      'focus',
      'blur',
      'click',
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
          nextTick(updatePopper);
        }
      });

      // Set popper <visibility>, changes will be execute after 300ms.
      // In 300ms, new changes will always cover the older one.
      // And every new change will reset the timer.
      const setPopperVisible = delayThrottle((value) => {
        isShowPopper.value = value;
        updatePopper();
        nextTick(updatePopper);
      });

      // Set popper visibility, and emit event.
      // Used it on @on events.
      const conditionAction  = (trigger, visible, eventType, ...params) => {
        if (props.trigger === trigger) setPopperVisible(visible);
        if (eventType) emit(eventType, ...params);
      };

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
    @apply transition rounded border border-negative-700 bg-negative-900 text-positive-700;
    position: absolute;
    padding: 8px 0;
    font-weight: bold;
    font-size: 13px;
    visibility: hidden;
    opacity: 0;
    z-index: 100;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    transition-property: padding, visibility, opacity, z-index;

    &.is-show {
      visibility: visible;
      opacity: 1;
      z-index: 100;
    }
    &.is-virtual {
      @apply rounded-tl-none rounded-tr rounded-bl rounded-br;
      padding: 0;
    }
    &.is-transform {
      transition-property: padding, visibility, opacity, z-index, transform;
    }

    /*&__wrapper {
      position: relative;
    }
    &__inner {
      position: absolute;
      padding: 4px 8px;
      min-width: 0;
      white-space: nowrap;
    }*/

    &__arrow,
    &__arrow::before {
      position: absolute;
      width: @popper-arrow-size;
      height: @popper-arrow-size;
      background: inherit;
    }
    &__arrow {
      visibility: hidden;

      &::before {
        visibility: visible;
        content: '';
        transform: rotate(45deg);
      }
    }
    &[data-popper-placement^='top'] .ls-popper__arrow {
      bottom: -(@popper-arrow-size * 0.5);
    }
    &[data-popper-placement^='bottom'] .ls-popper__arrow {
      top: -(@popper-arrow-size * 0.5);
    }
    &[data-popper-placement^='left'] .ls-popper__arrow {
      right: -(@popper-arrow-size * 0.5);
    }
    &[data-popper-placement^='right'] .ls-popper__arrow {
      left: -(@popper-arrow-size * 0.5);
    }
  }
</style>