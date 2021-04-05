<template>
  <container class="flex-auto" content-class="flex-auto flex flex-col">
    <!-- banner -->
    <div class="relative">
      <div
        class="background bg-cover bg-center bg-negative-700 w-full md:breaker-content"
        :style="{ backgroundImage: `url()` }"
      />
    </div>

    <form class="post flex-auto relative body-x py-8 mt-36 rounded-lg border border-negative-700 bg-negative-900" @submit.prevent>
      <field label="标题">
        <form-input placeholder="请输入标题" />
      </field>
      <field label="标签">
        <form-tag-input placeholder="按回车添加标签" />
      </field>
      <field label="正文">
        <markdown-editor v-model="form.content" />
      </field>

      <field label="正文">
        <Editable tag="div" v-model="value" />
      </field>
    </form>
  </container>
</template>

<script>
  // Functions
  import { reactive, ref, watch } from 'vue';
  // Components
  import Field from '@/components/field.vue';
  import FormInput from '@/components/form-input.vue';
  import FormTagInput from '@/components/form-tag-input.vue';
  import MarkdownEditor from '@/components/markdown-editor.vue';
  import Editable from 'vue-contenteditable';

  export default {
    name: 'article-post',
    components: {
      Field,
      FormInput,
      FormTagInput,
      MarkdownEditor,
      Editable,
    },
    setup() {
      const form = reactive({
        title: '',
        content: '',
      });

      const value = ref('');
      watch(value, () => {
        if (!value.value.endsWith('-')) value.value += '-';
      });

      return {
        form,
        value,
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