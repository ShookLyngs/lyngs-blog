/**
 * Create a `install` function inside of component.
 * So the component can be use on both `app.component()` and `app.use` situations.
 * @param {Object} component
 * @param {Function} injector
 * @returns Object
 */
export function createInstallableComponent(component, injector = () => {}) {
  function installComponent(app) {
    app.component(component.name, component);
    injector(app);
  }

  if ('install' in component) {
    const superInstall = component.install;
    component.install = (...args) => {
      superInstall(...args);
      installComponent();
    };
  } else {
    component.install = installComponent;
  }

  return component;
}