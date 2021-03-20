<template>
  <div ref="tabs" class="relative">
    <slot />
    <div
      class="tabs-decorator absolute rounded transition-all bottom-0 bg-theme-500"
      :style="decoratorStyle"
    />
  </div>
</template>

<script>
  import { ref, computed, watch, watchEffect } from 'vue';
  import { useList } from '@/hooks/use-list';
  import { useWindowResize } from '@/hooks/use-resize';

  export default {
    name: 'tabs',
    props: {
      current: {
        type: String,
        default: '',
      },
    },
    emits: [ 'update' ],
    setup(props, { emit }) {
      const { list, state } = useList({
        key: 'tabs',
        state: {
          current: props.current,
          tabsRect: {},
          tabRect: {},
        },
      });

      watch(() => props.current, () => {
        state.current = props.current;
      });
      watch(() => state.current, () => {
        emit('update', state.current);
      });

      const tabs = ref(null);
      const { windowHeight, windowWidth } = useWindowResize();
      watchEffect(() => {
        if (tabs.value && windowWidth.value && windowHeight.value) {
          const rect = tabs.value.getBoundingClientRect();
          if (rect) {
            state.tabsRect = rect;
          }
        }
      });

      const decoratorStyle = computed(() => {
        const {
          width: tabWidth,
          left: tabLeft,
        } = state.tabRect;
        const {
          left: tabsLeft,
        } = state.tabsRect;

        if (!tabWidth || !tabLeft || !tabsLeft) return {};

        const computedLeft = tabLeft - tabsLeft;

        return {
          width: tabWidth ? `${tabWidth}px` : '0',
          left: `${computedLeft}px`,
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
    height: 3px;
  }
</style>