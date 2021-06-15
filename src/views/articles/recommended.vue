<template>
  <div class="body-y text-xl">推荐</div>
  <div class="rounded-lg bg-negative-900 border border-negative-700">
    <ul>
      <li class="flex body hover:opacity-80">
        <div class="flex-auto">
          <div class="text-base text-xl text-positive-900 font-bold hover:text-theme-600">关于微任务，关于宏任务，这里是详细的解释</div>
          <div class="text-sm text-positive-300">讲讲什么是微任务、宏任务</div>
          <div class="mt-2">
            <tag padding="sm" class="mr-2">前端开发</tag>
            <tag padding="sm" class="mr-2">Javascript</tag>
          </div>
        </div>
        <div class="flex-static w-24 md:w-36 h-20 ml-1">
          <imager
            transition background
            class="w-full h-full flex-auto rounded overflow-hidden"
            :src="detailImage"
          />
        </div>
      </li>
      <div class="body-x">
        <div class="w-full h-px bg-negative-600" />
      </div>
      <li class="flex body hover:opacity-80">
        <div class="flex-auto">
          <div class="text-base text-lg text-positive-900 font-bold hover:text-theme-600">关于微任务，关于宏任务，这里是详细的解释</div>
          <div class="text-sm text-positive-300">讲讲什么是微任务、宏任务</div>
          <div class="mt-2">
            <tag padding="sm" class="mr-2">前端开发</tag>
            <tag padding="sm" class="mr-2">Javascript</tag>
          </div>
        </div>
        <div class="flex-static w-24 md:w-36 h-20 ml-1">
          <imager
            transition background
            class="w-full h-full flex-auto rounded overflow-hidden"
            :src="detailImage"
          />
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