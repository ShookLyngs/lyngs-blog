<template>
  <container class="bg-negative-700" content-class="!py-20">
    <resume-section-header
      title="文章"
      description="推荐阅读的文章。"
    />

    <ul>
      <li tabindex="0" class="resume-article">
        <imager class="w-full h-44 overflow-hidden" :src="avatarImage" />
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
    @apply bg-negative-900 overflow-hidden border border-negative-600;
    @apply transition duration-300 cursor-pointer hover:border-negative-500 focus:opacity-70;

    &__main {
      @apply body-x py-3;
    }
    &__title {
      @apply text-xl font-bold truncate;
    }
    &__description {
      @apply truncate text-positive-300;
    }
  }
</style>