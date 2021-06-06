<template>
  <div class="py-2.5 relative">
    <!-- Timeline, only shows when the screen size is larger than or equals to `lg` -->
    <timeline-node
      class="mr-7 hidden lg:block"
      :is-first="isFirst"
      :is-last="isLast"
      :time="localeDateTime(row.createTime)"
    />

    <!-- Card -->
    <ripple class="article-item" @click="onClick">
      <div class="text-xl text-positive-800 font-bold truncate md:text-2xl">
        {{ row.title }}
      </div>
      <div class="mt-3 text-base text-positive-600 font-medium overflow-hidden line-clamp">
        {{ row.content }}
      </div>
      <div class="flex flex-wrap pt-2">
        <tag v-for="tag in row.tags" :key="tag">{{ tag }}</tag>
      </div>
    </ripple>
  </div>
</template>

<script>
  // Functions
  import { localeDateTime } from '@/assets/util/time';
  import { useListItem } from '@/hooks/use-list';
  // Components
  import Tag from '@/components/tag.vue';
  import Ripple from '@/components/ripple.vue';
  import TimelineNode from '@/components/timeline-node.vue';

  export default {
    name: 'article-list-item',
    components: {
      Tag,
      Ripple,
      TimelineNode,
    },
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
    },
    emits: [ 'click' ],
    setup(props, { emit }) {
      const {
        data: row,
        isFirst, isLast, isExist,
      } = useListItem({
        row: () => props.data,
      });

      function onClick() {
        emit('click');
      }

      return {
        row,
        isFirst,
        isLast,
        isExist,
        onClick,
        localeDateTime,
      };
    },
  };
</script>

<style lang="less" scoped>
  .line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .article-item {
    @apply body box-border rounded-lg select-none cursor-pointer transition duration-300;
    @apply border border-negative-700 hover:border-negative-500 bg-negative-900;
    @apply active:opacity-80;
  }
</style>
