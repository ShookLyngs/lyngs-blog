<template>
  <modal ref="modal">

  </modal>
</template>

<script>
  // Functions
  import { ref } from 'vue';
  // Components
  import Modal from '@/components/modal.vue';

  export default {
    name: 'image-viewer',
    components: {
      Modal,
    },
    setup() {
      const images = ref([]);
      function open(urls) {
        images.value = [ ...urls ];
      }
      function close() {
        images.value = [];
      }

      return {
        images,
        open,
        close,
      };
    }
  };
</script>

<style scoped>

</style>