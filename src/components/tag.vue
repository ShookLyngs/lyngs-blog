<template>
  <div class="tag" :class="classes">
    <slot>{{ text }}</slot>
  </div>
</template>

<script>
  import { computed } from 'vue';

  export default {
    name: 'tag',
    props: {
      padding: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md'].includes(value),
      },
      noGap: {
        type: Boolean,
        default: false,
      },
      text: {
        type: [String, Number],
        default: '',
      },
    },
    setup(props) {
      const classes = computed(() => {
        const result = [];

        if (props.padding) {
          result.push(`w-${props.padding}`);
        }
        if (!props.noGap) {
          result.push('mr-2.5 mt-2');
        }

        return result;
      });

      return {
        classes,
      };
    },
  };
</script>

<style lang="less" scoped>
  .tag {
    @apply text-xs font-medium rounded;
    @apply text-positive-600 bg-negative-700;

    &.w-sm {
      padding: theme('spacing[0.5]') theme('spacing[2]');
    }
    &.w-md {
      padding: theme('spacing[1.5]') theme('spacing[3]');
    }
  }
</style>
