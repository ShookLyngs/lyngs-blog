<template>
  <div class="h-full flex-auto">
    <layout-header />
    <main>
      <slot />
    </main>
    <layout-footer />
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