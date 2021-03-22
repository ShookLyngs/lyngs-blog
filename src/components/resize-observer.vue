<template>
  <slot />
</template>

<script>
  import Observer from 'resize-observer-polyfill';
  import { findDOMNode } from '@/assets/util/dom';

  export default {
    name: "ls-resize-observer",
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      this.observer = null;
      this.currentElement = null;
      return {
        width: 0,
        height: 0,
      };
    },
    emits: [
      'resize',
    ],
    methods: {
      onComponentUpdated () {
        if (this.disabled) {
          this.destroyObserver();
          return;
        }

        const element = findDOMNode(this);

        if (element !== this.currentElement) {
          this.destroyObserver();
          this.currentElement = element;
        }

        if (!this.observer && element) {
          this.observer = new Observer(this.onSlotResize);
          this.observer.observe(element);
          this.onSlotResize([{ target: element }]);
        }
      },
      onSlotResize(entries) {
        const { target } = entries[0];
        const rect = target.getBoundingClientRect();

        const sizes = {
          width: Math.floor(rect.width),
          height: Math.floor(rect.height),
        };

        if (this.width !== sizes.width || this.height !== sizes.height) {
          this.width = sizes.width;
          this.height = sizes.height;
          this.$emit('resize', rect);
        }
      },

      destroyObserver () {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = null;
        }
      }
    },
    mounted() {
      this.onComponentUpdated();
    },
    updated() {
      this.onComponentUpdated();
    },
    beforeUnmount() {
      this.destroyObserver();
    },
  };
</script>