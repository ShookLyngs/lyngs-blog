<template>
  <div class="article-comment flex body">
    <div class="flex-static w-7 h-7 select-none rounded-full overflow-hidden">
      <imager class="object-fit" :src="avatarImage" />
    </div>
    <div class="flex-auto ml-2">
      <div class="flex justify-between h-10">
        <div>
          <div class="select-none text-sm font-semibold">Shook</div>
          <div class="select-none text-xs text-positive-100">昨天 22:44</div>
        </div>
      </div>
      <div class="mt-1">
        随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。
      </div>
      <div class="flex mt-1">
        <div class="flex items-center">
          <icon class="text-xl" name="icon-setting" />
          <text-button type="gray" padding="sm">认可</text-button>
        </div>
        <div class="flex items-center ml-4">
          <icon class="text-xl" name="icon-setting" />
          <text-button type="gray" padding="sm">反对</text-button>
        </div>
        <div class="flex items-center ml-4">
          <icon class="text-xl" name="icon-setting" />
          <text-button type="gray" padding="sm">回复</text-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'comment',
    setup() {
      return {
        avatarImage,
      };
    },
  };
</script>

<style lang="less" scoped>
  .article-comment {

    @media (min-width: theme('screens.md')) {
      .actions {
        display: none;
      }
      &:hover {
        @apply bg-negative-800;
        .actions {
          display: flex;
        }
      }
    }
  }
</style>