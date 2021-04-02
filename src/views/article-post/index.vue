<template>
  <container class="flex-auto" content-class="flex-auto flex flex-col">
    <!-- banner -->
    <div class="relative">
      <div
        class="background bg-cover bg-center bg-negative-700 w-full md:breaker-content"
        :style="{ backgroundImage: `url()` }"
      />
    </div>

    <form class="post flex-auto relative body mt-36 rounded-lg border border-negative-700 bg-negative-900" @submit.prevent>
      
      <field label="标题">
        <input type="text">
      </field>
      
      <markdown-editor v-model="form.content" />
    </form>
  </container>
</template>

<script>
  import { reactive } from 'vue';
  import Field from '@/components/field.vue';
  import MarkdownEditor from '@/components/markdown-editor.vue';

  export default {
    name: 'article-post',
    components: {
      Field,
      MarkdownEditor,
    },
    setup() {
      const form = reactive({
        title: '',
        content: '',
      });

      return {
        form,
      };
    },
  };
</script>

<style lang="less" scoped>
  .background {
    @apply absolute top-0 overflow-hidden rounded-2xl;
    left: 50%;
    height: 260px;
    transform: translate3d(-50%, 0, 0);
  }

  .post {
    //min-height: 600px;
  }
</style>