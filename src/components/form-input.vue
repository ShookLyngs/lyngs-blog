<template>
  <div class="form-input w-full">
    <input
      ref="input"
      class="w-full focus:outline-none"
      v-bind="$attrs"
      @click.prevent
      @focus="onFocus"
      @blur="onBlur"
    >
  </div>
</template>

<script>
  import { ref } from 'vue';
  import { useFieldContent } from '@/hooks/use-form';

  export default {
    name: 'form-input',
    setup() {
      const input = ref(null);
      function focus() {
        if (input.value) input.value.focus();
      }
      function blur() {
        if (input.value) input.value.blur();
      }

      const { fieldState } = useFieldContent({
        ref: input,
        focus,
        blur,
      });

      const { trigger } = fieldState;
      function onFocus() {
        trigger('onFocus');
      }
      function onBlur() {
        trigger('onBlur');
      }

      return {
        input,
        focus,
        blur,
        onFocus,
        onBlur,
      };
    },
  };
</script>

<style lang="less" scoped>
  .form-input {

  }
</style>