<template>
  <div class="py-2.5">
    <div class="scale-card relative rounded-xl border border-negative-700 bg-negative-900 body">
      <timeline-node></timeline-node>
      <div class="text-xl text-positive-800 font-bold truncate md:text-2xl">
        {{ row.title }}
      </div>
      <div class="mt-3 text-base text-positive-600 font-medium overflow-hidden line-clamp">
        {{ row.content }}
      </div>
      <div class="flex flex-wrap pt-2">
        <tag v-for="tag in row.tags" :key="tag">{{ tag }}</tag>
      </div>
      <div>isExist: {{ isExist }}</div>
      <div>isFirst: {{ isFirst }}</div>
      <div>isLast: {{ isLast }}</div>
    </div>
  </div>
</template>

<script>
  // Functions
  import { useListItem } from "./use-list";
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
        default: () => ({})
      },
    },
    setup(props) {
      const {
        data: row,
        isFirst,
        isLast,
        isExist
      } = useListItem(() => props.data);

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