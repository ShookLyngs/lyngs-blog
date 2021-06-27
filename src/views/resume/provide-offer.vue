<template>
  <div class="py-20 bg-negative-700">
    <container content-class="!pt-0">
      <resume-section-header
        title="联系"
        description="如果你想要提供给我内推的机会，请先阅读我的应聘信息。"
      >
        <template #actions>
          <span class="mr-1">联系我</span>
          <icon name="icon-arrow-right" />
        </template>
      </resume-section-header>

      <div class="mt-8 flex">
        <div class="mr-3 body flex-1 flex items-center bg-negative-900">
          <imager class="w-12 h-12 rounded-full overflow-hidden bg-negative-700" />
          <div class="body-left flex-auto">
            <div class="text-xs text-positive-300">职业方向</div>
            <div class="md:text-xl font-bold text-positive-900">前端开发</div>
          </div>
        </div>
        <div class="mr-3 body flex-1 flex items-center bg-negative-900">
          <imager class="w-12 h-12 rounded-full overflow-hidden bg-negative-700" />
          <div class="body-left flex-auto">
            <div class="text-xs text-positive-300">现居城市</div>
            <div class="md:text-xl font-bold text-positive-900">广西·南宁</div>
          </div>
        </div>
        <div class="flex-1 body flex items-center bg-negative-900">
          <imager class="w-12 h-12 rounded-full overflow-hidden bg-negative-700" />
          <div class="body-left flex-auto">
            <div class="text-xs text-positive-300">薪资区间</div>
            <div class="md:text-xl font-bold text-positive-900">12-14K</div>
          </div>
        </div>
      </div>
      <div class="mt-8 body bg-negative-900">
        <div class="text-positive-600 body-bottom">
          <span class="text-2xl font-semibold text-positive-900">技术栈</span>
          <span class="px-1.5 text-negative-500">/</span>
          <span>3年经验</span>
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
    </container>
  </div>
</template>

<script>
  import ResumeSectionHeader from './section-header.vue';
  export default {
    name: 'resume-provide-offer',
    components: {
      ResumeSectionHeader,
    },
  };
</script>

<style scoped>

</style>