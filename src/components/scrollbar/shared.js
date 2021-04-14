import { provide, inject, reactive } from 'vue';

export const scrollStateKey = 'scrollbar';

export function createScrollbar(state, key = scrollStateKey) {
  provide(key, reactive(state));
}

export function useScrollbar(key = scrollStateKey) {
  return inject(key, null);
}