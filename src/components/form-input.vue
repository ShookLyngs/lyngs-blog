<template>
  <div class="form-input w-full">
    <input
      ref="input"
      class="w-full focus:outline-none"
      v-bind="$attrs"
      @click.prevent
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
      function onBlur() {
        /**/
      }

      useFieldContent({
        ref: input,
        focus,
        blur,
      });

      return {
        input,
        focus,
        blur,
        onBlur,
      };
    },
  };
</script>

<style lang="less" scoped>
  .form-input {

  }
</style>