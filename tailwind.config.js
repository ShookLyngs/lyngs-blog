import { createTailwindPreset } from '@lyngs/themer-vue';
import { manager } from './src/modules/theme';

export default {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{vue,html,js}', './src/assets/styles/index.less'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      textColor: ['active'],
      backgroundColor: ['active'],
      boxShadow: ['active', 'focus'],
      borderWidth: ['hover'],
      borderColor: ['active', 'focus'],
      opacity: ['active'],
    },
  },
  plugins: [],
  presets: [createTailwindPreset(manager)],
};
