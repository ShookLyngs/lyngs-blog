<template>
  <div class="py-3 relative">
    <div class="absolute top-0 w-8 md:w-10 h-3" v-if="!isFirst">
      <div class="line w-full h-full" />
    </div>
    <div class="line absolute top-0 w-8 md:w-10 top-5 bottom-0" v-if="!isLast">
      <div class="line w-full h-full" />
    </div>

    <div class="flex">
      <div class="flex items-start">
        <div class="flex-static w-8 h-8 md:w-10 md:h-10 select-none rounded-full overflow-hidden">
          <imager class="object-fit" :src="row.avatar" />
        </div>
      </div>

      <div class="flex-auto pl-2 md:pl-4">
        <!--<div class="mb-1 text-sm font-semibold">ShookLyngs</div>-->
        <div class="mb-2 text-xs text-positive-400">发表于 {{ localeDateTime(row.createTime) }}</div>
        <div class="flex-auto body box-border rounded-tr-xl rounded-b-xl border border-negative-700 bg-negative-900">
          <div v-html="row.content" v-if="row.content" />
          <empty v-else />

          <div class="flex mt-8">
            <plain-button icon="icon-reply" text="16" class="bg-negative-700" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // Functions
  import { localeDateTime } from '@/assets/util/time';
  import { useListItem } from '@/hooks/use-list';
  // Components
  import PlainButton from '@/components/plain-button.vue';

  export default {
    name: 'memo-list-item',
    components: {
      PlainButton,
    },
    props: {
      data: {
        type: Object,
        default: () => ({}),
      },
    },
    setup(props) {
      const {
        data: row,
        isFirst, isLast, isExist,
      } = useListItem({
        row: () => props.data,
      });

      return {
        row,
        isFirst,
        isLast,
        isExist,

        localeDateTime,
      };
    },
  };
</script>

<style lang="less" scoped>
  .line {
    @apply flex justify-center;

    &::before {
      @apply absolute w-px h-full bg-negative-600;
      content: '';
    }
  }
</style>