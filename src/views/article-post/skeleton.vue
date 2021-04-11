<template>
  <container class="flex-auto" content-class="flex-auto flex flex-col">
    <div class="relative">
      <div class="absolute top-0 w-full h-64 left-1/2 transform -translate-x-1/2 md:breaker-content rounded-2xl bg-negative-700" />
    </div>

    <div class="post flex-auto flex flex-col relative body-x py-8 mt-36 rounded-lg border border-negative-700 bg-negative-900" />
  </container>
</template>

<script>
  export default {
    name: 'article-post-skeleton'
  };
</script>