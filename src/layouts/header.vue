<template>
  <!-- Logo -->
  <div class="py-3 relative flex justify-center md:hidden">
    <div class="header__background" :style="backgroundStyle" />
    <router-link to="/">
      <img class="h-12 select-none" src="@/assets/images/logo.svg" alt="logo">
    </router-link>
  </div>

  <div class="header z-30 sticky top-0 left-0 right-0">
    <!-- Backdrop filter -->
    <div class="header__filter" />
    <!-- Background -->
    <div class="header__background" :style="backgroundStyle" />

    <!-- Main -->
    <div class="header__main" :class="mainContentClass">
      <div class="px-3.5 flex w-full h-full md:px-0 md:content">
        <!-- LOGO -->
        <div class="hidden md:flex flex items-center justify-center md:justify-start md:md-0 md:mr-6">
          <popper placement="left">
            <router-link to="/">
              <ripple type="interval" class="w-7 h-7 rounded-full transition duration-300 hover:opacity-80">
                <div class="w-full h-full rounded-full border-[7px] border-solid border-negative-600 bg-theme-400" />
              </ripple>
            </router-link>

            <template #content>
              <div class="inline-flex items-center body-x text-sm">回到首页</div>
            </template>
          </popper>
        </div>

        <tabs class="flex flex-auto h-full" :current="currentTab" @upadte="onTabUpdate">
          <tab to="/resume" value="resume">首页</tab>
          <tab to="/articles" value="articles" :values="['articles', 'article-view', 'article-post']">文章</tab>
          <tab to="/memos" value="memos">想法</tab>
        </tabs>

        <!-- Navigation -->
        <div class="select-none flex items-center justify-between md:justify-end">
          <div class="flex-static flex">
            <collapse
              class="flex-static ml-5"
              direction="horizontal"
              show-class="opacity-100"
              hidden-class="opacity-0"
              :show="isShowHeaderActions"
            >
              <div class="w-max" id="header-actions" />
            </collapse>
            <dropdown close-on-click class="flex-static" trigger="hover">
              <imager
                background
                :lazy="false"
                :transition="false"
                class="rounded-full overflow-hidden flex-static ml-2.5 w-9 h-9 text-positive-500 bg-negative-500"
                :src="avatarImage"
              />

              <template #dropdown>
                <dropdown-menu>
                  <dropdown-item>发布新的文章</dropdown-item>
                  <dropdown-item divided>我的信息</dropdown-item>
                  <dropdown-item>退出</dropdown-item>
                </dropdown-menu>
              </template>
            </dropdown>
          </div>
        </div>
      </div>
    </div>

    <teleport-detector
      class="header__main"
      id="header-replace-slot"
      @update="onReplaceTeleportUpdate"
    />
  </div>
</template>

<script>
  // Functions
  import { computed, ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import { useLayoutState } from '@/hooks/use-layout-state';
  // Components
  import Tabs from '@/components/tabs.vue';
  import Tab from '@/components/tab.vue';
  import Collapse from '@/components/collapse';
  import Ripple from '@/components/ripple.vue';
  import TeleportDetector from '@/components/teleport-detector.vue';
  import { Dropdown, DropdownMenu, DropdownItem } from '@/components/dropdown';
  // Resources
  import avatarImage from '@/assets/images/avatar.jpg';
  import articlesImage from '@/assets/images/article/articles.jpg';

  export default {
    name: 'layout-header',
    components: {
      Tabs,
      Tab,
      Collapse,
      Ripple,
      TeleportDetector,
      Dropdown,
      DropdownMenu,
      DropdownItem,
    },
    setup() {
      // Current tab.
      const currentTab = ref();
      function onTabUpdate(current) {
        currentTab.value = current;
      }

      // Watch changes of current tab.
      const route = useRoute();
      watchEffect(() => (currentTab.value = route.name));

      // Show header parts.
      const isShowHeaderActions = ref(false);

      // Add properties into layout state
      const layoutState = useLayoutState();
      layoutState.currentTab = currentTab;
      layoutState.isShowHeaderActions = isShowHeaderActions;

      // Background opacity, changes while page scrolls.
      const fadeDistance = 70;
      const backgroundStyle = computed(() => {
        const scrollTop = layoutState.scrollTop;
        return `opacity: ${scrollTop >= fadeDistance ? 0.9 : (scrollTop / fadeDistance) * 0.9}`;
      });

      // When scrollTop updated, check if can show the replacement content.
      const showReplacedContent = ref(false);
      const mainContentClass = computed(() => showReplacedContent.value ? 'is-slide-top' : '');
      function onReplaceTeleportUpdate(children) {
        showReplacedContent.value = children.length;
      }

      return {
        currentTab,
        onTabUpdate,
        isShowHeaderActions,
        backgroundStyle,

        showReplacedContent,
        mainContentClass,
        onReplaceTeleportUpdate,

        avatarImage,
        articlesImage,
      };
    },
  };
</script>

<style lang="less" scoped>
  .header {
    @apply flex-static flex flex-col overflow-hidden;
    height: 70px;
    box-shadow: 0 1px 0 theme('colors.negative-600');

    &__main {
      @apply h-full flex-static flex flex-col justify-center items-center;
      @apply transition-all duration-500;
      height: 70px;

      &.is-slide-top {
        @apply opacity-0;
        margin-top: -70px;
      }
    }
  }

  .header__filter {
    @apply absolute left-0 right-0 top-0 bottom-0;
    backdrop-filter: saturate(180%) blur(20px);
  }
  .header__background {
    @apply absolute left-0 right-0 top-0 bottom-0 bg-negative-900;
  }
</style>
