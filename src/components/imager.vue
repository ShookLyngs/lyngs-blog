<template>
  <div class="imager relative flex justify-center items-center">
    <!-- Image shown -->
    <transition mode="out-in" :name="transition ? transitionName : ''">
      <span
        class="imager__background w-full h-full bg-cover bg-center"
        :style="{ backgroundImage: `url(${src})` }"
        v-if="background && !loading && !error"
      />
      <img
        class="w-full object-fit"
        :src="src"
        alt=""
        v-loading="true"
        v-else-if="!loading && !error"
      >
    </transition>
    <!-- Load image failed -->
    <transition :name="transition ? transitionName : ''">
      <div v-if="!loading && error" @click="retry">
        <slot>
          <icon name="icon-image" />
        </slot>
      </div>
    </transition>
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
      background: {
        type: Boolean,
        default: false,
      },
      transition: {
        type: Boolean,
        default: false,
      },
      transitionName: {
        type: String,
        default: 'fade-fast',
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
        image.value = createImageElement();
      }
      function createImageElement() {
        const element = new Image();
        element.onload = () => finish(true);
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

<style lang="less" scoped>
  .imager {
    &__background {
      padding-top: 100%;
    }
  }
</style>
