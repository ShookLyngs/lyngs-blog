import tailwind from '@tailwindcss/jit';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';
import tailwindConfig from './tailwind.config.js';

export default {
  plugins: [
    tailwind(tailwindConfig),
    autoprefixer,
    pxtorem({
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: ['.norem'],
    }),
  ],
};
