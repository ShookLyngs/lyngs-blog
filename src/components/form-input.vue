<template>
  <div class="form-input py-1 w-full flex items-end" :class="inputClass">
    <!-- Content Input, not a regular input -->
    <div
      ref="input"
      class="form-input__content flex-auto w-full focus:outline-none"
      v-bind="$attrs"
      :contenteditable="!disabled"
      @click.stop
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @paste="onPaste"
      @keyup.enter="onEnter"
      @keydown.delete="onKeyDownDelete"
      @keyup.delete="onKeyUpDelete"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
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
  import { ref, computed, watch, onMounted } from 'vue';
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
      textarea: {
        type: Boolean,
        default: false,
      },
    },
    emits: [ 'update:modelValue', 'enter', 'delete' ],
    setup(props, { emit }) {
      const actualValue = ref(props.modelValue);
      watch(() => props.modelValue, () => {
        if (actualValue.value !== props.modelValue) {
          updateInput(props.modelValue);
        }
      });
      watch(actualValue, () => {
        emit('update:modelValue', actualValue.value);
      });
      function onInput(event) {
        if (!composition.value) {
          const filteredInputValue = filterInput(event.target.innerText);
          if (!props.textarea) {
            updateInput(filteredInputValue);
          } else {
            syncModelValue(filterInput(filteredInputValue));
          }
        }
      }
      function clearValue() {
        updateInput('');
        focus();
      }
      function filterInput(text) {
        return props.textarea
          ? text.replace(/\n{4,}/g, '\n\n\n')
          : text.replace(/\n/g, '');
      }

      const input = ref();
      function triggerInput() {
        onInput({ target: input.value });
      }
      function updateInput(value) {
        syncModelValue(value);
        syncInputContent();
        restoreSelection();
      }
      function syncModelValue(value) {
        actualValue.value = value;
      }
      function syncInputContent() {
        input.value.innerText = actualValue.value;
      }
      function focus() {
        input.value?.focus?.();
        setCaretToEnd(input.value);
      }
      function blur() {
        input.value?.blur?.();
      }

      onMounted(() => {
        if (input.value) {
          syncInputContent();
        }
      });

      const {
        lastContent: lastValue,
        restoreSelection
      } = useCaret(input);

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
        // triggerInput();
        focusing.value = false;
        trigger('onBlur');
      }
      function onEnter() {
        emit('enter');
      }
      function onPaste() {

      }

      const composition = ref(false);
      function onCompositionStart() {
        composition.value = true;
      }
      function onCompositionEnd() {
        composition.value = false;
        triggerInput();
      }

      let beforeDeleteValue = null;
      function onKeyDownDelete() {
        beforeDeleteValue = actualValue.value;
      }
      function onKeyUpDelete() {
        emit('delete', beforeDeleteValue, actualValue.value);
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
        lastValue,
        onInput,
        clearValue,

        input,
        updateInput,

        focusing,
        focus,
        blur,
        onFocus,
        onBlur,
        onPaste,
        onEnter,
        onKeyDownDelete,
        onKeyUpDelete,
        onCompositionStart,
        onCompositionEnd,

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