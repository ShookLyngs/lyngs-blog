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

    <div class="rounded-lg border border-negative-700 bg-negative-900">
      <!-- Main image of the article -->
      <imager
        view
        background
        :src="detailImage"
        class="rounded-t-lg background bg-cover bg-center bg-negative-700 w-full"
      />

      <!-- Title -->
      <div class="body-x pt-8 font-bold text-xl md:text-3xl text-positive-900">
        细谈 Resize Observer / Intersection API 与他们所带来的 Bugs
      </div>

      <!-- tags -->
      <div class="body-x body-bottom flex flex-wrap pt-2 select-none">
        <tag v-for="tag in data.tags" :key="tag">{{ tag }}</tag>
      </div>

      <!-- Userinfo -->
      <div class="body">
        <div class="px-4 py-2.5 md:py-4 flex justify-between rounded-md border border-negative-600 bg-negative-800">
          <div class="flex items-center">
            <imager
              transition
              class="flex-static w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden select-none bg-negative-700"
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
    </div>

    <!-- Divider -->
    <div class="h-16 flex justify-center items-center">
      <div class="h-[2px] w-1/3 bg-negative-700" />
    </div>

    <div class="relative body-x rounded-lg border border-negative-700 bg-negative-900">
      <!-- Content -->
      <markdown-renderer
        class="py-10"
        :content="data.content"
      />

      <!-- Placeholder, for donate block -->
      <empty class="mt-20" />

      <!-- Userinfo, and actions -->
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


      <!-- Comment list -->
      <lazy-group>
        <lazy v-for="(item, index) in 10" :key="item">
          <comment
            :is-first="index === 0"
            :is-last="index === 9"
          />
        </lazy>
      </lazy-group>

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
  import LazyGroup from '@/components/lazy-group.vue';
  import Lazy from '@/components/lazy.vue';
  // Resources
  import detailImage from '@/assets/images/article/detail.jpg';
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'article-detail',
    components: {
      Tag,
      Comment,
      MarkdownRenderer,
      LazyGroup,
      Lazy,
    },
    setup() {
      const data = ref({
        tags: ['前端开发', 'Vue3'],
        content: `
# What is \`LyngsBlog\` ?
The project is currently in a part-time-development stage.

It's targeting to be a \`simple looked\` blog website.
You can take a look at the designs of the project below.

# Designs
![articles](documentation/images/articles.png "Articles")
<p style="text-align: center;">Articles</p>

![article-detail](documentation/images/article-detail.png "Article Detail")
<p style="text-align: center;">Article Detail</p>

# Goals
- [x] Designs
- [ ] Articles
  - [x] ListItem
  - [x] Pager
  - [x] Locale time
  - [ ] Fetch data
- [ ] Article detail
  - [x] Markdown to HTML
  - [x] Detail basics
  - [x] Markdown renderer
  - [x] Like and dislike
  - [x] Manage article dialog
  - [ ] Confirm dialog
  - [ ] Donation dialog
  - [ ] Fetch data
- [ ] Post Article
  - [ ] Upload banner
  - [ ] Markdown editor
- [ ] Memos
  - [x] List item
  - [x] Reach bottom load more
  - [ ] Manage memo dialog
- [ ] Memo detail
  - [ ] Memo detail dialog
- [ ] Post Memo dialog
  - [ ] Upload images
  - [ ] Topic edit?
- [ ] Comments
  - [ ] List item
  - [ ] Reply
  - [ ] Manage Comment dialog
- [ ] Submit Comment dialog

# Bugs

- [ ] Vite
  - Vite did not pass env variable to postcss in development mode.
    This can be solved by using \`cross-env\` to ensure \`NODE_ENV=development\` in package.json -> scripts.
    Follow: https://github.com/vitejs/vite/commit/fa8574921195dd03b539c150a2ae5f97121a0aea
- [ ] Vue
  - Component/scrollbar, mergedWrapStyle is not update normally.
    When switching mobile and PC mode in Chrome, the scrollbar margin changed in computed value, yet the actual DOM changed nothing.
    It gets fixed when other stuff updates.
        `,
      });

      // Layout shared state
      // it shares scroll data and stuff
      const layoutState = useLayoutState();
      const scrollTop = computed(() => layoutState.scrollTop);

      // Post button
      // When the post button has been scrolled out of the screen,
      // the button shows in header
      const postButton = ref();
      const isShowPostButton = computed(() => {
        if (postButton.value && scrollTop.value) {
          const rect = postButton.value.$el.getBoundingClientRect();
          return rect.top < (80 - rect.height);
        } else {
          return false;
        }
      });

      const infoStyle = computed(() => {
        return {
          height: `${Math.max(256 - scrollTop.value, 0)}px`,
        };
      });

      return {
        // Article content
        data,

        // Header post button
        postButton,
        isShowPostButton,

        //
        infoStyle,

        // Resources
        detailImage,
        avatarImage,
      };
    },
  };
</script>

<style lang="less" scoped>
  .background {
    @apply h-64 overflow-hidden bg-negative-600;
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
