import { createTailwindPreset } from '@lyngs/themer-vue';
import { manager } from './src/modules/theme';

export default {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{vue,html,js,jsx}',
      './src/assets/styles/index.less',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  presets: [
    createTailwindPreset(manager),
  ],
};