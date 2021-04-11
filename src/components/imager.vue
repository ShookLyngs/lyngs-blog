<template>
  <div class="relative flex justify-center items-center" v-loading="true">
    <!-- Image shown -->
    <img
      class="w-full object-fit"
      :src="src"
      alt=""
      v-if="!loading && !error"
    >

    <!-- Load image failed -->
    <div v-if="!loading && error" @click="retry">
      <slot>
        X
        <!-- TODO: Load fail content -->
      </slot>
    </div>
  </div>
</template>

<script>
  import { ref, watch } from 'vue';

  export default {
    name: 'imager',
    props: {
      src: {
        type: [Object, String],
        default: '',
      },
    },
    setup(props) {
      const loading = ref(true);
      const error = ref(false);

      function finish(isSuccess) {
        loading.value = false;
        error.value = !isSuccess;
      }
      function retry() {
        loading.value = true;
      }
      function createImageElement() {
        const element = new Image();
        element.onload = () => setTimeout(() => finish(true), 10000);
        element.onerror = () => finish(false);
        if (props.src) {
          element.src = props.src;
        }

        return element;
      }

      const image = ref(createImageElement());
      watch(() => props.src, () => image.value = createImageElement());

      return {
        loading,
        error,
        retry,
      };
    },
  };
</script>

<style scoped></style>
