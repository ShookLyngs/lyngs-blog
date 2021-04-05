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
  import { computed, ref } from 'vue';

  function getCursor(cursor) {
    switch (cursor) {
      case 'auto':
        return 'cursor-auto';
      case 'default':
        return 'cursor-default';
      case 'text':
        return 'cursor-text';
      case 'pointer':
        return 'cursor-pointer';
      case 'not-allowed':
        return 'cursor-not-allowed';
      default:
        return '';
    }
  }

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

      const fieldState = useField({
        onFocus,
        onBlur,
      });
      function focus() {
        fieldState.execute('focus');
      }

      const wrapperClass = computed(() => {
        const classes = [];
        if (focusing.value) {
          classes.push('is-focus');
        }
        if (fieldState.contentState) {
          const { props: contentProps, cursor } = fieldState.contentState;
          if (contentProps.disabled) {
            classes.push('is-disabled');
          }
          if (cursor && !contentProps.disabled) {
            classes.push(getCursor(cursor));
          }
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
    @apply box-border border-3 border-negative-700;

    & + & {
      @apply mt-5;
    }
    &:not(.is-disabled) {
      @apply active:border-theme-500;

      &.is-focus {
        @apply border-theme-500;
      }
    }
    &.is-disabled {
      @apply bg-negative-800;
    }
  }
</style>