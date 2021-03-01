<template>
  <div>
    <div class="text-positive-900">{{ theme.name }}</div>
    <button @click="toggleTheme">Switch Theme</button>
    <div>{{ result }}</div>
    <button @click="add(1)">Add</button>
  </div>
</template>

<script>
  import { useThemeManager } from '@/modules/theme/composition';
  import { useAdd } from '@lyngs/theme-manager';

  export default {
    name: 'home-index',
    setup() {
      const { theme, setTheme } = useThemeManager();
      function toggleTheme() {
        setTheme(theme.value.name === 'light' ? 'dark' : 'light');
      }

      const { result, add } = useAdd(0);

      return {
        theme,
        toggleTheme,
        result,
        add,
      };
    },
  };
</script>