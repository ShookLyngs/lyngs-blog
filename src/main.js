// Create App instance
import { createApp } from 'vue';
import App from '@/app.vue';
const app = createApp(App);

// Import VueRouter
import router from '@/modules/router';
app.use(router);

// Import Themer
import theme from '@/modules/theme';
app.use(theme);

// Import TailwindCSS and custom styles
import '@/assets/styles/index.less';

// Use global components
import components from '@/modules/component';
app.use(components);

// Mounting Vue App into document
app.mount('#app');
