<template>
  <container class="flex-auto" content-class="flex-auto flex flex-col">
    <!-- banner -->
    <upload-background />

    <form class="post flex-auto flex flex-col relative body-x py-8 mt-36 rounded-lg border border-negative-700 bg-negative-900" @submit.prevent>
      <field label="标题">
        <form-input clearable placeholder="起个响亮的标题" />
      </field>
      <field label="标签">
        <form-tag-input clearable placeholder="按回车键注入标签" />
      </field>

      <!-- 分割线 -->
      <div class="h-12 flex justify-center items-center">
        <div class="gap w-1/3 bg-negative-700" />
      </div>

      <field label="正文" class="flex-auto flex flex-col">
        <markdown-editor placeholder="说点什么吧" v-model="form.content" />
      </field>

    </form>
  </container>
</template>

<script>
  // Functions
  import { reactive } from 'vue';
  // Components
  import Field from '@/components/field.vue';
  import FormInput from '@/components/form-input.vue';
  import FormTagInput from '@/components/form-tag-input.vue';
  import MarkdownEditor from '@/components/markdown-editor';
  import UploadBackground from './upload-background.vue';

  export default {
    name: 'article-post',
    components: {
      Field,
      FormInput,
      FormTagInput,
      MarkdownEditor,
      UploadBackground,
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
  .gap {
    height: 2px;
  }

  .post {
    //min-height: 600px;
  }
</style>