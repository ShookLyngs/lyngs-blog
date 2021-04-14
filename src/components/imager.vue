<template>
  <div
    ref="imager"
    class="imager relative flex justify-center items-center"
    @click="openPopper"
  >
    <transition :name="transition ? transitionName : ''">
      <!-- Image shown -->
      <template v-if="imageVisible && !loading && !error">
        <span
          class="imager__background w-full h-full bg-cover bg-center"
          :style="{ backgroundImage: `url(${src})` }"
          v-if="background"
        />
        <img
          class="w-full object-fit"
          :src="src"
          alt=""
          v-else
        >
      </template>
    </transition>

    <transition mode="out-in" :name="transition ? transitionName : ''">
      <!-- Load image failed -->
      <div class="absolute left-0 top-0 w-full h-full flex justify-center items-center" v-if="!loading && error" @click="retry">
        <slot>
          <icon name="icon-image" />
        </slot>
      </div>
    </transition>

    <modal ref="popper" />
  </div>
</template>

<script>
  // Functions
  import { computed, ref, watch, watchEffect } from 'vue';
  import { useScrollbar } from '@/components/scrollbar';
  // Components
  import Icon from '@/components/icon';
  import Modal from '@/components/modal.vue';

  export default {
    name: 'imager',
    components: {
      Icon,
      Modal,
    },
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
        default: true,
      },
      transitionName: {
        type: String,
        default: 'fade-fast',
      },
      lazy: {
        type: Boolean,
        default: true,
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
        if (props.src) element.src = props.src;
        return element;
      }

      const image = ref(createImageElement());
      watch(() => props.src, () => image.value = createImageElement());

      const imager = ref();
      const scrollbar = useScrollbar();
      const isIntersecting = ref(false);
      const imageVisible = computed(() => !props.lazy || (props.lazy && isIntersecting.value));
      function onIntersection(entry) {
        isIntersecting.value = entry.intersectionRatio > 0;
      }
      watchEffect(() => {
        if (props.lazy && scrollbar?.wrap && imager.value && !loading.value && !error.value) {
          scrollbar.observe(imager.value, onIntersection);
        }
      });

      const popper = ref();
      function openPopper() {
        if (popper.value) {
          popper.value.open();
        }
      }

      return {
        loading,
        error,
        retry,

        imager,
        imageVisible,

        popper,
        openPopper,
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
