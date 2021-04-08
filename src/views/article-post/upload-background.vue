<template>
  <div class="relative" @dragover.prevent @drop.prevent>
    <div
      class="background"
      :class="backgroundClass"
      :style="backgroundStyle"
      @mouseenter="onHover"
      @mouseleave="onBlur"
      @dragenter="onHover"
      @dragleave="onBlur"
      @dragover="onHover"
      @drop="onDrop"
      @click="choose"
    >
      <div class="h-36 text-3xl text-positive-600 flex justify-center items-center">
        <div class="upload-button w-14 h-14 transition duration-300 flex justify-center items-center rounded-full">
          <icon name="icon-image-upload" />
        </div>
      </div>
    </div>
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      @change="onFileInputChange"
    >
  </div>
</template>

<script>
  import { ref, computed, watchEffect} from 'vue';
  import { useUpload } from '@/hooks/use-upload';

  export default {
    name: 'upload-background',
    setup() {
      const background = ref('');
      const backgroundStyle = ref({});

      const { loadFile, files, addFiles, onDrop } = useUpload();
      watchEffect(async () => {
        if (files.value.length) {
          background.value = files.value[0];
          const url = await loadFile(background.value);
          backgroundStyle.value = {
            backgroundImage: `url(${url})`,
          };

          onBlur();
        }
      });

      const isHover = ref(false);
      const backgroundClass = computed(() => {
        const classes = [];
        if (isHover.value) classes.push('is-hover');
        if (background.value) classes.push('is-fill');
        return classes;
      });
      function onHover() {
        if (!isHover.value) isHover.value = true;
      }
      function onBlur() {
        if (isHover.value) isHover.value = false;
      }

      const fileInput = ref();
      function choose() {
        fileInput.value.click();
      }
      function onFileInputChange({ target }) {
        const { files } = target;
        addFiles(files);
      }

      return {
        backgroundStyle,
        backgroundClass,

        files,
        onDrop,
        onHover,
        onBlur,

        fileInput,
        choose,
        onFileInputChange,
      };
    },
  };
</script>

<style lang="less" scoped>
  .background {
    @apply w-full absolute top-0 overflow-hidden rounded-2xl cursor-pointer md:breaker-content;
    @apply transition duration-300 bg-cover bg-center bg-negative-700;
    left: 50%;
    height: 260px;
    transform: translate3d(-50%, 0, 0);

    .upload-button {
      @apply bg-negative-500;
      transform: scale3d(1, 1, 1);
    }
    &.is-fill {
      .upload-button {
        @apply opacity-70;
      }
    }
    &.is-hover {
      @apply opacity-80 bg-negative-500;

      .upload-button {
        @apply opacity-100 bg-negative-900 text-theme-500 shadow-xl;
        transform: scale3d(1.2, 1.2, 1);
      }
    }
  }
</style>