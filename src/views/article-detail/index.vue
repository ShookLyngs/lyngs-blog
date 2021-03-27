<template>
  <container>
    <!-- banner -->
    <div class="relative">
      <div
        class="background bg-cover bg-center bg-negative-700 w-full md:breaker-content"
        :style="{ backgroundImage: `url(${detailImage})` }"
      />
    </div>

    <!-- content -->
    <div class="relative body-x mt-36 rounded-lg border border-negative-700 bg-negative-900">
      <!-- title -->
      <div class="body-top text-xl text-positive-800 font-bold md:text-2xl">
        你可以说我嫉妒清华大学博士，我自己是井底之蛙，我被阴谋论洗脑，我自己不行不代表别人不行
      </div>

      <!-- tags -->
      <div class="body-y flex flex-wrap pt-2 select-none">
        <tag v-for="tag in data.tags" :key="tag">{{ tag }}</tag>
      </div>

      <!-- content -->
      <div class="body-y text-base text-positive-600 font-medium" v-html="data.content" />

      <!-- taken block, donate -->
      <empty class="mt-20" />

      <!-- userinfo, and actions -->
      <div class="mt-20 body-y flex justify-between bg-negative-900">
        <div class="flex items-center">
          <imager class="flex-static w-10 h-10 rounded-full overflow-hidden select-none" :src="avatarImage" />
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
    <div class="relative mt-5 rounded-lg border border-negative-700 bg-negative-900">
      <div class="body flex items-center select-none">
        <div>评论</div>
        <tag no-gap padding="sm" class="ml-2">23</tag>
      </div>

      <!--<div class="body-x">
        <textarea class="w-full p-4 rounded-lg outline-none box-border border-3 border-negative-600" name="reply" cols="20" ></textarea>
      </div>-->

      <div>
        <comment v-for="item in 100" :key="item">{{ item }}</comment>
      </div>
    </div>

  </container>
</template>

<script>
  // Functions
  import { ref } from 'vue';
  import { parse } from 'markdown';
  // Components
  import Tag from '@/components/tag.vue';
  import Comment from '@/components/comment.vue';
  // Resources
  import detailImage from '@/assets/images/article/detail.jpg';
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'article-detail',
    components: {
      Tag,
      Comment,
    },
    setup() {
      const data = ref({
        tags: [ '前端开发', 'Vue3' ],
        content: parse(`
# Hello world
## secondary text
### third text
#### 4th text
##### 5th text

something darker for *us*

something darker for *us*

something darker for *us*

something darker for *us*

something darker for *us*

something darker for *us*

something darker for *us*

something darker for *us*

something darker for *us*

something darker for *us*

something darker for *us*

something darker for *us*

something darker for *us*
        `),
      });

      return {
        data,
        detailImage,
        avatarImage,
      };
    },
  };
</script>

<style scoped>
  .background {
    @apply absolute top-0 overflow-hidden rounded-2xl;
    left: 50%;
    height: 260px;
    transform: translate3d(-50%, 0, 0);
  }
</style>