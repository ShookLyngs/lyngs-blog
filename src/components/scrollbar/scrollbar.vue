<template>
  <div class="ls-scrollbar" ref="outer" :class="outerClass">
    <resize-observer @resize="updateWrapSizes">
      <div
        ref="wrap"
        class="ls-scrollbar__wrap"
        :class="wrapClass"
        :style="mergedWrapStyle"
        @scroll="onWrapScroll"
      >
        <resize-observer @resize="updateViewSizes">
          <div
            ref="view"
            class="ls-scrollbar__view"
            :class="viewClass"
            :style="mergedViewStyle"
          >
            <slot />
          </div>
        </resize-observer>
      </div>
    </resize-observer>

    <scrollbar-bar
      :size="barSizes.height"
      :move="barMove.y"
      v-if="!disabledVertical"
      @drag-start="onDrag(true)"
      @drag-end="onDrag(false)"
    />
    <scrollbar-bar
      direction="horizontal"
      :size="barSizes.width"
      :move="barMove.x"
      v-if="!disabledHorizontal"
      @drag-start="onDrag(true)"
      @drag-end="onDrag(false)"
    />
  </div>
</template>

<script>
  // Functions
  import { ref, reactive, computed, onMounted, onUpdated } from 'vue';
  import { getRectObject, getScrollBarWidth } from '@/assets/util/dom';
  import { mergeStyle } from '@/assets/util/style';
  import { useIntersection } from '@/hooks/use-intersection';
  import { createScrollbar } from './shared';
  import Tween from '@tweenjs/tween.js';
  // Components
  import ResizeObserver from '@/components/resize-observer.vue';
  import ScrollbarBar from './scrollbar-bar.vue';
  import { scrollAnimateTo } from '@/components/scrollbar/animate';

  export default {
    name: 'scrollbar',
    components: {
      ResizeObserver,
      ScrollbarBar,
    },
    props: {
      disabledVertical: {
        type: Boolean,
        default: false,
      },
      disabledHorizontal: {
        type: Boolean,
        default: false,
      },
      wrapClass: {
        type: [Object, Array, String],
        default: '',
      },
      wrapStyle: {
        type: [Object, String],
        default: '',
      },
      viewClass: {
        type: [Object, Array, String],
        default: '',
      },
      viewStyle: {
        type: [Object, String],
        default: '',
      },
      viewMaxHeight: {
        type: [Number, String],
        default: void 0,
      },
      viewMaxWidth: {
        type: [Number, String],
        default: void 0,
      },
    },
    emits: ['scroll'],
    setup(props, { emit }) {
      // Outer layout
      const outer = ref();
      const outerClass = computed(() => {
        const classes = [];
        if (store.dragging) classes.push('is-dragging');
        return classes;
      });

      // List wrapper
      const wrap = ref();
      const mergedWrapStyle = computed(() => {
        if (!gutterWithUnit.value) {
          return mergeStyle(props.wrapStyle);
        }
        const gutterStyle = {
          marginBottom: gutterWithUnit.value,
          marginRight: gutterWithUnit.value,
        };

        return mergeStyle(props.wrapStyle, gutterStyle);
      });
      function getWrapSizes() {
        if (!wrap.value) return null;

        const {
          scrollTop, scrollLeft,
          scrollHeight, scrollWidth,
          clientHeight, clientWidth,
        } = wrap.value;
        const {
          left, right,
          top, bottom,
          height, width,
        } = getRectObject(wrap.value);

        return {
          scrollTop, scrollLeft,
          scrollHeight, scrollWidth,
          clientHeight, clientWidth,
          left, right,
          top, bottom,
          height, width,
        };
      }

      // Scroll to methods
      function scrollTo({ x, y } = {}) {
        if (wrap.value) {
          wrap.value.scrollTo(x, y);
          onWrapScroll();
        }
      }
      async function animateTo({ x, y, duration = 300 } = {}) {
        const { scrollTop, scrollLeft } = getWrapSizes();
        return scrollAnimateTo({
          from: { x: scrollLeft, y: scrollTop },
          to: { x, y },
          duration,
          onUpdate: (state) => scrollTo({
            x: state.x,
            y: state.y,
          }),
        });
      }

      // List wrapper scroll distance and sizes
      const wrapSizes = ref(getWrapSizes());
      function updateWrapSizes() {
        wrapSizes.value = getWrapSizes();
      }

      // Scrollbar barMove percentage,
      // position relative to the list wrapper
      const barMove = reactive({
        x: 0,
        y: 0,
      });
      function onWrapScroll() {
        updateWrapSizes();

        const {
          scrollTop, scrollLeft,
          clientHeight, clientWidth,
        } = wrapSizes.value;

        barMove.x = (scrollLeft * 100) / clientWidth;
        barMove.y = (scrollTop * 100) / clientHeight;

        triggerOnScroll({
          scrollLeft,
          scrollTop,
        });
      }

      // List view layout
      const view = ref();
      const mergedViewStyle = computed(() => {
        const { viewStyle, viewMaxHeight, viewMaxWidth } = props;
        const maxSizes = {
          maxHeight: typeof viewMaxHeight === 'number' ? `${viewMaxHeight}px` : viewMaxHeight,
          maxWidth: typeof viewMaxWidth === 'number' ? `${viewMaxWidth}px` : viewMaxWidth,
        };

        return mergeStyle(maxSizes, viewStyle);
      });

      // Scrollbar state store
      const store = reactive({
        dragging: false,
      });
      function onDrag(value) {
        store.dragging = value;
      }

      // Scrollbar original bar sizes
      const barSizes = reactive({
        width: '',
        height: '',
      });
      function getBarVerticalSize() {
        const { clientHeight, scrollHeight } = getWrapSizes();
        const percentage = (clientHeight * 100) / scrollHeight;
        return percentage < 100 ? `${percentage}%` : '';
      }
      function getBarHorizontalSize() {
        const { clientWidth, scrollWidth } = getWrapSizes();
        const percentage = (clientWidth * 100) / scrollWidth;
        return percentage < 100 ? `${percentage}%` : '';
      }

      const gutterWidth = ref(getScrollBarWidth());
      const gutterWithUnit = computed(() => {
        return gutterWidth.value ? `-${gutterWidth.value}px` : null;
      });
      function updateViewSizes() {
        gutterWidth.value = getScrollBarWidth();
        barSizes.height = getBarVerticalSize();
        barSizes.width = getBarHorizontalSize();
      }
      onMounted(updateViewSizes);
      onUpdated(updateViewSizes);

      // `onScroll` function, for children to call,
      // same as using `@scroll="xxx"` in template
      const scrollListeners = ref([]);
      function onScroll(callback) {
        scrollListeners.value.push(callback);
      }
      function removeOnScroll(callback) {
        const index = scrollListeners.value.findIndex(row => row === callback);
        if (index > -1) {
          scrollListeners.value.splice(index, 1);
        }
      }
      function triggerOnScroll(...args) {
        emit('scroll', ...args);
        scrollListeners.value.forEach(callback => callback(...args));
      }

      const {
        observe,
        unobserve,
        disconnect,
      } = useIntersection(wrap);

      const scrollState = {
        outer,
        outerClass,

        wrap,
        mergedWrapStyle,
        getWrapSizes,
        scrollTo,
        animateTo,

        wrapSizes,
        updateWrapSizes,

        view,
        mergedViewStyle,

        store,
        onDrag,

        gutterWidth,
        gutterWithUnit,

        barMove,
        onWrapScroll,

        barSizes,
        getBarVerticalSize,
        getBarHorizontalSize,

        onScroll,
        removeOnScroll,

        updateViewSizes,

        observe,
        unobserve,
        disconnect,
      };
      createScrollbar(scrollState);
      return scrollState;
    },
  };
</script>

<style lang="less">
  @ls-scrollbar-padding-column: 4px;
  @ls-scrollbar-width: 6px;

  .ls-scrollbar {
    position: relative;
    overflow: hidden;
    scroll-behavior: smooth;

    & &__wrap {
      overflow: scroll;
    }
    & &__thumb {
      @apply relative transition bg-positive-800;
      transition-property: opacity, height;
      border-radius: @ls-scrollbar-width;
      user-select: none;
      cursor: grab;
      z-index: 40;
      opacity: 0;
    }
    & &__bar {
      position: absolute;
      right: @ls-scrollbar-padding-column;
      bottom: @ls-scrollbar-padding-column;
      z-index: 41;
      user-select: none;

      &.is-horizontal {
        height: @ls-scrollbar-width;
        left: @ls-scrollbar-padding-column;

        & > .ls-scrollbar__thumb {
          height: 100%;
        }
      }
      &.is-vertical {
        width: @ls-scrollbar-width;
        top: @ls-scrollbar-padding-column;

        & > .ls-scrollbar__thumb {
          width: 100%;
        }
      }
    }

    &.is-dragging {
      cursor: grabbing;
    }
    &:hover {
      > .ls-scrollbar__bar {
        > .ls-scrollbar__thumb {
          opacity: 0.3;
        }
      }
    }
    > .ls-scrollbar__bar {
      @apply hidden md:block;

      > .ls-scrollbar__thumb {
        &:hover {
          opacity: 0.4;
        }
      }
      &.is-active {
        > .ls-scrollbar__thumb {
          opacity: 0.2;
        }
      }
    }
  }
</style>
