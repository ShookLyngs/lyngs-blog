import { createTheme } from '@lyngs/themer-vue';
import { alpha } from '../util';

export default createTheme({
  name: 'light',
  data: {
    colors: {
      negative: {
        50:  alpha('#ffffff', 0.1),
        100: alpha('#ffffff', 0.2),
        200: alpha('#ffffff', 0.3),
        300: alpha('#ffffff', 0.4),
        400: alpha('#ffffff', 0.5),
        500: alpha('#ffffff', 0.6),
        600: alpha('#ffffff', 0.7),
        700: alpha('#ffffff', 0.8),
        800: alpha('#ffffff', 0.9),
        900: '#ffffff',
      },
      positive: {
        default: '#2a2a2a',
        900: '#2a2a2a',
        800: '#393939',
      },
    },
  }
});