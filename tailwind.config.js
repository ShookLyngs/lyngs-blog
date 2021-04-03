import { createTailwindPreset } from '@lyngs/themer-vue';
import { manager } from './src/modules/theme';

export default {
  purge: [
    './src/**/*.{vue,js,html}',
  ],
  darkMode: false,
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
  presets: [
    createTailwindPreset(manager),
  ],
};
