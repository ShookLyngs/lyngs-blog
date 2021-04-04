<template>
  <div
    class="field px-3.5 py-3"
    :class="wrapperClass"
    @click="focus"
  >
    <div class="text-lg font-bold text-positive-800 select-none" v-if="label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <slot />
  </div>
</template>

<script>
  import { useField } from '@/hooks/use-form';
  import {computed, ref} from 'vue';

  export default {
    name: 'field',
    props: {
      label: {
        type: String,
        default: '',
      },
    },
    setup() {
      const focusing = ref(false);
      function onFocus() {
        focusing.value = true;
      }
      function onBlur() {
        focusing.value = false;
      }

      const { execute } = useField({
        onFocus,
        onBlur,
      });
      function focus() {
        execute('focus');
      }

      const wrapperClass = computed(() => {
        const classes = [];
        if (focusing.value) {
          classes.push('is-focus');
        }
        return classes;
      });

      return {
        focusing,
        focus,

        wrapperClass,
      };
    },
  };
</script>

<style lang="less" scoped>
  .field {
    @apply transition rounded-lg outline-none;
    @apply box-border border-3 border-negative-700 active:border-theme-500;

    & + & {
      @apply mt-5;
    }
    &.is-focus {
      @apply border-theme-500;
    }
  }
</style>