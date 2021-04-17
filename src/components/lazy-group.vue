<template>
  <div class="lazy-placeholder__front" :style="frontStyle" />
  <!-- lazy-group-content--start -->
  <slot />
  <!-- lazy-group-content--end -->
  <div class="lazy-placeholder__back" :style="backStyle" />
</template>

<script>
  import { computed, provide, ref, onBeforeUnmount } from 'vue';
  import { getRectObject } from '@/assets/util/dom';
  import { useScrollbar } from '@/components/scrollbar';

  export default {
    name: 'lazy-group',
    props: {
      range: {
        type: Number,
        default: 4,
      },
    },
    setup(props) {
      const children = [];
      function add(uid, element, callback) {
        const rect = getRectObject(element);
        const { scrollLeft, scrollTop } = scrollbar.wrapSizes;
        const recordScroll = { scrollLeft, scrollTop };

        if (!has(uid)) {
          children.push({
            uid,
            callback,
            rect,
            show: true,
            scroll: recordScroll,
          });
        } else {
          const index = getIndex(uid);
          children[index] = {
            ...children[index],
            callback,
            rect,
            show: true,
            scroll: recordScroll,
          };
        }
      }
      function remove(uid) {
        const index = getIndex(uid);
        if (index > -1) {
          children.splice(index, 1);
        }
      }
      function getIndex(uid) {
        return children.findIndex((row) => row.uid === uid);
      }
      function has(target) {
        return getIndex(target) > -1;
      }

      const frontSizes = ref({ width: 0, height: 0 });
      const backSizes = ref({ width: 0, height: 0 });
      const frontStyle = computed(() => {
        const { width, height } = frontSizes.value;
        return {
          width: width ? `${width}px` : 'auto',
          height: height ? `${height}px` : 'auto',
        };
      });
      const backStyle = computed(() => {
        const { width, height } = backSizes.value;
        return {
          width: width ? `${width}px` : 'auto',
          height: height ? `${height}px` : 'auto',
        };
      });

      const wrapRanges = computed(() => {
        const { top, bottom, left, right, clientHeight, clientWidth } = scrollbar.wrapSizes;
        const rangedHeight = clientHeight * props.range;
        const rangedWidth = clientWidth * props.range;
        const mergedHeight = (rangedHeight - clientHeight) / 2;
        const mergedWidth = (rangedWidth - clientWidth) / 2;

        return {
          top: top - mergedHeight,
          bottom: bottom + mergedHeight,
          left: left - mergedWidth,
          right: right + mergedWidth,
          height: rangedHeight,
          width: rangedWidth,
        };
      });

      function calculate() {
        const { scrollLeft, scrollTop } = scrollbar.wrapSizes;
        const { top, bottom, left, right, width, height } = wrapRanges.value;
        const newScroll = { scrollLeft, scrollTop };
        frontSizes.value = { width: 0, height: 0 };
        backSizes.value = { width: 0, height: 0 };

        children.forEach((child) => {
          const rect = fixedRectScroll(child.rect, child.scroll, newScroll);
          const widthOverflow = rect.width >= width;
          const heightOverflow = rect.height >= height;
          const xOverflow = rect.bottom < top || rect.right < left;
          const yOverflow = rect.top > bottom || rect.left > right;

          if (!widthOverflow) {
            if (rect.right < left) {
              frontSizes.value.width += rect.width;
            }
            if (rect.left > right) {
              backSizes.value.width += rect.width;
            }
          }
          if (!heightOverflow) {
            if (rect.bottom < top) {
              frontSizes.value.height += rect.height;
            }
            if (rect.top > bottom) {
              backSizes.value.height += rect.height;
            }
          }

          child.rect = rect;
          child.show = (widthOverflow || !xOverflow) && (heightOverflow || !yOverflow);
          child.scroll = newScroll;
          child.callback(child.show);
        });
      }

      const scrollbar = useScrollbar();
      const lastScroll = ref({ scrollTop: 0, scrollLeft: 0 });

      scrollbar.onScroll(onScroll);
      onBeforeUnmount(() => scrollbar.removeOnScroll(onScroll));

      function onScroll(newScroll) {
        if (!isScrollRepeated(newScroll)) calculate(newScroll);
        lastScroll.value = newScroll;
      }
      function isScrollRepeated({ scrollTop, scrollLeft }) {
        const {
          scrollLeft: lastScrollLeft,
          scrollTop: lastScrollTop,
        } = lastScroll.value;

        return lastScrollLeft === scrollLeft && lastScrollTop === scrollTop;
      }
      function fixedRectScroll(rect, oldScroll, newScroll) {
        const relativeScroll = {
          scrollLeft: oldScroll.scrollLeft - newScroll.scrollLeft,
          scrollTop: oldScroll.scrollTop - newScroll.scrollTop,
        };

        return {
          ...rect,
          left: rect.left + relativeScroll.scrollLeft,
          right: rect.right + relativeScroll.scrollLeft,
          top: rect.top + relativeScroll.scrollTop,
          bottom: rect.bottom + relativeScroll.scrollTop,
        };
      }

      provide('lazyGroup', {
        add,
        remove,
        getIndex,
        has,
      });

      return {
        children,
        add,
        remove,
        calculate,

        frontSizes,
        backSizes,
        frontStyle,
        backStyle,
      };
    },
  };
</script>

<style scoped>

</style>