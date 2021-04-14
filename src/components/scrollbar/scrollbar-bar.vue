<template>
  <div
    class="ls-scrollbar__bar"
    :class="barClasses"
    @mousedown="onMouseDownBar"
  >
    <div
      ref="thumb"
      class="ls-scrollbar__thumb"
      :style="thumbStyle"
      @mousedown.stop="onMouseDownThumb"
    />
  </div>
</template>

<script>
  import { on, off } from '@/assets/util/dom';
  import { scrollStateKey } from './shared';

  const map = {
    vertical: {
      axis: 'y',
      rectDirection: 'top',
      scrollDirection: 'scrollTop',
      clientAxis: 'clientY',
      offsetSize: 'offsetHeight',
      scrollSize: 'scrollHeight',
    },
    horizontal: {
      axis: 'x',
      rectDirection: 'left',
      scrollDirection: 'scrollLeft',
      clientAxis: 'clientX',
      offsetSize: 'offsetWidth',
      scrollSize: 'scrollWidth',
    },
  };

  export default {
    name: 'scrollbar-bar',
    inject: [scrollStateKey],
    emits: [
      'drag-start',
      'drag-end'
    ],
    props: {
      direction: {
        type: String,
        default: 'vertical',
        validator: (value) => ['vertical', 'horizontal'].includes(value),
      },
      size: {
        type: String,
        default: void 0,
      },
      move: {
        type: Number,
        default: 0,
      },
    },
    data: () => ({
      dragging: false,
      event: {
        mousemove: null,
        mouseup: null,
      },
      store: {},
    }),
    computed: {
      bar() {
        return map[this.direction];
      },
      wrap() {
        return this?.scrollbar ? this.scrollbar.wrap : null;
      },
      barClasses() {
        const classes = [];

        if (this.direction) {
          classes.push(`is-${this.direction}`);
        }
        if (this.dragging) {
          classes.push('is-active');
        }

        return classes;
      },
      thumbStyle() {
        const axis = this.direction,
          direction = { horizontal: 'width', vertical: 'height' }[axis],
          translate = { horizontal: 'translateX', vertical: 'translateY' }[
            axis
          ];

        return {
          [direction]: this.size,
          transform: `${translate}(${this.move}%)`,
        };
      },
    },
    methods: {
      // proactive
      update() {},
      addGlobalListeners() {
        this.event.mousemove = on(
          document,
          'mousemove',
          this.onGlobalMouseMove
        );
        this.event.mouseup = on(document, 'mouseup', this.onGlobalMouseUp);
      },
      removeGlobalListeners() {
        if (this.event.mousemove?.remove) {
          this.event.mousemove.remove();
        } else {
          off(document, 'mousemove', this.onGlobalMouseMove);
        }
        if (this.event.mouseup?.remove) {
          this.event.mouseup.remove();
        } else {
          off(document, 'mouseup', this.onGlobalMouseUp);
        }
      },

      // passive
      onMouseDownBar(event) {
        console.log(event);
      },
      onMouseDownThumb(event) {
        event.stopImmediatePropagation();
        if (event.ctrlKey || event.button === 2) return;

        this.dragging = true;
        this.addGlobalListeners();

        const bar = this.bar,
          store = this.store,
          target = event.currentTarget,
          targetRect = target.getBoundingClientRect();

        store[bar.axis] =
          target[bar.offsetSize] -
          (event[bar.clientAxis] - targetRect[bar.rectDirection]);

        this.$emit('drag-start');
      },
      onGlobalMouseMove(event) {
        if (!this.dragging) return;

        const bar = this.bar,
          store = this.store,
          wrap = this.wrap,
          thumb = this.$refs.thumb,
          rect = this.$el.getBoundingClientRect();

        const last = store[bar.axis];
        if (!last) return;

        const offset = -1 * (rect[bar.rectDirection] - event[bar.clientAxis]),
          clickPosition = thumb[bar.offsetSize] - last,
          positionPercentage =
            ((offset - clickPosition) * 100) / this.$el[bar.scrollSize];

        wrap[bar.scrollDirection] =
          (positionPercentage * wrap[bar.scrollSize]) / 100;
      },
      onGlobalMouseUp() {
        this.dragging = false;
        this.store[this.bar.axis] = 0;
        this.removeGlobalListeners();

        this.$emit('drag-end');
      },
    },
  };
</script>
