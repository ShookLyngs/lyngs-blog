<template>
  <div class="relative flex justify-center items-center" v-loading="loading">
    <!-- Real shown image -->
    <img
      class="w-full object-fit"
      :src="src"
      alt=""
      v-if="!loading && !error"
    >

    <!-- Load Failed -->
    <div v-if="!loading && error" @click="retry">
      <slot>
        X
        <!-- TODO: Load fail content -->
      </slot>
    </div>

    <!-- Image load Tester -->
    <img
      class="hidden"
      alt=""
      :src="src"
      @load="onLoaded"
      @error="onLoadError"
      v-if="request"
    >
  </div>
</template>

<script>
  import { ref } from 'vue';

  export default {
    name: 'imager',
    props: {
      src: {
        type: [Object, String],
        default: '',
      },
    },
    setup() {
      const request = ref(true);
      const loading = ref(true);
      const error = ref(false);

      function retry() {
        request.value = true;
        loading.value = true;
      }
      function finish(isError) {
        request.value = false;
        loading.value = false;
        error.value = isError;
      }
      function onLoaded() {
        finish(false);
      }
      function onLoadError() {
        finish(true);
      }

      return {
        request,
        loading,
        error,
        retry,
        onLoaded,
        onLoadError,
      };
    },
  };
</script>

<style scoped></style>
