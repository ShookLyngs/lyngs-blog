<template>
  <button
    ref="tab"
    class="tab select-none box-content mx-2 h-9 leading-9 font-medium transition-all"
    :class="isCurrent ? 'text-theme-600' : 'text-positive-800'"
    @click="onClickTab"
  >
    <slot />
  </button>
</template>

<script>
  import { ref, computed, watchEffect, onBeforeUnmount } from 'vue';
  import { useListItem } from '@/hooks/use-list';
  import { useWindowResize } from '@/hooks/use-resize';

  export default {
    name: 'tab',
    props: {
      value: {
        type: String,
        default: void 0,
      },
      values: {
        type: Array,
        default: () => ([]),
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const tab = ref(null);

      const { list, state, remove } = useListItem({
        key: 'tabs',
        row: tab,
      });

      list.value.push(tab);
      onBeforeUnmount(remove);

      const isCurrent = computed(() => {
        return state.current === props.value || props.values.includes(state.current);
      });

      const { windowHeight, windowWidth } = useWindowResize();
      watchEffect(() => {
        if (isCurrent.value && tab.value && windowWidth.value && windowHeight.value) {
          const rect = tab.value.getBoundingClientRect();
          if (rect) {
            state.tabRect = rect;
          }
        }
      });

      function onClickTab() {
        if (!props.disabled) {
          state.current = props.value;
        }
      }

      return {
        tab,
        isCurrent,
        onClickTab,
      };
    },
  };
</script>

<style scoped>
  .tab {
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    outline: none;
  }
</style>