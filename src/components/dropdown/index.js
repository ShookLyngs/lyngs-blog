import { createInstallableComponent } from '@/assets/util/component';
import Dropdown from './dropdown.vue';
import DropdownMenu from './dropdown-menu.vue';
import DropdownItem from './dropdown-item.vue';

export {
  Dropdown,
  DropdownMenu,
  DropdownItem,
};
export default createInstallableComponent(Dropdown, app =>{
  app.component(DropdownMenu.name, DropdownMenu);
  app.component(DropdownItem.name, DropdownItem);
});