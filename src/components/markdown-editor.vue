<template>
  <div class="h-full flex flex-col">
    <textarea
      class="flex-auto w-full p-4 rounded-lg outline-none box-border border-3 border-negative-600 resize-none"
      v-model="content"
    />
    <div class="flex-auto" v-html="converted" />
  </div>
</template>

<script>
  import { ref, watch, watchEffect } from 'vue';

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