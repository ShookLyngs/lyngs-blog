<template>
  <container>
    <!-- Header post-button -->
    <teleport to="#header-actions">
      <!--<transition name="fade-fast">
        <border-button
          border-width="md"
          style="min-width: 110px"
          text="发布文章"
          @click="toPost"
          v-if="isShowPostButton"
        />
      </transition>-->
    </teleport>

    <!-- Banner -->
    <!--
    <div class="flex justify-center bg-negative-900">
      <div class="body-y md:content">
        <imager
          transition
          background
          class="transition h-36 rounded-lg overflow-hidden cursor-pointer bg-center bg-cover bg-negative-600 active:opacity-80"
          :src="articlesImage"
        />
      </div>
    </div>
    -->

    <!-- Recommended articles -->
    <recommended-articles />

    <!-- Divider -->
    <div class="h-12 pt-2.5 flex justify-center items-center">
      <div class="gap w-1/3 bg-negative-700" />
    </div>

    <!--<div class="flex justify-end">
      <ripple-button size="lg" icon="icon-copy">创建文章</ripple-button>
    </div>-->

    <!-- List -->
    <div class="body-y text-xl">时间线</div>
    <empty v-if="!list.length" />
    <transition-group name="list">
      <ArticleListItem
        v-for="item in list"
        :key="item.id"
        :data="item"
        @click="toArticle(item)"
      />
    </transition-group>

    <!-- Pager -->
    <pager class="mt-5" v-if="list.length" />
  </container>
</template>

<script>
  // Functions
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useList } from '@/hooks/use-list';
  // Components
  import RecommendedArticles from './recommended.vue';
  import ArticleListItem from './article-list-item.vue';
  import Pager from '@/components/pager.vue';
  // Resources
  import articlesImage from '@/assets/images/article/articles.jpg';
  import detailImage from '@/assets/images/article/detail.jpg';

  export default {
    name: 'articles',
    components: {
      RecommendedArticles,
      ArticleListItem,
      Pager,
    },
    setup() {
      // Article list
      const { list } = useList();
      setTimeout(() => {
        list.value = [
          {
            id: `${Date.now()}`,
            title: '如何在现代浏览器里实现列表/图片懒加载',
            subtitle: '细谈 Resize Observer / Intersection API 与他们所带来的 Bugs，这部分知识你不一定需要用到，但是知道总比不懂得要好。',
            createTime: '2021-04-09 18:26:22',
            tags: ['前端开发', 'JavaScript', 'ES2021'],
            image: detailImage,
          },
        ];
        // Add list item, async
        setTimeout(() => {
          [...Array(9)].forEach(() => {
            list.value.push({
              id: `${Date.now()}`,
              title: '如何在现代浏览器里实现列表/图片懒加载',
              subtitle: '细谈 Resize Observer / Intersection API 与他们所带来的 Bugs，这部分知识你不一定需要用到，但是知道总比不懂得要好。',
              createTime: '2021-04-09 18:26:22',
              tags: ['前端开发', 'JavaScript', 'ES2021'],
            });
          });
        }, 500);
      }, 1000);

      // Header post button
      const isShowPostButton = ref(false);
      onMounted(() => {
        setTimeout(() => isShowPostButton.value = true, 500);
      });

      const { push } = useRouter();
      function toArticle(row) {
        push({
          name: 'article-view',
          params: {
            id: row.id,
          },
        });
      }
      function toPost() {
        push({ name: 'article-post' });
      }

      return {
        // Article list
        list,

        // Header post button
        isShowPostButton,

        // Router
        toArticle,
        toPost,

        // Resources
        articlesImage,
        detailImage,
      };
    },
  };
</script>

<style lang="less" scoped>
  .gap {
    height: 2px;
  }
</style>
