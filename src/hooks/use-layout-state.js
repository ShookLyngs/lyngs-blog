import { provide, inject, reactive } from 'vue';

export const layoutStateKey = 'layoutState';

export function createLayoutState(state, key = layoutStateKey) {
  provide(key, reactive(state));
}

export function useLayoutState(key = layoutStateKey) {
  return inject(key, null);
}
