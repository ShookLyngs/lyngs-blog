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
      <div class="flex mt-3">
        <like-actions
          :mode="data.myAttitude"
          @click="onClickLikeActions"
        />

        <div class="action-button transition duration-300 px-3 mr-2 relative flex justify-center items-center">
          <div class="w-px h-1/2 bg-negative-500" />
        </div>

        <plain-button
          icon="icon-reply"
          class="action-button"
          normal-class="text-positive-500 bg-negative-700"
        />
        <div class="flex" @mouseleave="onLeaveMoreAction">
          <popper
            ref="moreAction"
            placement="bottom"
            trigger="manual"
            :offset="0"
          >
            <plain-button
              icon="icon-more"
              class="action-button ml-2"
              normal-class="text-positive-500 bg-negative-700"
              @click="onEnterMoreAction"
            />
            <template #content>
              <div class="relative w-36 z-10 px-2">
                <ul>
                  <li class="rounded flex items-center px-2 py-2.5 cursor-pointer transition select-none font-medium hover:text-theme-600 hover:bg-negative-700">
                    <icon class="text-sm" name="icon-no" />
                    <span class="ml-2">禁言</span>
                  </li>
                  <li class="rounded flex items-center px-2 py-2.5 cursor-pointer transition select-none font-medium hover:text-theme-600 hover:bg-negative-700">
                    <icon class="text-sm" name="icon-delete" />
                    <span class="ml-2">删除</span>
                  </li>
                </ul>
              </div>
            </template>
          </popper>
        </div>
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
  import LikeActions from '@/components/like-actions.vue';
  // Resources
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'comment',
    components: {
      PlainButton,
      MarkdownRenderer,
      LikeActions,
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
        userId: '1',
        username: 'Shook',
        replyUserId: '2',
        replyUsername: 'Oral',
        myAttitude: '',
        createTime: '2021-04-24 12:03',
        content: '随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。',
      });

      function onClickLikeActions(attitude) {
        data.value.myAttitude = attitude;
      }

      const moreAction = ref();
      function onEnterMoreAction() {
        if (moreAction.value) {
          moreAction.value.setPopperVisible(true);
        }
      }
      function onLeaveMoreAction() {
        if (moreAction.value) {
          moreAction.value.setPopperVisible(false);
        }
      }


      return {
        data,
        avatarImage,

        moreAction,
        onEnterMoreAction,
        onLeaveMoreAction,
        onClickLikeActions,
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
