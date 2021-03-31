<template>
  <div class="py-2.5 relative">
    <!--
      Timeline,
      only shows when the screen size is larger than or equals to `lg`
    -->
    <timeline-node
      class="mr-7 hidden lg:block"
      :is-first="isFirst"
      :is-last="isLast"
      :time="row.createTime"
    />

    <!-- Card -->
    <div
      class="scale-card body box-border rounded-xl border border-negative-700 bg-negative-900"
    >
      <div class="text-xl text-positive-800 font-bold truncate md:text-2xl">
        {{ row.title }}
      </div>
      <div
        class="mt-3 text-base text-positive-600 font-medium overflow-hidden line-clamp"
      >
        {{ row.content }}
      </div>
      <div class="flex flex-wrap pt-2">
        <tag v-for="tag in row.tags" :key="tag">{{ tag }}</tag>
      </div>
    </div>
  </div>
</template>

<script>
  // Functions
  import { useListItem } from '@/hooks/use-list';
  // Components
  import Tag from '@/components/tag.vue';
  import TimelineNode from '@/components/timeline-node.vue';

  export default {
    name: 'article-list-item',
    components: {
      Tag,
      TimelineNode,
    },
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(props) {
      const { data: row, isFirst, isLast, isExist } = useListItem({
        row: () => props.data,
      });

      return {
        row,
        isFirst,
        isLast,
        isExist,
      };
    },
  };
</script>

<style scoped>
  .line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
</style>
