<template>
  <div class="flex flex-wrap items-center">
    <plain-button
      text="tag"
      normal-class="mt-0.5 mb-0.5 mr-1.5 font-medium bg-negative-700"
      v-for="tag in actualTags"
      :key="tag.text"
    >
      <template #default>
        <span class="text-sm">{{ tag.text }}</span>
        <icon
          class="ml-1 text-xs text-positive-400"
          name="icon-no"
          @click="removeTag(tag)"
        />
      </template>
    </plain-button>
    <div class="flex flex-auto">
      <form-input
        clearable
        ref="input"
        :="$attrs"
        v-model="actualValue"
        @enter="onEnter"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
  // Functions
  import { ref, computed } from 'vue';
  import { useModel } from '@/hooks/use-model';
  // Components
  import Icon from '@/components/icon';
  import FormInput from '@/components/form-input.vue';
  import PlainButton from '@/components/plain-button.vue';

  export default {
    name: 'form-tag-input',
    components: {
      Icon,
      FormInput,
      PlainButton,
    },
    props: {
      modelValue: {
        type: [ String, Number ],
        default: '',
      },
      tags: {
        type: Array,
        default: () => [],
      },
    },
    emits: [ 'update:modelValue', 'update:tags' ],
    setup(props, { emit }) {
      const actualValue = useModel(
        () => props.modelValue,
        (value) => emit('update:modelValue', value)
      );

      const input = ref();
      const lastValue = computed(() => input.value?.lastValue ?? null);
      function updateInput(value) {
        input.value?.updateInput?.(value);
      }

      const actualTags = useModel(
        () => props.tags,
        (value) => emit('update:tags', value)
      );
      function removeTag(tag) {
        const index = actualTags.value.findIndex(row => row === tag);
        if (index > -1) {
          actualTags.value.splice(index, 1);
        }
      }
      function onEnter() {
        const text = actualValue.value.trim();
        const index = actualTags.value.findIndex(row => row.text === text);
        if (text.length && index < 0) {
          actualTags.value.push({ text });
          updateInput((actualValue.value = ''));
        }
      }
      function onDelete(beforePressText, afterPressText) {
        const isEmpty = (beforePressText = beforePressText.trim()) === '';
        const isSame = beforePressText === afterPressText.trim();
        if (isSame && isEmpty && actualTags.value.length) {
          removeTag(actualTags.value[actualTags.value.length - 1]);
        }
      }

      return {
        input,
        actualValue,
        lastValue,
        actualTags,
        removeTag,
        onEnter,
        onDelete,
      };
    }
  };
</script>

<style scoped>
  
</style>