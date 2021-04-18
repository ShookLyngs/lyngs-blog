import { createApp } from 'vue';
import ImageSwiper from './image-viewer.vue';

let viewer = null;
export function openImageViewer(urls) {
  viewer?.open(urls);
}
export function closeImageViewer() {
  viewer?.close();
}

export function install(app) {
  viewer = createViewer();

  app.config.globalProperties.openImageViewer = openImageViewer;
  app.config.globalProperties.closeImageViewer = closeImageViewer;
}

function createViewer() {
  const element = document.createElement('div');
  document.body.appendChild(element);

  return createApp(ImageSwiper).mount(element);
}