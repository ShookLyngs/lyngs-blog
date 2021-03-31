import { createThemer } from '@lyngs/themer-vue';
import light from './themes/light';
import dark from './themes/dark';

export const { manager, install } = createThemer([light, dark]);

export default { install };
