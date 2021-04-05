<template>
  <div class="h-full flex flex-col">
    <!--<textarea
      class="flex-auto w-full outline-none resize-none"
      v-model="content"
    />-->
    <form-input textarea v-model="content" />
    <div class="flex-auto" v-html="converted" />
  </div>
</template>

<script>
  // Functions
  import { ref, watch, watchEffect } from 'vue';
  // Components
  import FormInput from '@/components/form-input.vue';
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
        } catch (_) {
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
    },
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    emits: [ 'update:modelValue' ],
    setup(props, { emit }) {
      const content = ref(props.value);
      watch(() => props.value, () => content.value = props.value);
      watch(content, () => emit('update:modelValue', content.value));

      const converted = ref(content.value);
      watchEffect(() => {
        converted.value = markdown.render(content.value);
      });

      return {
        content,
        converted,
      };
    },
  };
</script>

<style lang="less">
  .code {
    @apply rounded-md;
    white-space: pre;
  }
</style>