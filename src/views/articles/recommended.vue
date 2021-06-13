<template>
  <div class="body rounded-lg bg-negative-900 border border-negative-700">
    <div>推荐文章</div>
    <ul>
      <li class="flex body-y">
        <div class="w-32 h-20 mr-4">
          <imager
            transition
            background
            class="w-full h-full flex-auto rounded overflow-hidden"
            :src="detailImage"
          />
        </div>
        <div>
          <div class="text-lg text-positive-900 font-semibold">
            关于微任务，关于宏任务，这里是详细的解释
          </div>
          <div class="text-sm text-positive-300">
            讲讲什么是微任务、宏任务。
          </div>
          <div class="mt-2">
            <tag no-gap padding="sm" class="mr-2">前端开发</tag>
          </div>
        </div>
      </li>
      <li class="flex body-y">
        <div class="w-32 h-20 mr-4">
          <imager
            transition
            background
            class="w-full h-full flex-auto rounded overflow-hidden"
            :src="detailImage"
          />
        </div>
        <div>
          <div class="text-lg text-positive-900 font-semibold">
            关于微任务，关于宏任务，这里是详细的解释
          </div>
          <div class="text-sm text-positive-300">
            讲讲什么是微任务、宏任务。
          </div>
          <div class="mt-2">
            <tag no-gap padding="sm" class="mr-2">前端开发</tag>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
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
      return {
        detailImage,
      };
    },
  };
</script>

<style scoped>

</style>