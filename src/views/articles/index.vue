<template>
  <container>
    <!-- Header post-button -->
    <teleport to="#header-actions">
      <transition name="fade-fast">
        <border-button
          border-width="md"
          style="min-width: 110px"
          text="发布文章"
          @click="toPost"
          v-if="isShowPostButton"
        />
      </transition>
    </teleport>

    <!-- Banner -->
    <div
      class="transition h-36 rounded-lg cursor-pointer bg-center bg-cover bg-negative-600 active:opacity-80"
      :style="{ backgroundImage: `url(${articlesImage})` }"
    />

    <!-- Divider -->
    <div class="h-12 pt-2.5 flex justify-center items-center">
      <div class="gap w-1/3 bg-negative-700" />
    </div>

    <!-- List -->
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
  import ArticleListItem from './article-list-item.vue';
  import Pager from '@/components/pager.vue';
  // Resources
  import articlesImage from '@/assets/images/article/articles.jpg';

  export default {
    name: 'articles',
    components: {
      ArticleListItem,
      Pager,
    },
    setup() {
      // Article list
      const { list } = useList();
      setTimeout(() => {
        list.value = [
          {
            id: 'fdasjkasdfg1',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-04-09 18:26:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
          },
          {
            id: 'fdasjkasdfg2',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-04-09 18:05:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
          },
        ];
        // Add list item, async
        setTimeout(() => {
          list.value.push({
            id: 'fdasjkasdfg3',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-04-09 12:05:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
          });
          list.value.push({
            id: 'fdasjkasdfg3',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-04-09 08:05:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
          });
          list.value.push({
            id: 'fdasjkasdfg3',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-04-08 08:05:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
          });
          list.value.push({
            id: 'fdasjkasdfg3',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-03-19 16:05:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
          });
          list.value.push({
            id: 'fdasjkasdfg3',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-03-19 16:05:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
          });
          list.value.push({
            id: 'fdasjkasdfg3',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-03-19 16:05:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
          });
          list.value.push({
            id: 'fdasjkasdfg3',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-03-19 16:05:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
          });
          list.value.push({
            id: 'fdasjkasdfg3',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-03-19 16:05:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
          });
          list.value.push({
            id: 'fdasjkasdfg3',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-03-19 16:05:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
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
      };
    },
  };
</script>

<style lang="less" scoped>
  .gap {
    height: 2px;
  }
</style>
