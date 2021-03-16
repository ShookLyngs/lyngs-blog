<template>
  <div class="h-full flex-auto flex flex-col">
    <div class="flex-auto flex flex-col overflow-y-auto">
      <layout-header />
      <main class="flex flex-col">
        <slot />
      </main>
      <layout-footer />
    </div>
  </div>
</template>

<script>
  import LayoutHeader from './header.vue';
  import LayoutFooter from './footer.vue';

  export default {
    name: 'layout',
    components: {
      LayoutHeader,
      LayoutFooter,
    },
  };
</script>

<style scoped>

</style>