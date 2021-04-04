import { defineConfig } from 'vite';

// Vite plugins
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';

// PostCSS
import postcss from './postcss.config';

// Path
import { join } from 'path';
const resolve = (...paths) => join(__dirname, ...paths);

export default defineConfig({
  base: './',
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: resolve('src') },
    ],
  },
  css: {
    postcss,
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "@/assets/styles/global.less";`,
        },
      },
    },
  },
  plugins: [
    vue(),
    legacy(),
    eslint({
      cache: false,
      include: ['./src/*/**.js', './src/*/**.vue'],
    }),
  ],
});
