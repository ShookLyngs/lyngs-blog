<template>
  <!-- LOGO -->
  <div class="py-3 flex justify-center md:hidden">
    <router-link to="/">
      <img class="h-12 select-none" src="@/assets/images/logo.svg" alt="logo">
    </router-link>
  </div>
  <header class="header z-30 sticky top-0 left-0 right-0">
    <div class="px-3.5 flex w-full md:px-0 md:content">
      <!-- LOGO -->
      <div
        class="hidden flex-auto md:flex flex justify-center md:justify-start md:md-0"
      >
        <router-link to="/">
          <img
            class="h-12 select-none"
            src="@/assets/images/logo.svg"
            alt="logo"
          >
        </router-link>
      </div>

      <!-- Navigation -->
      <div
        class="select-none flex-auto flex items-center justify-between md:justify-end"
      >
        <div class="flex">
          <tabs :current="currentTab" @upadte="onTabUpdate">
            <router-link to="/articles">
              <tab value="articles" :values="['articles', 'article-view', 'article-post']">文章</tab>
            </router-link>
            <router-link to="/memos">
              <tab value="memos">想法</tab>
            </router-link>
            <router-link to="/tools">
              <tab value="tools">工具</tab>
            </router-link>
          </tabs>
        </div>
        <div class="flex">
          <div class="flex-static ml-5">
            <collapse
              direction="horizontal"
              show-class="opacity-100"
              hidden-class="opacity-0"
              :show="isShowHeaderActions"
            >
              <div class="w-max" id="header-actions" />
            </collapse>
          </div>
          <imager
            background
            :lazy="false"
            :transition="false"
            class="rounded-full overflow-hidden flex-static ml-2.5 w-10 h-10 text-positive-500 bg-negative-500"
            :src="avatarImage"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  // Functions
  import { ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import { useLayoutState } from '@/hooks/use-layout-state';
  // Components
  import Tabs from '@/components/tabs.vue';
  import Tab from '@/components/tab.vue';
  import Collapse from '@/components/collapse';
  // Resources
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'layout-header',
    components: {
      Tabs,
      Tab,
      Collapse,
    },
    setup() {
      // Current tab
      const currentTab = ref(null);
      function onTabUpdate(current) {
        currentTab.value = current;
      }

      // Watch changes of current tab
      const route = useRoute();
      watchEffect(() => (currentTab.value = route.name));

      // Show header parts
      const isShowHeaderActions = ref(true);

      // Add properties into layout state
      const layoutState = useLayoutState();
      layoutState.currentTab = currentTab;
      layoutState.isShowHeaderActions = isShowHeaderActions;

      return {
        currentTab,
        onTabUpdate,
        isShowHeaderActions,

        avatarImage,
      };
    },
  };
</script>

<style lang="less" scoped>
  .header {
    @apply py-3 flex-static flex flex-col justify-center items-center;
    @apply bg-mask-600;
    min-height: 5rem;
    backdrop-filter: saturate(180%) blur(20px);
  }
</style>
