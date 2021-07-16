<template>
  <div class="py-20 md:py-28">
    <container content-class="!pt-0">
      <resume-section-header
        title="关于"
        description="聊聊我和我的工作。"
      />

      <markdown-renderer :content="content" />
    </container>
  </div>
</template>

<script>
  import { defineAsyncComponent } from 'vue';
  import ResumeSectionHeader from './section-header.vue';

  export default {
    name: 'resume-description',
    components: {
      ResumeSectionHeader,
      MarkdownRenderer: defineAsyncComponent(() => import('@/components/markdown-renderer')),
    },
    setup() {
      const content = `
![header](/src/assets/images/article/articles.jpg)

### 关于我
作为一名前端工程师，大多数时候我和网页打交道。

我会用 \`Vue.js\`、\`React.js\`，也懂得使用 \`TypeScript\`、\`TailwindCSS\`、\`Vite\` 等主流的技术。
由于公司业务需要，我用 \`Flutter\`、\`UniApp\` 开发过不少交易相关的APP。

可以说在前端应用这方面，无论是 Web 或者 APP，我都可以胜任开发。

### 这个网站
这里是我的个人站，我在这里更新我的工作状态，有时也会分享我近期的发现和想法。



### 我的开源
由于在工作中没有太多机会接触像 \`TypeScript\` 这样对项目影响比较大的技术，所以业余时间针对想要学的技术进行一定量的练习是很有必要的。

通常为了练习，我喜欢用新学的技术来造轮子。比如，我曾用 \`TypeScript\` 写过一些能够同时支持 Vue 和 React 的颜色管理库：
[@lyngs/themer](https://github.com/ShookLyngs/themer)。

这些项目名不见经传，我也并非有意维护，只是这作为我主要的成长方式，实在是对我的成长有很大的帮助。
`;
      return {
        content,
      };
    },
  };
</script>

<style scoped>

</style>