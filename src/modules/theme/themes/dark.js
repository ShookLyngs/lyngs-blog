import { createTheme } from '@lyngs/themer-vue';

export default createTheme({
  name: 'dark',
  data: {
    colors: {
      positive: {
        default: '#ffffff',
        900: '#ffffff',
        800: '#efefef',
        700: '#dbdbdb',
      },
    },
  }
});