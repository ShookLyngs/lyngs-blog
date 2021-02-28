// Create App instance
import { createApp } from 'vue';
import App from '@/app.vue';
const app = createApp(App);

// Import VueRouter@next
import router from '@/modules/router';
app.use(router);

// Import ThemeManager
import theme from '@/modules/theme';
app.use(theme);

// Import tailwind-css, the base css-style-framework
import 'tailwindcss/tailwind.css';

// Mounting Vue App into document
app.mount('#app');
