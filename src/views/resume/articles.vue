<template>
  <container class="bg-negative-700" content-class="!py-20">
    <resume-section-header
      title="文章"
      description="推荐阅读的文章。"
    >
      <template #actions>
        <a href="javascript:;">
          <imager class="w-7 h-7 rounded-full overflow-hidden bg-negative-500" />
        </a>
        <icon name="icon-arrow-right" />
      </template>
    </resume-section-header>

    <ul class="flex flex-wrap justify-between">
      <li tabindex="0" class="resume-article">
        <imager class="resume-article__avatar" :src="avatarImage" />
        <div class="resume-article__main">
          <div class="resume-article__title">Title</div>
          <div class="resume-article__description">Description</div>
        </div>
      </li>
      <li tabindex="0" class="resume-article">
        <imager class="resume-article__avatar" :src="avatarImage" />
        <div class="resume-article__main">
          <div class="resume-article__title">Title</div>
          <div class="resume-article__description">Description</div>
        </div>
      </li>
      <li tabindex="0" class="resume-article">
        <imager class="resume-article__avatar" :src="avatarImage" />
        <div class="resume-article__main">
          <div class="resume-article__title">Title</div>
          <div class="resume-article__description">Description</div>
        </div>
      </li>
    </ul>
  </container>
</template>

<script>
  // Functions
  import { ref } from 'vue';
  // Components
  import ResumeSectionHeader from './section-header.vue';
  // Resources
  import avatarImage from  '@/assets/images/avatar.jpg';

  export default {
    name: 'resume-articles',
    components: {
      ResumeSectionHeader,
    },
    setup() {
      const list = ref([]);

      return {
        list,

        avatarImage,
      };
    },
  };
</script>

<style lang="less" scoped>
  .resume-article {
    @apply bg-negative-900 overflow-hidden select-none border border-negative-600;
    @apply transition duration-300 cursor-pointer hover:border-negative-500 active:opacity-70;

    &__avatar {
      @apply w-full h-44 overflow-hidden;
    }
    &__main {
      @apply body-x py-3;
    }
    &__title {
      @apply text-xl font-bold truncate;
    }
    &__description {
      @apply text-sm md:text-base truncate text-positive-300;
    }

    &:hover {
      .resume-article__title {
        @apply text-theme-600;
      }
    }

    &:first-child {
      @apply w-full;
    }
    &:not(:first-child) {
      @apply mt-6;
      width: calc(50% - theme('spacing.2'));

      .resume-article__avatar {
        @apply h-24;
      }
      .resume-article__title {
        @apply text-base md:text-lg;
      }
      .resume-article__description {
        @apply text-xs md:text-sm;
      }
    }
  }
</style>