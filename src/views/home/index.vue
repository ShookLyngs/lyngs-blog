<template>
  <div>
    <div class="text-positive-900">{{ theme.name }}</div>
    <button @click="toggleTheme">Switch Theme</button>
  </div>
</template>

<script>
  import { useThemeManager } from '@/modules/theme/composition';

  export default {
    name: 'home-index',
    setup() {
      const { theme, setTheme } = useThemeManager();
      function toggleTheme() {
        setTheme(theme.value.name === 'light' ? 'dark' : 'light');
      }

      return {
        theme,
        toggleTheme,
      };
    },
  };
</script>