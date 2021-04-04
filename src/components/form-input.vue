<template>
  <div class="form-input mt-1 w-full flex items-end">
    <!-- Content Input, not a regular input -->
    <div
      contenteditable
      ref="input"
      class="flex-auto focus:outline-none"
      v-bind="$attrs"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @click.stop
    />

    <!-- Clear value button -->
    <transition name="fade-fast">
      <plain-button
        padding="sm"
        icon="icon-no"
        icon-class="text-base"
        v-if="`${actualValue}`.length"
        @click="clearValue"
      />
    </transition>
  </div>
</template>

<script>
  // Functions
  import { ref, watch } from 'vue';
  import { useFieldContent } from '@/hooks/use-form';
  // Components
  import PlainButton from '@/components/plain-button.vue';

  export default {
    name: 'form-input',
    components: {
      PlainButton,
    },
    props: {
      value: {
        type: [ String, Number ],
        default: '',
      },
    },
    emits: [ 'update:value' ],
    setup(props, { emit }) {
      const actualValue = ref(props.value);
      watch(() => props.value, () => {
        actualValue.value = props.value;
        updateInput();
      });
      watch(actualValue, () => emit('update:value', actualValue.value));
      function onInput({ target: { innerText } }) {
        actualValue.value = innerText;
      }
      function clearValue() {
        actualValue.value = '';
        updateInput();
        focus();
      }

      const input = ref(null);
      function updateInput() {
        input.value.innerText = actualValue.value;
      }
      function focus() {
        input.value?.focus?.();
      }
      function blur() {
        input.value?.blur?.();
      }

      const { fieldState } = useFieldContent({
        ref: input,
        focus,
        blur,
      });

      const { trigger } = fieldState;
      const focusing = ref(false);
      function onFocus() {
        focusing.value = true;
        trigger('onFocus');
      }
      function onBlur() {
        focusing.value = false;
        trigger('onBlur');
      }

      return {
        actualValue,
        onInput,
        clearValue,

        input,

        focusing,
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