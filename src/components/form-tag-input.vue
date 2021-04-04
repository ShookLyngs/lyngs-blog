<template>
  <div class="flex flex-wrap items-center">
    <plain-button
      text="tag"
      normal-class="mt-0.5 mb-0.5 mr-1.5 font-medium bg-negative-700"
      v-for="tag in tags"
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
    <div class="flex mt-1 mb-1">
      <form-input
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
  import { ref, watch } from 'vue';
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
    },
    emits: [ 'input' ],
    setup(props, { emit }) {
      const actualValue = ref(props.modelValue);
      watch(() => props.modelValue, () => {
        if (actualValue.value !== props.modelValue) {
          actualValue.value = props.modelValue;
        }
      });
      watch(actualValue, () => {
        emit('input', actualValue.value);
      });

      const tags = ref([]);
      function removeTag(tag) {
        const index = tags.value.findIndex(row => row === tag);
        if (index > -1) {
          tags.value.splice(index, 1);
        }
      }
      function onEnter() {
        const text = actualValue.value.trim();
        const index = tags.value.findIndex(row => row.text === text);
        if (text.length && index < 0) {
          tags.value.push({ text });
          actualValue.value = '';
        }
      }
      function onDelete() {
        if (!actualValue.value.trim().length && tags.value.length) {
          removeTag(tags.value[tags.value.length - 1]);
        }
      }

      return {
        actualValue,
        tags,
        removeTag,
        onEnter,
        onDelete,
      };
    }
  };
</script>

<style scoped>
  
</style>