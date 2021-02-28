import { defineConfig } from 'vite';

import postcss from './postcss.config';

// Vite plugins
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';

// Path
import { join } from 'path';
const resolve = (...paths) => join(__dirname, ...paths);

import { getDirectories } from './src/assets/util/glob';
const directories = getDirectories({
  root: process.cwd(),
  path: 'src',
  depth: 1,
});
console.log(directories);

export default defineConfig({
  css: {
    postcss,
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
  plugins: [
    vue(),
    eslint({
      include: [ './src/*/**.js', './src/*/**.vue' ],
    }),
  ],
});
