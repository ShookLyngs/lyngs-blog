<template>
  <div>
    <container content-class="!py-20">
      <div class="flex items-center">
        <imager
          class="w-16 h-16 md:w-24 md:h-24 flex-static rounded-full overflow-hidden"
          :src="avatarImage"
        />
      </div>
      <div class="mt-3 md:mt-5">
        <div class="text-3xl md:text-5xl font-bold text-positive-900">
          <span>我是 ShookLyngs</span>
          <span class="text-positive-100">,</span>
        </div>
        <div class="mt-0.5 md:mt-3 text-lg md:text-3xl font-medium text-positive-600">
          <span>擅长捣鼓</span>
          <span class="px-2 font-semibold text-positive-900">JavaScript</span>
          <span class="text-positive-100">/</span>
          <span class="px-2 font-semibold text-positive-900">Flutter</span>
          <span>的程序员</span>
          <span class="text-positive-100">。</span>
        </div>
      </div>
    </container>

    <div class="tabs !sticky top-0 left-0 z-40 bg-negative-800">
      <container content-class="!pt-0">
        <div class="h-[70px] flex">
          <tabs class="flex flex-auto h-full" :current="currentTab" @upadte="onTabUpdate">
            <tab value="resume">关于我</tab>
            <tab value="articles">提供 Offer</tab>
          </tabs>

          <div class="flex-static flex items-center">
            <a href="javascript:;">
              <imager class="w-7 h-7 ml-2 rounded-full overflow-hidden bg-negative-600" />
            </a>
            <a href="javascript:;">
              <imager class="w-7 h-7 ml-2 rounded-full overflow-hidden bg-negative-600" />
            </a>
            <a href="javascript:;">
              <imager class="w-7 h-7 ml-2 rounded-full overflow-hidden bg-negative-600" />
            </a>
          </div>
        </div>
      </container>
    </div>

    <container content-class="!py-20">
      <div class="mb-4 flex justify-between items-center">
        <div>
          <div class="text-xl md:text-3xl font-bold">我的仓库</div>
          <div class="text-sm text-positive-300">我通常将项目文件保存在 Github。</div>
        </div>
        <div class="ml-4 text-sm inline-flex items-center">
          <a href="javascript:;">
            <imager class="w-7 h-7 rounded-full overflow-hidden bg-negative-600" />
          </a>
          <icon name="icon-arrow-right" />
        </div>
      </div>
      <repositories />
    </container>

    <div class="py-20 bg-negative-700">
      <container content-class="!pt-0">
        <div class="mb-4 flex justify-between items-center">
          <div>
            <div class="text-xl md:text-3xl font-bold">提供 Offer</div>
            <div class="text-sm text-positive-300">如果你想要提供给我内推的机会，请先阅读我的应聘信息。</div>
          </div>
          <div class="ml-4 text-sm inline-flex items-center">
            <span class="mr-1">联系我</span>
            <icon name="icon-arrow-right" />
          </div>
        </div>
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

    <container>
      <div class="mt-20 flex items-center text-xl">
        <ripple type="interval" class="w-5 h-5 rounded-full transition duration-300 hover:opacity-80">
          <div class="w-full h-full rounded-full border-[5px] border-solid border-negative-600 bg-theme-400" />
        </ripple>
        <span class="ml-2">技术栈</span>
      </div>
      <div class="mt-3 body bg-negative-900 shadow-md">
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
  // Components
  import Ripple from '@/components/ripple.vue';
  import Tabs from '@/components/tabs.vue';
  import Tab from '@/components/tab.vue';
  import Repositories from './repositories.vue';
  // Resources
  import avatarImage from '@/assets/images/avatar.jpg';
  import { ref } from 'vue';

  export default {
    name: 'resume-page',
    components: {
      Ripple,
      Tabs,
      Tab,
      Repositories,
    },
    setup() {
      // Current tab
      const currentTab = ref();
      function onTabUpdate(current) {
        currentTab.value = current;
      }

      return {
        currentTab,
        onTabUpdate,

        avatarImage,
      };
    },
  };
</script>

<style lang="less" scoped>
  .tabs {
    box-shadow: 0 1px 0 theme('colors.negative-600');
  }
</style>