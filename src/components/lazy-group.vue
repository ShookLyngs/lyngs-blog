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
  // import { delayThrottle } from '@/assets/util/event';
  export default {
    name: 'lazy-group',
    setup() {
      const children = ref([]);
      function add(uid, element, callback) {
        if (!has(uid)) {
          children.value.push({
            uid,
            element,
            callback,
            show: true,
            // rect: element.getBoundingClientRect(),
          });
        } else {
          const index = getIndex(uid);
          children.value[index].element = element;
          children.value[index].callback = callback;
        }
      }
      function remove(uid) {
        const index = getIndex(uid);
        if (index > -1) {
          children.value.splice(index, 1);
        }
      }
      function getIndex(uid) {
        return children.value.findIndex((row) => row.uid === uid);
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
        console.log('start calculating', children.value);

        frontSizes.value = { width: 0, height: 0 };
        backSizes.value = { width: 0, height: 0 };

        children.value.forEach((child, childIndex) => {
          const rect = child.element.getBoundingClientRect();
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
          child.show = !minus && !plus;
          child.callback(child.show);

          console.log(childIndex, rect.bottom, rect.top, child.show);
        });

        console.log('end calculating');
      }

      const { onScroll, wrapSizes } = useScrollbar();
      const lastScroll = ref({ scrollTop: 0, scrollLeft: 0 });
      onScroll(/*delayThrottle(*/({ scrollTop, scrollLeft }) => {
        if (lastScroll.value.scrollTop !== scrollTop || lastScroll.value.scrollLeft === scrollLeft) {
          calculate();
        }
        lastScroll.value = {
          scrollTop,
          scrollLeft,
        };
      }/*, 50)*/);

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