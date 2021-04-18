import component from './image-viewer.vue';
import { openImageViewer, closeImageViewer, install } from './api';
import { createInstallableComponent } from '@/assets/util/component';

export {
  openImageViewer,
  closeImageViewer,
};
export default createInstallableComponent(component, (app) => {
  app.use({ install });
});