<template>
  <div class="flex-auto flex flex-col">
    <div class="flex-auto flex flex-col editor-min-height" v-if="!preview">
      <form-input
        textarea
        v-bind="$attrs"
        v-model="content"
      />
    </div>
    <div class="py-1 flex-auto editor-min-height" v-html="converted" v-else />
  </div>
</template>

<script>
  // Functions
  import { ref, watchEffect } from 'vue';
  import { useModel } from '@/hooks/use-model';
  import { render } from '../markdown-renderer';
  // Components
  import FormInput from '@/components/form-input.vue';

  export default {
    name: 'markdown-editor',
    components: {
      FormInput,
    },
    props: {
      value: {
        type: String,
        default: '',
      },
      preview: {
        type: Boolean,
        default: false,
      },
    },
    emits: [ 'update:modelValue' ],
    setup(props, { emit }) {
      const content = useModel(
        () => props.value,
        (value) => emit('update:modelValue', value)
      );
      const converted = ref(content.value);
      watchEffect(() => {
        converted.value = render(content.value);
      });

      return {
        content,
        converted,
      };
    },
  };
</script>

<style lang="less">
  .editor-min-height {
    min-height: 200px;
  }
</style>