<template>
  <div class="flex justify-center body-y">
    <imager class="w-32 h-32 object-fit select-none" :src="image" />
  </div>
</template>

<script>
  import emptyImage from '@/assets/images/empty.png';
  import emptySearchImage from '@/assets/images/empty-search.png';
  import {computed} from 'vue';

  const types = {
    default: emptyImage,
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
