import { createThemeManager } from './util';
import { inject, ref } from 'vue';

const themeManagerKey = 'themeManager';

export function useThemeManager() {
  return inject(themeManagerKey);
}

export function createVueThemeManager(options) {
  const manager = createThemeManager(options);

  // Convert to observable
  manager.theme = ref(manager.theme.value);
  // Wrap `setTheme()`, prevent loss of pointer
  const setTheme = manager.setTheme;
  manager.setTheme = theme => setTheme.call(manager, theme);

  return {
    manager,
    install(app) {
      app.provide(themeManagerKey, manager);
      app.config.globalProperties.$themeManager = manager;
    }
  };
}

export default createVueThemeManager;