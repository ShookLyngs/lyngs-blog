<template>
  <div
    class="divider"
    :class="[
      `is-padding-${padding}`,
      horizontal ? 'is-horizontal' : '',
    ]"
  >
    <div
      class="divider__line"
      :class="[ color ]"
    />
  </div>
</template>

<script>
  export default {
    name: 'divider',
    props: {
      horizontal: {
        type: Boolean,
        default: false,
      },
      padding: {
        type: String,
        default: 'md',
        validator: value => [ 'sm', 'md', 'lg' ].includes(value),
      },
      color: {
        type: String,
        default: 'bg-negative-700',
      },
    },
    setup() {

    },
  };
</script>

<style lang="less" scoped>
  .divider {
    @apply w-full flex justify-center items-center flex-static;

    &__line {
      height: 2px;
      width: 33.3333%;
    }

    // Vertical divider
    &.is-padding-sm {
      @apply py-6;
    }
    &.is-padding-md {
      @apply py-8;
    }
    &.is-padding-lg {
      @apply py-14;
    }

    // Horizontal divider
    &.is-horizontal {
      @apply inline-flex h-full;
      width: initial;

      &.is-padding-sm {
        @apply px-4 py-0;
      }
      &.is-padding-md {
        @apply px-8 py-0;
      }
      &.is-padding-lg {
        @apply px-14 py-0;
      }

      .divider__line {
        width: 2px;
        height: 33.3333%;
      }
    }
  }
</style>