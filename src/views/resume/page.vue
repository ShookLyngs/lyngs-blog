<template>
  <container>
    <div class="mt-10 flex items-center">
      <imager
        class="w-16 h-16 md:w-24 md:h-24 flex-static rounded-full overflow-hidden"
        :src="avatarImage"
      />
    </div>
    <div class="mt-3 md:mt-5">
      <div class="text-3xl md:text-5xl font-bold text-positive-900">ShookLyngs</div>
      <div class="mt-0.5 md:mt-3 text-lg md:text-3xl font-medium text-positive-600">
        <span>擅长捣鼓</span>
        <span class="px-2 font-semibold text-positive-900">JavaScript</span>
        <span class="text-positive-100">/</span>
        <span class="px-2 font-semibold text-positive-900">Flutter</span>
        <span>的程序员</span>
        <span class="text-positive-100">。</span>
      </div>
    </div>

    <div class="mt-20 flex items-center text-xl">
      <ripple type="interval" class="w-5 h-5 rounded-full transition duration-300 hover:opacity-80">
        <div class="w-full h-full rounded-full border-[5px] border-solid border-negative-600 bg-theme-400" />
      </ripple>
      <span class="ml-2">技术栈</span>
    </div>
    <div class="mt-3 body bg-negative-900 shadow-md">
      <div class="text-positive-600 body-bottom">
        <span class="text-2xl font-semibold text-positive-900">前端工程师</span>
        <span class="px-1.5 text-negative-500">/</span>
        <span>3年经验</span>
        <span class="px-1.5 text-negative-500">/</span>
        <span>南宁</span>
      </div>
      <div class="text-sm md:text-base">
        <div>
          <span>- 擅长使用</span>
          <span class="mx-1.5 text-sm text-theme-600 font-bold">Vue.js</span>
          <span>开发，熟悉相关生态。</span>
        </div>
        <div class="mt-1 md:mt-0">
          <span>- 熟悉</span>
          <span class="mx-1.5 text-sm text-theme-600 font-bold">Flutter</span>
          <span class="text-negative-500">/</span>
          <span class="mx-1.5 text-sm text-theme-600 font-bold">UniApp</span>
          <span>，有数个相关的移动端项目开发经验。</span>
        </div>
        <div class="mt-1 md:mt-0">
          <span>- 熟悉</span>
          <span class="mx-1.5 text-sm text-theme-600 font-bold">TypeScript</span>
          <span>，用其开发过数个工具库。</span>
        </div>
        <div class="mt-1 md:mt-0">
          <span>- 掌握常用的</span>
          <span class="mx-1.5 text-sm text-theme-600 font-bold">Webpack</span>
          <span class="text-negative-500">/</span>
          <span class="mx-1.5 text-sm text-theme-600 font-bold">Vite</span>
          <span>等构建工具。</span>
        </div>
        <div class="mt-4 opacity-70">
          <div>
            <span>* 有少数使用</span>
            <span class="mx-1.5 text-sm text-theme-600 font-bold">React</span>
            <span>进行工具库开发的经验。</span>
          </div>
          <div class="mt-1 md:mt-0">
            <span>* 有少数使用</span>
            <span class="mx-1.5 text-sm text-theme-600 font-bold">Nest.js</span>
            <span class="text-negative-500">/</span>
            <span class="mx-1.5 text-sm text-theme-600 font-bold">Koa</span>
            <span>开发后端接口的经验。</span>
          </div>
        </div>
      </div>
    </div>

    <!--<div class="body mt-10 rounded-lg border border-negative-600 bg-negative-900">
      <div class="flex">
        <imager
          class="w-24 h-24 rounded-full overflow-hidden"
          :src="avatarImage"
        />
        <div class="body-left">
          <div>Shook</div>
          <div>Description</div>
        </div>
      </div>
    </div>-->
  </container>
</template>

<script>
  // Components
  import Ripple from '@/components/ripple.vue';
  import Tag from '@/components/tag.vue';
  // Resources
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'resume-page',
    components: {
      Ripple,
      Tag,
    },
    setup() {
      return {
        avatarImage,
      };
    },
  };
</script>

<style scoped>

</style>