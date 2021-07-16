<template>
  <div>
    <!-- Introduce -->
    <container content-class="!pt-28 pb-20">
      <div class="flex items-center">
        <imager
          transition
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
    <!-- Will replace the default header when it scroll to be covered by the default -->
    <div ref="replaceHeaderContent" class="h-[70px] tabs">
      <teleport :disabled="!isReplaceHeader" to="#header-replace-slot">
        <container class="w-full" content-class="!pt-0">
          <div class="h-[70px] flex">
            <!-- Tabs -->
            <tabs class="flex flex-auto h-full" :current="currentTab" @upadte="updateTab">
              <tab value="description" @click="onClickTab('description')">关于</tab>
              <tab value="repositories" @click="onClickTab('repositories')">项目</tab>
              <tab value="offer" @click="onClickTab('offer')">联系</tab>
            </tabs>

            <!-- Actions -->
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
    <range-observer @update="onUpdateTab('description', $event)" @leave="onLeaveTab('description')">
      <description ref="descriptionRef" />
    </range-observer>

    <!-- My repositories -->
    <range-observer @update="onUpdateTab('repositories', $event)" @leave="onLeaveTab('repositories')">
      <repositories ref="repositoriesRef" />
    </range-observer>

    <!-- Provide Offer -->
    <range-observer @update="onUpdateTab('offer', $event)" @leave="onLeaveTab('offer')">
      <provide-offer ref="offerRef" />
    </range-observer>

  </div>
</template>

<script>
  // Functions
  import { onBeforeUnmount, ref } from 'vue';
  import { findDomNode } from '@/assets/util/dom';
  import { useScrollbar } from '@/components/scrollbar';
  // Components
  import Tabs from '@/components/tabs.vue';
  import Tab from '@/components/tab.vue';
  import RangeObserver from '@/components/range-observer.vue';
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
      RangeObserver,
      Description,
      Repositories,
      ProvideOffer,
    },
    setup() {
      // Secondary tabs.
      const currentTab = ref('description');
      function updateTab(current) {
        currentTab.value = current;
      }

      // Update active tab when scrolling.
      const tabRects = {};
      function onUpdateTab(name, { top }) {
        tabRects[name] = top;
        updateActiveTab();
      }
      function onLeaveTab(name) {
        tabRects[name] = Infinity;
        updateActiveTab();
      }
      function updateActiveTab() {
        let value = '';
        let rect = null;
        for (const key in tabRects) {
          const currentRect = tabRects[key];
          if (value === key) {
            rect = currentRect;
          } else if (rect === null || currentRect <= rect) {
            value = key;
            rect = currentRect;
          }
        }

        updateTab(value);
      }

      // Use global shared scrollbar state,
      // and takes out its useful functions.
      const { animateTo, onScroll, removeOnScroll, getWrapSizes } = useScrollbar();

      // When clicked the tab button,
      // check and scroll to the position where that tab's content at.
      const descriptionRef = ref();
      const repositoriesRef = ref();
      const offerRef = ref();
      function onClickTab(tabName) {
        let dom;
        switch (tabName) {
          case 'description':
            dom = findDomNode(descriptionRef.value);
            break;
          case 'repositories':
            dom = findDomNode(repositoriesRef.value);
            break;
          case 'offer':
            dom = findDomNode(offerRef.value);
            break;
        }

        if (dom) {
          const { scrollTop } = getWrapSizes();
          const { top } = dom.getBoundingClientRect();
          animateTo({ y: Math.ceil(scrollTop + top - 70) });
        }
      }

      // replacement content,
      // replace header default content if page content was covered.
      const replaceHeaderContent = ref();
      const isReplaceHeader = ref(false);
      function onWrapperScroll() {
        const content = replaceHeaderContent.value;
        if (!content) return (isReplaceHeader.value = false);

        const { bottom } = content.getBoundingClientRect();
        isReplaceHeader.value = bottom.toFixed(0) <= 70;
      }
      onScroll(onWrapperScroll);
      onBeforeUnmount(() => removeOnScroll(onWrapperScroll));

      return {
        currentTab,
        updateTab,
        onUpdateTab,
        onLeaveTab,

        descriptionRef,
        repositoriesRef,
        offerRef,
        onClickTab,

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