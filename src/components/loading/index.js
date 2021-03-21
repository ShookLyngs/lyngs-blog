import component from './loading.vue';
import directive from './directive';

export default {
  install(app) {
    app.component(component.name, component);
    app.use(directive);
  }
};