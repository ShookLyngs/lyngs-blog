<template>
  <div class="form-input w-full flex items-end" :class="inputClass">
    <!-- Content Input, not a regular input -->
    <div
      ref="input"
      class="form-input__content lex-auto focus:outline-none"
      v-bind="$attrs"
      :contenteditable="!disabled"
      @click.stop
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="onEnter"
      @keyup.delete="onDelete"
    />

    <!-- Clear modelValue button -->
    <transition name="fade-fast">
      <plain-button
        padding="sm"
        icon="icon-no"
        icon-class="text-base"
        v-if="!disabled && clearable && `${actualValue}`.length"
        @click="clearValue"
      />
    </transition>
  </div>
</template>

<script>
  // Functions
  import { ref, computed, watch } from 'vue';
  import { useFieldContent } from '@/hooks/use-form';
  import { useCaret } from '@/hooks/use-caret';
  import { setCaretToEnd } from '@/assets/util/dom';
  // Components
  import PlainButton from '@/components/plain-button.vue';

  export default {
    name: 'form-input',
    components: {
      PlainButton,
    },
    props: {
      modelValue: {
        type: [ String, Number ],
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      clearable: {
        type: Boolean,
        default: false,
      },
    },
    emits: [ 'update:modelValue', 'enter', 'delete' ],
    setup(props, { emit }) {
      const actualValue = ref(props.modelValue);
      watch(() => props.modelValue, () => {
        if (actualValue.value !== props.modelValue) {
          actualValue.value = props.modelValue;
          updateInput();
        }
      });
      watch(actualValue, () => {
        emit('update:modelValue', actualValue.value);
      });
      function onInput({ target: { innerText } }) {
        saveSelection(actualValue.value);
        actualValue.value = filterInput(innerText);
        if (innerText !== actualValue.value) {
          updateInput();
        }
      }
      function clearValue() {
        actualValue.value = '';
        updateInput();
        focus();
      }

      function filterInput(text) {
        return text.replace(/\n/g, ' ');
      }

      const input = ref(null);
      function updateInput() {
        input.value.innerText = actualValue.value;
        restoreSelection();
      }
      function focus() {
        input.value?.focus?.();
        setCaretToEnd(input.value);
      }
      function blur() {
        input.value?.blur?.();
      }

      const { saveSelection, restoreSelection } = useCaret(input);

      const { fieldState } = useFieldContent({
        type: 'input',
        cursor: 'text',
        ref: input,
        props,
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
      function onEnter() {
        emit('enter');
      }
      function onDelete() {
        emit('delete');
      }

      const inputClass = computed(() => {
        const classes = [];
        if (focusing.value) {
          classes.push('is-focus');
        }
        return classes;
      });

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
        onEnter,
        onDelete,

        inputClass,
      };
    },
  };
</script>

<style lang="less" scoped>
  .form-input {
    &:not(.is-focus) {

    }
    .form-input__content {
      &:empty {
        &::before {
          @apply text-positive-200;
          content: attr(placeholder);
        }
      }
    }
  }
</style>