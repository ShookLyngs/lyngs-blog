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

          <div class="mt-5 flex flex-wrap">
            <div class="image" :class="`image--${row.images.length}`" v-for="image in row.images" :key="image">
              <div class="image__content">
                <imager background :src="image" />
              </div>
            </div>
          </div>

          <div class="flex mt-8">
            <plain-button icon="icon-reply" text="16" class="text-positive-500 bg-negative-700" />
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

  .image {
    @apply mr-1 mb-1;

    &--1 {
      width: 100%;
    }
    &--2,
    &--4 {
      width: calc(50% - theme('spacing[1]'));
    }
    &--3,
    &--5,
    &--6,
    &--9 {
      width: calc(33.33% - theme('spacing[1]'));
    }
    &--7,
    &--8 {
      width: calc(25% - theme('spacing[1]'));
    }

    &:last-child {
      @apply mr-0;
    }
    .image__content {
      @apply relative rounded overflow-hidden text-xl md:text-2xl text-positive-200 bg-negative-600;
      padding-top: 100%;

      .imager {
        @apply absolute left-0 top-0 w-full h-full;
      }
    }
  }
</style>