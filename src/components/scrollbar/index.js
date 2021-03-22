import component from './scrollbar.vue';

export default {
  install(app) {
    app.component(component.name, component);
  }
};