<template>
  <container>
    <!-- post article button, teleport to the header layout -->
    <teleport to="#header-button-slot">
      <border-button border-width="md" @click="toPost">发布文章</border-button>
    </teleport>

    <empty key="empty" v-if="!list.length" />
    <transition-group name="list">
      <ArticleListItem
        v-for="item in list"
        :key="item.id"
        :data="item"
        @click="toArticle(item)"
      />
    </transition-group>

    <pager class="mt-5" v-if="list.length" />
  </container>
</template>

<script>
  // Functions
  import { useList } from '@/hooks/use-list';
  import { useRouter } from 'vue-router';
  // Components
  import ArticleListItem from './article-list-item.vue';
  import Pager from '@/components/pager.vue';

  export default {
    name: 'articles',
    components: {
      ArticleListItem,
      Pager,
    },
    setup() {
      const { list } = useList();

      // Set list-value, async
      setTimeout(() => {
        list.value = [
          {
            id: 'fdasjkasdfg1',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-03-19 16:05:22',
            tags: ['前端开发', '开发日记', 'Vue3'],
          },
          {
            id: 'fdasjkasdfg2',
            title: '一般长的标题长这样，还没有占满一行就没了',
            content:
              '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。',
            createTime: '2021-03-19 16:05:22',
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
        push({
          name: 'article-post',
        });
      }

      return {
        list,
        toArticle,
        toPost,
      };
    },
  };
</script>

<style lang="less" scoped></style>
