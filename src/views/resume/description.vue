<template>
  <container content-class="!py-20">
    <resume-section-header
      title="介绍"
      description="谈谈我感兴趣的技术方向。"
    />

    <markdown-renderer :content="content" />
  </container>
</template>

<script>
  import ResumeSectionHeader from './section-header.vue';
  import { defineAsyncComponent } from 'vue';

  export default {
    name: 'description',
    components: {
      ResumeSectionHeader,
      MarkdownRenderer: defineAsyncComponent(() => import('@/components/markdown-renderer')),
    },
    setup() {
      const content = `
在工作中，我接触得比较多、也用的比较熟练的技术栈是 \`Vue.js\` 和 \`Flutter\`。
在使用这些框架时，我能够更熟练地进行前端开发的工作。

而在业余时间里没了约束，我便更喜欢接触流行、新颖的技术，比如 \`React.js\`、\`TypeScript\`、\`TailwindCSS\`、\`Vite\`。

通常为了练习，我喜欢用新学的技术来造轮子。比如，我曾用 \`TypeScript\` 写过一些能够同时支持 Vue 和 React 的颜色管理库：
[@lyngs/themer](https://github.com/ShookLyngs/themer)。

这些名不见经传的开源项目，通常能够让我学到很多工作中没机会用的新东西，所以我总是不会排斥造轮子。
毕竟这是我成长的主要手段。
`;
      return {
        content,
      };
    },
  };
</script>

<style scoped>

</style>