<template>
  <!-- LOGO -->
  <div class="py-3 flex justify-center md:hidden">
    <router-link to="/">
      <img
        class="h-12 select-none"
        src="@/assets/images/logo.svg"
        alt="logo"
      >
    </router-link>
  </div>
  <header class="header z-10 sticky top-0 left-0 right-0">
    <div class="body-x flex w-full md:px-0 md:content">
      <!-- LOGO -->
      <div class="hidden flex-auto md:flex flex justify-center md:justify-start md:md-0">
        <router-link to="/">
          <img
            class="h-12 select-none"
            src="@/assets/images/logo.svg"
            alt="logo"
          >
        </router-link>
      </div>

      <!-- Navigation -->
      <div class="select-none flex-auto flex items-center justify-between md:justify-end">
        <div class="flex">
          <tabs :current="currentTab" @upadte="onTabUpdate">
            <tab value="articles">
              <router-link to="/articles">文章</router-link>
            </tab>
            <tab value="memos">
              <router-link to="/memos">想法</router-link>
            </tab>
          </tabs>
        </div>
        <div class="flex">
          <div class="flex-static ml-5">
            <border-button>发布文章</border-button>
          </div>
          <div class="rounded-full overflow-hidden flex-static ml-2.5 w-10 h-10 bg-gray-100">
            <img
              class="w-full object-fit"
              src="@/assets/images/avatar.jpg"
              alt="avatar"
            >
          </div>
        </div>
      </div>
    </div>

  </header>
</template>

<script>
  // Functions
  import { ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  // Components
  import Tabs from '@/components/tabs.vue';
  import Tab from '@/components/tab.vue';

  export default {
    name: 'layout-header',
    components: {
      Tabs,
      Tab,
    },
    setup() {
      const currentTab = ref(null);
      function onTabUpdate(current) {
        currentTab.value = current;
      }

      const route = useRoute();
      watchEffect(() => currentTab.value = route.name);

      return {
        currentTab,
        onTabUpdate
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