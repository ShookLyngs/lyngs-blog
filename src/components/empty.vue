<template>
  <div class="flex justify-center body-y">
    <imager class="w-32 h-32 object-fit select-none" :src="emptyImage" />
  </div>
</template>

<script>
  import emptyImage from '@/assets/images/empty.png';

  export default {
    name: 'empty',
    setup() {
      return {
        emptyImage,
      };
    },
  };
</script>

<style scoped></style>
