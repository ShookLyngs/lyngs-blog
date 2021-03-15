<template>
  <header class="header">
    <div class="header__title">
      Lyngs
    </div>
    <div>
      navs
    </div>
    <div>
      avatar
    </div>
  </header>
</template>

<script>
  export default {
    name: 'layout-header'
  };
</script>

<style lang="less" scoped>
  .header {
    @apply sticky top-0 left-0 right-0 h-20;
    @apply flex justify-center items-center text-center;
    @apply bg-negative-600;
    backdrop-filter: saturate(180%) blur(20px);

    &__title {
    @apply text-2xl font-semibold;
    }
  }
</style>