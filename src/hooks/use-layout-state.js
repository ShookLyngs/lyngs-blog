import { provide, inject } from 'vue';

export const layoutStateKey = 'layoutState';

export function createLayoutState(state) {
  provide(layoutStateKey, state);
}

export function useLayoutState(key = layoutStateKey) {
  return inject(key);
}
