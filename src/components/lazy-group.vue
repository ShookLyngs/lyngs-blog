<template>
  <div class="lazy-placeholder__front" :style="frontStyle" />
  <!-- lazy-group-content--start -->
  <slot />
  <!-- lazy-group-content--end -->
  <div class="lazy-placeholder__back" :style="backStyle" />
</template>

<script>
  import { computed, provide, ref } from 'vue';
  import { useScrollbar } from '@/components/scrollbar';
  export default {
    name: 'lazy-group',
    setup() {
      const children = [];
      function add(uid, element, callback) {
        const rect = element.getBoundingClientRect();
        const recordScroll = {
          scrollLeft: scroll.scrollLeft,
          scrollTop: scroll.scrollTop,
        };

        if (!has(uid)) {
          children.push({
            uid,
            element,
            callback,
            rect,
            show: true,
            scroll: recordScroll,
          });
        } else {
          const index = getIndex(uid);
          children[index] = {
            ...children[index],
            element,
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
      const frontStyle = computed(() => ({
        width: '100%',
        height: `${frontSizes.value.height}px`,
      }));
      const backStyle = computed(() => ({
        width: '100%',
        height: `${backSizes.value.height}px`,
      }));

      function calculate() {
        const { clientWidth, clientHeight } = wrapSizes;
        frontSizes.value = { width: 0, height: 0 };
        backSizes.value = { width: 0, height: 0 };

        children.forEach((child) => {
          const rect = fixedRectScroll(child.rect, child.scroll, scroll);
          const minus = rect.bottom < 0 || rect.right < 0;
          const plus = rect.top > clientHeight || rect.left > clientWidth;

          if (rect.bottom < 0) {
            frontSizes.value.height += rect.height;
          }
          if (rect.right < 0) {
            frontSizes.value.width += rect.width;
          }

          if (rect.top > clientHeight) {
            backSizes.value.height += rect.height;
          }
          if (rect.left > clientWidth) {
            backSizes.value.width += rect.width;
          }

          child.rect = rect;
          child.scroll = { ...scroll };
          child.show = !minus && !plus;
          child.callback(child.show);
        });
      }

      const { scroll, onScroll, wrapSizes } = useScrollbar();
      const lastScroll = ref({ scrollTop: 0, scrollLeft: 0 });
      onScroll(({ scrollTop, scrollLeft }) => {
        if (lastScroll.value.scrollTop !== scrollTop || lastScroll.value.scrollLeft === scrollLeft) {
          calculate({ scrollTop, scrollLeft });
        }
        lastScroll.value = {
          scrollTop,
          scrollLeft,
        };
      });
      function fixedRectScroll(rect, oldScroll, newScroll) {
        const relativeScroll = {
          scrollLeft: oldScroll.scrollLeft - newScroll.scrollLeft,
          scrollTop: oldScroll.scrollTop - newScroll.scrollTop,
        };

        return {
          ...rect,
          height: rect.height,
          width: rect.width,
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