<template>
  <router-link :to="to">
    <button
      ref="tab"
      class="tab select-none box-content mr-5 h-9 leading-9 font-medium transition-all hover:bg-text-theme-600"
      :class="isCurrent ? 'text-theme-600' : 'text-positive-800'"
      @click="onClickTab"
    >
      <slot />
    </button>
  </router-link>
</template>

<script>
  import { ref, computed, watchEffect, onBeforeUnmount, onBeforeUpdate } from 'vue';
  import { useListItem } from '@/hooks/use-list';
  import { useResizeObserver } from '@/hooks/use-resize-observer';

  export default {
    name: 'tab',
    props: {
      to: {
        type: [ String, Object ],
        default: '',
      },
      value: {
        type: String,
        default: void 0,
      },
      values: {
        type: Array,
        default: () => [],
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    emits: [ 'click' ],
    setup(props, { emit }) {
      const tab = ref();

      const { list, state, remove } = useListItem({
        key: 'tabs',
        row: tab,
      });
      list.value.push(tab);
      onBeforeUnmount(remove);

      const isCurrent = computed(() => {
        return state.current === props.value || props.values.includes(state.current);
      });

      const { width, height } = useResizeObserver();
      function updateTabRect() {
        if (isCurrent.value && tab.value && width.value && height.value) {
          const rect = tab.value.getBoundingClientRect();
          if (rect) state.tabRect = rect;
        }
      }
      watchEffect(updateTabRect);
      onBeforeUpdate(updateTabRect);

      function onClickTab() {
        if (!props.disabled) {
          state.current = props.value;
          emit('click', props.value);
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
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    outline-width: 0;
  }
</style>
