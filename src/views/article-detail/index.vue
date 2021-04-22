<template>
  <container>
    <!-- post reply button, teleport to the header layout -->
    <teleport to="#header-actions">
      <transition name="fade-fast">
        <border-button
          border-width="md"
          style="min-width: 110px"
          text="发表评论"
          v-if="isShowPostButton"
        />
      </transition>
    </teleport>

    <!-- banner -->
    <div class="relative">
      <imager
        background
        :src="detailImage"
        class="background bg-cover bg-center bg-negative-700 w-full md:breaker-content"
      />
    </div>

    <!-- content -->
    <div
      class="relative body-x mt-36 rounded-lg border border-negative-700 bg-negative-900"
    >
      <!-- title -->
      <div class="pt-7 text-positive-800 font-bold text-2xl">
        赵文昊和我，我和今天，明天和未来
      </div>

      <!-- tags -->
      <div class="body-y flex flex-wrap pt-2 select-none">
        <tag v-for="tag in data.tags" :key="tag">{{ tag }}</tag>
      </div>

      <!-- content -->
      <markdown-renderer
        class="body-y"
        :content="data.content"
      />

      <!-- taken block, donate -->
      <empty class="mt-20" />

      <!-- userinfo, and actions -->
      <div class="mt-20 mb-6 body-y px-4 flex justify-between rounded-md bg-negative-800">
        <div class="flex items-center">
          <imager
            transition
            class="flex-static w-10 h-10 rounded-full overflow-hidden select-none bg-negative-700"
            :src="avatarImage"
          />
          <div class="ml-3 select-none">
            <div class="text-sm font-semibold">Shook</div>
            <div class="text-xs text-positive-100">发布于 昨天 xx:xx</div>
          </div>
        </div>

        <div class="flex items-center">
          <text-button type="gray" padding="sm">
            <icon class="text-2xl" name="icon-setting" />
          </text-button>
        </div>
      </div>
    </div>

    <!-- comment -->
    <div
      class="relative mt-5 rounded-lg border border-negative-700 bg-negative-900"
    >
      <div
        class="body flex items-center justify-between select-none rounded-lg bg-negative-900"
      >
        <div class="flex items-center">
          <div>评论</div>
          <tag no-gap padding="sm" class="ml-1.5">23</tag>
        </div>

        <border-button
          ref="postButton"
          padding="sm"
          height="sm"
          text="发表评论"
        />
      </div>

      <!--<div class="body sticky top-0">
        <textarea class="w-full p-4 rounded-lg outline-none box-border border-3 border-negative-500" name="reply" cols="20" ></textarea>
      </div>-->

      <comment
        v-for="(item, index) in 10"
        :key="item"
        :is-first="index === 0"
        :is-last="index === 9"
      />
      <empty class="my-20" />
    </div>
  </container>
</template>

<script>
  // Functions
  import { ref, computed } from 'vue';
  import { useLayoutState } from '@/hooks/use-layout-state';
  // Components
  import Tag from '@/components/tag.vue';
  import Comment from '@/components/comment.vue';
  import MarkdownRenderer from '@/components/markdown-renderer';
  // Resources
  import detailImage from '@/assets/images/article/detail.jpg';
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'article-detail',
    components: {
      Tag,
      Comment,
      MarkdownRenderer,
    },
    setup() {
      const data = ref({
        tags: ['前端开发', 'Vue3'],
        content: `
# 起源
## 起源2
### 起源3
#### 起源4
##### 起源5
###### 起源6

![GitHub Logo](https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg)

起初，我们只是因为一些小事而聚到一起，大家都只是孩子，我们一起用一款叫做 \`RPG Maker XP\` 的软件来制作游戏。

赵文昊的出现，打破了僵局。

- [ ] Something
- [ ] Someting else
  - [x] eee

\`\`\`javascript
const element = ref(false);
watchEffect(() => {
  if (element.value) {
    update();
  }
});
\`\`\`


        `,
      });

      // Post button
      // When the post button has been scrolled out of the screen,
      // the button shows in header
      const postButton = ref();
      const layoutState = useLayoutState();
      const isShowPostButton = computed(() => {
        if (postButton.value && layoutState.scrollTop) {
          const rect = postButton.value.$el.getBoundingClientRect();
          return rect.top < (80 - rect.height);
        } else {
          return false;
        }
      });

      return {
        // Article content
        data,

        // Header post button
        postButton,
        isShowPostButton,

        // Resources
        detailImage,
        avatarImage,
      };
    },
  };
</script>

<style lang="less" scoped>
  .background {
    @apply absolute top-0 h-64 overflow-hidden rounded-2xl bg-negative-600;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }

  .post-button {
    &--show {
      @apply transform scale-100 opacity-100;
    }
    &--hidden {
      @apply transform scale-50 opacity-0;
    }
  }
</style>
