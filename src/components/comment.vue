<template>
  <div class="article-comment flex body relative">
    <div class="absolute top-0 w-7 h-5" v-if="!isFirst">
      <div class="line w-full h-full" />
    </div>
    <div class="line absolute top-0 w-7 top-5 bottom-0" v-if="!isLast">
      <div class="line w-full h-full" />
    </div>

    <div class="flex-static w-7 h-7 select-none rounded-full overflow-hidden">
      <imager class="object-fit" :src="avatarImage" />
    </div>
    <div class="relative flex-auto ml-2">
      <div class="flex justify-between items-center h-10">
        <div>
          <div class="select-none text-sm font-semibold">
            <span>Shook</span>
            <span class="ml-3">
              <span class="text-positive-400">回复</span>
              <span class="ml-3 text-theme-600">Shook</span>
            </span>
          </div>
          <div class="mt-0.5 select-none text-xs text-positive-100">
            昨天 22:44
          </div>
        </div>
      </div>
      <div class="mt-1">
        <markdown-renderer :content="data.content" />
      </div>
      <div class="flex mt-2">
        <plain-button
          icon="icon-yes-fill"
          normal-class="text-positive-400 bg-negative-700"
          active-class="text-negative-700 bg-theme-500"
          text="12"
          :active="like"
          @click="like = !like"
        />
        <plain-button
          icon="icon-no-fill"
          class="ml-2"
          normal-class="text-positive-400 bg-negative-700"
          active-class="text-negative-700 bg-error-500"
          text="9"
          :active="dislike"
          @click="dislike = !dislike"
        />
        <plain-button
          icon="icon-reply"
          class="action-button ml-6"
          normal-class="text-positive-500 bg-negative-700"
          text="回复"
        />
      </div>
    </div>
  </div>
</template>

<script>
  // Functions
  import { ref } from 'vue';
  // Components
  import PlainButton from '@/components/plain-button.vue';
  import MarkdownRenderer from '@/components/markdown-renderer';
  // Resources
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'comment',
    components: {
      PlainButton,
      MarkdownRenderer,
    },
    props: {
      isFirst: {
        type: Boolean,
        default: false,
      },
      isLast: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const data = ref({
        content: '随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。',
      });

      const like = ref(false);
      const dislike = ref(false);

      return {
        data,

        like,
        dislike,
        avatarImage,
      };
    },
  };
</script>

<style lang="less" scoped>
  .article-comment {
    @apply transition duration-300;

    @media (min-width: theme('screens.md')) {
      .action-button {
        @apply transition duration-300;
      }
      &:not(:hover) {
        .action-button {
          opacity: 0;
        }
      }
    }
  }

  .line {
    @apply flex justify-center;

    &::before {
      @apply absolute w-px h-full bg-negative-700;
      content: '';
    }
  }
</style>
