import { createTailwindPreset } from '@lyngs/themer';
import { manager } from './src/modules/theme';

export default {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{vue,js,jsx}',
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