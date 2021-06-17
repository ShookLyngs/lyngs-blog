<template>
  <div class="py-2.5 relative">
    <!-- Timeline, only shows when the screen size is larger than or equals to `lg` -->
    <timeline-node
      class="mr-7 hidden lg:block"
      :is-first="isFirst"
      :is-last="isLast"
      :title="localeDateTime(row.createTime)"
    />

    <!-- Card -->
    <ripple class="article-item" @click="onClick">
      <div class="flex">
        <div class="flex-auto">
          <div class="text-lg md:text-xl text-positive-900 font-bold">
            {{ row.title }}
          </div>
          <div class="mt-1 text-xm md:text-sm text-positive-300 font-medium overflow-hidden line-clamp">
            {{ row.subtitle }}
          </div>
          <div class="inline-flex flex-wrap pt-2">
            <tag v-for="tag in row.tags" :key="tag">{{ tag }}</tag>
          </div>
        </div>

        <div class="hidden flex-static md:flex flex-col w-1/3 md:w-[25%] md:ml-4" v-if="row.image">
          <imager
            transition
            background
            class="w-full flex-auto rounded overflow-hidden"
            :src="row.image"
          />
        </div>
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
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .article-item {
    @apply body box-border rounded-lg select-none cursor-pointer transition duration-300;
    @apply border border-negative-700 bg-negative-900;
    @apply hover:opacity-80;
  }
</style>
