<template>
  <div class="flex flex-col items-center">
    <div class="body-x w-full md:px-0 md:content">
      <ArticleListItem v-for="item in 100" :key="item">
        something worth remembering
      </ArticleListItem>
    </div>
  </div>
</template>

<script>
  import ArticleListItem from './article-list-item.vue';

  export default {
    name: 'home-index',
    components: {
      ArticleListItem,
    },
    setup() {

      return {};
    },
  };
</script>

<style lang="less" scoped>

</style>