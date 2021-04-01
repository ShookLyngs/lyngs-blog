<template>
  <container class="flex-auto" content-class="flex-auto">
    <form class="h-full post relative body rounded-lg border border-negative-700 bg-negative-900" @submit.prevent>
      <markdown-editor v-model="form.content" />
    </form>
  </container>
</template>

<script>
  import { ref, reactive, watchEffect } from 'vue';
  import MarkdownEditor from '@/components/markdown-editor.vue';

  export default {
    name: 'article-post',
    components: {
      MarkdownEditor,
    },
    setup() {
      const form = reactive({
        title: '',
        content: '',
      });

      /*const converted = ref(form.content);
      watchEffect(() => {
        converted.value = markdown.render(form.content);
      });*/

      return {
        form,
        //converted,
      };
    },
  };
</script>

<style lang="less" scoped>
  .post {
    //min-height: 600px;
  }
</style>