<template>
  <div>
    <!-- Introduce -->
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

    <!-- Secondary header -->
    <!-- Will replace the default header since secondary header has covered by the default -->
    <div ref="replaceHeaderContent" class="h-[70px] tabs">
      <teleport :disabled="!isReplaceHeader" to="#header-replace-slot">
        <container class="w-full" content-class="!pt-0">
          <div class="h-[70px] flex">
            <tabs class="flex flex-auto h-full" :current="currentTab" @upadte="onTabUpdate">
              <tab value="resume">介绍</tab>
              <tab value="repositories">项目</tab>
              <tab value="articles">文章</tab>
              <tab value="memos">想法</tab>
              <tab value="offer">联系</tab>
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
      </teleport>
    </div>

    <!-- Description -->
    <description />

    <!-- My repositories -->
    <repositories />

    <!-- Provide Offer -->
    <provide-offer />
  </div>
</template>

<script>
  // Functions
  import { ref, watch } from 'vue';
  import { useLayoutState } from '@/hooks/use-layout-state';
  // Components
  import Tabs from '@/components/tabs.vue';
  import Tab from '@/components/tab.vue';
  import Description from './description.vue';
  import Repositories from './repositories.vue';
  import ProvideOffer from './provide-offer.vue';
  // Resources
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'resume-page',
    components: {
      Tabs,
      Tab,
      Description,
      Repositories,
      ProvideOffer,
    },
    setup() {
      // Current tab
      const currentTab = ref();
      function onTabUpdate(current) {
        currentTab.value = current;
      }

      // Shared layout state, stores scrollTop and stuffs.
      const layoutState = useLayoutState();

      // replacement content,
      // replace header default content if page content was covered.
      const replaceHeaderContent = ref();
      const isReplaceHeader = ref(false);
      watch(() => layoutState.scrollTop, () => {
        const content = replaceHeaderContent.value;
        if (!content) isReplaceHeader.value = false;
        const rect = content.getBoundingClientRect();
        isReplaceHeader.value = rect.y + rect.height < 70;
      });

      return {
        currentTab,
        onTabUpdate,

        replaceHeaderContent,
        isReplaceHeader,

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