<template>
  <div class="body-y text-xl">推荐</div>
  <div class="rounded-lg border border-negative-700 overflow-hidden">
    <ul>
      <li class="recommended-item" v-for="(item, index) in list" :key="item.id">
        <div class="flex w-full body-y">
          <div class="flex-static">
            <tag padding="sm" class="mt-1 !bg-theme-500 !text-negative-900 font-bold">{{ index + 1 }}</tag>
          </div>
          <div class="flex-auto">
            <div class="recommended-item__title text-base text-lg md:text-xl text-positive-900 font-bold">{{ item.title }}</div>
            <div class="mt-1 text-xs md:text-sm text-positive-300">{{ item.subtitle }}</div>
            <div class="mt-1 inline-flex flex-wrap" v-if="item.tags">
              <tag
                padding="sm"
                class="mr-2"
                v-for="tag in item.tags"
                :key="tag"
              >
                {{ tag }}
              </tag>
            </div>
          </div>
          <div class="flex-static w-24 md:w-36 h-20 ml-2" v-if="item.image">
            <imager
              transition background
              class="w-full h-full flex-auto rounded overflow-hidden"
              :src="item.image"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  // Functions
  import { ref } from 'vue';
  // Components
  import Tag from '@/components/tag.vue';
  // Resources
  import detailImage from '@/assets/images/article/detail.jpg';

  export default {
    name: 'articles-recommended',
    components: {
      Tag,
    },
    setup() {
      const list = ref([
        {
          id: `${Date.now()}`,
          title: '如何在现代浏览器里实现列表/图片懒加载',
          subtitle: '细谈 Resize Observer / Intersection API 与他们所带来的 Bugs，这部分知识你不一定需要用到，但是知道总比不懂得要好。',
          createTime: '2021-04-09 18:26:22',
          tags: ['前端开发', 'JavaScript', 'ES2021'],
          image: detailImage,
        },
        {
          id: `${Date.now()}`,
          title: '如何在现代浏览器里实现列表/图片懒加载',
          subtitle: '细谈 Resize Observer / Intersection API 与他们所带来的 Bugs，这部分知识你不一定需要用到，但是知道总比不懂得要好。',
          createTime: '2021-04-09 18:26:22',
          tags: ['前端开发', 'JavaScript', 'ES2021'],
          image: detailImage,
        },
      ]);

      return {
        list,
        detailImage,
      };
    },
  };
</script>

<style lang="less" scoped>
  .recommended-item {
    @apply flex flex-col body-x cursor-pointer select-none bg-negative-900;
    @apply transition-all duration-300 active:opacity-70;

    .recommended-item__title {
      @apply transition duration-300;
    }
    &:hover {
      .recommended-item__title {
        @apply text-theme-600;
      }
    }

    &:not(:last-child) {
      &::after {
        content: '';
        @apply w-full h-px bg-negative-600;
      }
    }
  }
</style>