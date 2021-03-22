<template>
  <div class="flex flex-col items-center">
    <div class="body-x w-full pt-5 md:px-0 md:content">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'container'
  };
</script>