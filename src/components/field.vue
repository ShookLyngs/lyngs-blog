<template>
  <div class="field px-3.5 py-3 rounded-lg outline-none box-border border-3 border-negative-700" @click="focus">
    <div class="text-xl font-bold text-positive-800 select-none" v-if="label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <slot />
  </div>
</template>

<script>
  import { useField } from '@/hooks/use-form';

  export default {
    name: 'field',
    props: {
      label: {
        type: String,
        default: '',
      },
    },
    setup() {
      const { execute } = useField();
      function focus() {
        execute('focus');
      }

      return {
        focus,
      };
    },
  };
</script>

<style lang="less" scoped>
  .field {
    & + & {
      @apply mt-5;
    }
  }
</style>