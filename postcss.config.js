import tailwind from '@tailwindcss/jit';
import tailwindConfig from './tailwind.config.js';

import prefixer from 'autoprefixer';
import toRem from 'postcss-pxtorem';

export default {
  plugins: [
    prefixer,
    tailwind(tailwindConfig),
    toRem({
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: ['.norem'],
    }),
  ],
};
