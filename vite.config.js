import { defineConfig } from 'vite';

// Vite plugins
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';

// PostCSS
import postcss from './postcss.config';

// Path
import { join } from 'path';
const resolve = (...paths) => join(__dirname, ...paths);

export default defineConfig({
  css: {
    postcss,
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        hack: `true; @import "${resolve('src/assets/styles/index.less')}";`,
      },
    },
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
