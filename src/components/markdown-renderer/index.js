import component from './markdown-renderer.js';
import { createInstallableComponent } from '@/assets/util/component';

export default createInstallableComponent(component);
export { markdown, render } from './markdown';