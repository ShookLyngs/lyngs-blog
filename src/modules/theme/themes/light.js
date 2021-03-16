import { createTheme } from '@lyngs/themer-vue';
import { alpha } from '../util';

export default createTheme({
  name: 'light',
  data: {
    colors: {
      negative: {
        800: '#f9f9f9',
        900: '#ffffff',
      },
      positive: {
        default: '#2a2a2a',
        900: '#2a2a2a',
        800: '#393939',
      },
      theme: {
        default: '#3c7dff',
        500: '#3c7dff',
        600: '#225aca',
      },
      mask: {
        50:  alpha('#f9f9f9', 0.1),
        100: alpha('#f9f9f9', 0.2),
        200: alpha('#f9f9f9', 0.3),
        300: alpha('#f9f9f9', 0.4),
        400: alpha('#f9f9f9', 0.5),
        500: alpha('#f9f9f9', 0.6),
        600: alpha('#f9f9f9', 0.7),
        700: alpha('#f9f9f9', 0.8),
        800: alpha('#f9f9f9', 0.9),
        900: '#f9f9f9',
      },
    },
  }
});