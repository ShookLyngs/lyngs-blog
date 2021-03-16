<template>
  <header class="header">
    <div class="px-4 flex flex-col md:flex-row md:items-center md:content md:px-0">
      <div class="flex-static flex justify-center mb-3 md:md-0">
        <img class="h-12" src="@/assets/images/logo.svg" alt="logo">
      </div>
      <div class="flex-auto flex items-center">
        <div class="ml-4">
          navs
        </div>
        <div class="flex-static ml-5">
          <border-button>发布文章</border-button>
        </div>
        <div class="flex-static ml-2.5 w-10 h-10 rounded-full bg-gray-100">
          <img class="w-full object-fit border-2 border-theme-500 rounded-full" src="@/assets/images/avatar.jpg" alt="avatar">
        </div>
      </div>
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
    @apply sticky top-0 left-0 right-0 py-3;
    @apply flex-static flex justify-center items-center;
    @apply bg-mask-600;
    min-height: 5rem;
    backdrop-filter: saturate(180%) blur(20px);
  }
</style>