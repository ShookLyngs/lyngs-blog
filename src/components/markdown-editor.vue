<template>
  <div class="flex flex-col flex-auto">
    <div class="flex-auto editor-min-height" v-if="!preview">
      <form-input
        textarea
        v-bind="$attrs"
        v-model="content"
      />
    </div>
    <div class="py-1 flex-auto editor-min-height" v-html="converted" v-else />
    <div class="py-2 sticky bottom-0 flex-static flex justify-between items-center bg-white">
      <div>
        <plain-button
          icon="icon-yes-fill"
          text="预览"
          class="mr-3"
          normal-class="text-positive-600"
          active-class="text-theme-500"
          :active="preview"
          @click="togglePreview"
        />
      </div>
      <div class="flex-static flex items-center">
        <!--<border-button text="发表" />-->
      </div>
    </div>
  </div>
</template>

<script>
  // Functions
  import { ref, watchEffect } from 'vue';
  import { useModel } from '@/hooks/use-model';
  // Components
  import FormInput from '@/components/form-input.vue';
  // import BorderButton from '@/components/border-button.vue';
  import PlainButton from '@/components/plain-button.vue';
  // Markdown
  import MarkdownIt from 'markdown-it';
  import highlight from 'highlight.js';
  import 'highlight.js/styles/tomorrow-night-eighties.css';

  const markdown = new MarkdownIt({
    highlight: function (string, language) {
      if (language && highlight.getLanguage(language)) {
        try {
          const transformed = highlight.highlight(string, { language });
          return `<pre class="code hljs"><code>${transformed.value}</code></pre>`;
        } catch {
          /**/
        }
      }

      return `<pre class="code hljs"><code>${markdown.utils.escapeHtml(string)}</code></pre>`;
    }
  });

  export default {
    name: 'markdown-editor',
    components: {
      FormInput,
      // BorderButton,
      PlainButton,
    },
    props: {
      value: {
        type: String,
        default: '',
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
        converted.value = markdown.render(content.value);
      });

      const preview = ref(false);
      function togglePreview() {
        preview.value = !preview.value;
      }

      return {
        content,
        converted,
        preview,
        togglePreview,
      };
    },
  };
</script>

<style lang="less">
  .code {
    @apply rounded-md;
    white-space: pre;
  }
  .editor-min-height {
    min-height: 200px;
  }
</style>