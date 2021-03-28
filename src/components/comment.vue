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
      <div class="flex justify-between h-10">
        <div>
          <div class="select-none text-sm font-semibold">Shook</div>
          <div class="select-none text-xs text-positive-100">昨天 22:44</div>
        </div>
      </div>
      <div class="mt-1">
        随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。
      </div>
      <div class="flex mt-2">
        <plain-button icon="icon-yes-fill" normal-class="text-success-600">12</plain-button>
        <plain-button icon="icon-no-fill" normal-class="text-error-600">9</plain-button>
        <plain-button icon="icon-reply" normal-class="text-positive-600">回复</plain-button>
      </div>
    </div>
  </div>
</template>

<script>
  // Components
  import PlainButton from '@/components/plain-button.vue';
  // Resources
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'comment',
    components: {
      PlainButton,
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
      // const lineStyle

      return {
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
        display: none;
      }
      &:hover {
        @apply bg-negative-800;
        .action-button {
          display: flex;
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