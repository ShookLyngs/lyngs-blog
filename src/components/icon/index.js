import component from './icon.vue';

export default {
  install(app) {
    app.component(component.name, component);
  }
};