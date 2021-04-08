import { createTheme } from '@lyngs/themer-vue';
import { alpha } from '../util';

export default createTheme({
  name: 'light',
  data: {
    colors: {
      negative: {
        500: '#dbdbdb',
        600: '#ececec',
        700: '#f3f3f3',
        800: '#f9f9f9',
        900: '#ffffff',
      },
      positive: {
        default: '#333333',
        800: '#333333',
        700: '#4c4c41',
        600: '#575757',
        500: '#636363',
        400: '#707070',
        200: '#9e9e9e',
        100: '#aeaeae',
      },
      theme: {
        default: '#3c7dff',
        500: '#3c7dff',
        600: '#225aca',
      },
      success: {
        500: '#42a773',
        600: '#3e7946',
      },
      error: {
        500: '#e35f5f',
        600: '#b14c4c',
      },
      mask: {
        50: alpha('#f9f9f9', 0.1),
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
  },
});
