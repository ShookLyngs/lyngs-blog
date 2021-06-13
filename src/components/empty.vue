<template>
  <div class="flex justify-center body-y">
    <imager class="w-1/4 object-fit select-none" :src="image" />
  </div>
</template>

<script>
  // Functions
  import { computed } from 'vue';
  // Resources
  import emptyImage from '@/assets/images/empty.png';
  import emptyLargeImage from '@/assets/images/empty-large.png';
  import emptySearchImage from '@/assets/images/empty-search.png';

  const types = {
    default: emptyImage,
    large: emptyLargeImage,
    search: emptySearchImage,
  };

  export default {
    name: 'empty',
    props: {
      type: {
        type: String,
        default: 'default',
        validator: type => type in types
      },
    },
    setup(props) {
      const image = computed(() => types[props.type]);
      return {
        image,
      };
    },
  };
</script>

<style scoped></style>
