<template>
  <div class="ls-scrollbar" ref="scrollbar" :class="scrollbarClass">
    <resize-observer @resize="updateWrapSize">
      <div
        ref="wrap"
        class="ls-scrollbar__wrap"
        :class="wrapClass"
        :style="mergedWrapStyle"
        @scroll="onWrapScroll"
      >
        <resize-observer @resize="update">
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
      :size="size.height"
      :move="move.y"
      v-if="!disabledVertical"
      @drag-start="onDragStart"
      @drag-end="onDragEnd"
    />
    <scrollbar-bar
      direction="horizontal"
      :size="size.width"
      :move="move.x"
      v-if="!disabledHorizontal"
      @drag-start="onDragStart"
      @drag-end="onDragEnd"
    />
  </div>
</template>

<script>
  // Functions
  import { ref, reactive, computed, onMounted, onUpdated } from 'vue';
  import { getScrollBarWidth } from '@/assets/util/dom';
  import { mergeStyle } from '@/assets/util/style';
  import { useIntersection } from '@/hooks/use-intersection';
  import { createScrollbar } from './shared';
  // Components
  import ResizeObserver from '@/components/resize-observer.vue';
  import ScrollbarBar from './scrollbar-bar.vue';

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
      const scrollbar = ref();
      const scrollbarClass = computed(() => {
        const classes = [];
        if (store.dragging) classes.push('is-dragging');
        return classes;
      });

      const wrap = ref();
      const mergedWrapStyle = computed(() => {
        if (!gutterWithUnit.value) return props.wrapStyle;
        const gutterStyle = {
          marginBottom: gutterWithUnit.value,
          marginRight: gutterWithUnit.value,
        };

        return mergeStyle(props.wrapStyle, gutterStyle);
      });
      function getWrapSizes() {
        if (!wrap.value) return null;

        const {
          scrollTop,
          scrollHeight,
          clientHeight,
          scrollLeft,
          scrollWidth,
          clientWidth,
        } = wrap.value;

        return {
          scrollTop,
          scrollHeight,
          clientHeight,
          scrollLeft,
          scrollWidth,
          clientWidth,
        };
      }
      function scrollTo(x, y) {
        if (wrap.value) {
          wrap.value.scrollTo(x, y);
        }
      }

      const wrapSizes = ref({
        scrollTop: null,
        scrollHeight: null,
        clientHeight: null,
        scrollLeft: null,
        scrollWidth: null,
        clientWidth: null,
      });
      function updateWrapSize() {
        wrapSizes.value = getWrapSizes();
      }

      const view = ref();
      const mergedViewStyle = computed(() => {
        const viewStyle     = props.viewStyle;
        const viewMaxHeight = props.viewMaxHeight;
        const viewMaxWidth  = props.viewMaxWidth;

        const maxSizes = {
          maxHeight: typeof viewMaxHeight === 'number' ? `${viewMaxHeight}px` : viewMaxHeight,
          maxWidth: typeof viewMaxWidth === 'number' ? `${viewMaxWidth}px` : viewMaxWidth,
        };

        return mergeStyle(maxSizes, viewStyle);
      });

      const {
        observe,
        unobserve,
        disconnect,
      } = useIntersection(wrap);

      const store = reactive({
        dragging: false,
        gutter: null,
        wrapSize: {},
        wrapStyle: {},
      });
      const gutterWithUnit = computed(() => {
        return store.gutter ? `-${store.gutter}px` : null;
      });
      function onDragStart() {
        store.dragging = true;
      }
      function onDragEnd() {
        store.dragging = false;
      }

      const size = reactive({
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

      const move = reactive({
        x: 0,
        y: 0,
      });

      const scroll = reactive({
        scrollTop: 0,
        scrollLeft: 0,
      });
      function onWrapScroll() {
        const {
          scrollTop, scrollLeft,
          clientHeight, clientWidth,
        } = getWrapSizes();

        move.x = (scrollLeft * 100) / clientWidth;
        move.y = (scrollTop * 100) / clientHeight;
        scroll.scrollTop = scrollTop;
        scroll.scrollLeft = scrollLeft;

        triggerOnScroll({
          scrollLeft,
          scrollTop,
        });
        emit('scroll', {
          scrollLeft,
          scrollTop,
        });
      }

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
        scrollListeners.value.forEach(callback => callback(...args));
      }

      function update() {
        store.gutter = getScrollBarWidth();
        size.height = getBarVerticalSize();
        size.width = getBarHorizontalSize();
      }
      onMounted(update);
      onUpdated(update);

      const scrollState = {
        scrollbar,
        scrollbarClass,

        wrap,
        mergedWrapStyle,
        getWrapSizes,
        scrollTo,

        wrapSizes,
        updateWrapSize,

        observe,
        unobserve,
        disconnect,

        view,
        mergedViewStyle,

        store,
        gutterWithUnit,
        onDragStart,
        onDragEnd,

        size,
        getBarVerticalSize,
        getBarHorizontalSize,

        move,
        scroll,
        onWrapScroll,
        onScroll,
        removeOnScroll,

        update,
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
