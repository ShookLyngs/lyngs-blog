<template>
  <div class="relative flex flex-col items-center">
    <div class="relative px-3.5 w-full pt-5 md:px-0 md:content" :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'container',
    props: {
      contentClass: {
        type: [ String, Object, Array ],
        default: '',
      },
    },
  };
</script>
