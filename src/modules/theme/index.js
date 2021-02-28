import { createVueThemeManager } from './composition';
import light from './themes/light';
import dark from './themes/dark';

const { manager, install } = createVueThemeManager([
  light,
  dark,
]);

export default { install };
export {
  manager,
  install,
};