import component from './markdown-renderer.vue';
import { createInstallableComponent } from '@/assets/util/component';

export default createInstallableComponent(component);
export { markdown, render } from './markdown';