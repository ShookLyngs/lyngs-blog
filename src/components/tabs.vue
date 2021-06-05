<template>
  <div ref="tabs" class="relative inline-flex items-center">
    <slot />
    <div
      class="tabs-decorator absolute transition-all bottom-0 bg-theme-500"
      :style="decoratorStyle"
    />
  </div>
</template>

<script>
  import { ref, computed, watch, watchEffect, onBeforeUpdate } from 'vue';
  import { useList } from '@/hooks/use-list';
  import { useResizeObserver } from '@/hooks/use-resize-observer';

  export default {
    name: 'tabs',
    props: {
      current: {
        type: String,
        default: '',
      },
    },
    emits: ['update'],
    setup(props, { emit }) {
      const { list, state } = useList({
        key: 'tabs',
        state: {
          current: props.current,
          tabsRect: {},
          tabRect: {},
        },
      });

      watch(
        () => props.current,
        () => (state.current = props.current)
      );
      watch(
        () => state.current,
        () => emit('update', state.current)
      );

      const tabs = ref(null);
      const { width, height } = useResizeObserver();
      function updateTabsRect() {
        if (tabs.value && width.value && height.value) {
          const rect = tabs.value.getBoundingClientRect();
          if (rect) {
            state.tabsRect = rect;
          }
        }
      }
      watchEffect(updateTabsRect);
      onBeforeUpdate(updateTabsRect);

      const decoratorStyle = computed(() => {
        const { width: tabWidth, left: tabLeft } = state.tabRect;
        const { left: tabsLeft } = state.tabsRect;

        if (!tabWidth || !tabLeft || !tabsLeft)
          return {
            opacity: '0',
          };

        return {
          width: tabWidth ? `${tabWidth}px` : '0',
          left: `${tabLeft - tabsLeft}px`,
          opacity: '1',
        };
      });

      return {
        tabs,
        list,
        state,
        decoratorStyle,
      };
    },
  };
</script>

<style scoped>
  .tabs-decorator {
    height: 4px;
  }
</style>
