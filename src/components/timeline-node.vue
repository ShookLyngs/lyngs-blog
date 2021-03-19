<template>
  <div class="absolute right-full top-0 h-full body">
    <div class="flex items-center h-8">
      <div class="mr-2">time</div>
      <div class="w-5 h-5 box-border rounded-full border-4 border-positive-400 bg-negative-800 z-10" />
    </div>
    <div class="absolute box-content body-x w-5 right-0 top-9 -bottom-14 flex justify-center">
      <div class="w-px h-full bg-negative-600" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'timeline-node',
    props: {
      isFirst: {
        type: Boolean,
        default: false,
      },
      isLast: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style scoped>

</style>