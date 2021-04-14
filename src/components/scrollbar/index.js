import component from './scrollbar.vue';
import { scrollStateKey, createScrollbar, useScrollbar } from './shared';
import { createInstallableComponent } from '@/assets/util/component';

export default createInstallableComponent(component);
export {
  component,
  scrollStateKey,
  createScrollbar,
  useScrollbar,
};
