<template>
  <collapse :show="true">
    <container>
      <!-- Header post-button -->
      <teleport to="#header-actions">
        <transition name="fade-fast">
          <border-button
            border-width="md"
            style="min-width: 110px"
            text="发表想法"
            @click="showPost"
            v-if="isShowPostButton"
          />
        </transition>
      </teleport>

      <!-- Main list -->
      <lazy-group>
        <memo-list-item
          v-for="item in list"
          :key="item.id"
          :data="item"
        />
      </lazy-group>

      <!-- Reach bottom refresh -->
      <reach-bottom
        :end="isPageEnd"
        @start="onReachBottom"
      />

      <memo-post ref="memoPost" />
    </container>
  </collapse>
</template>

<script>
  // Functions
  import { ref, nextTick, onMounted } from 'vue';
  import { useList } from '@/hooks/use-list';
  // Components
  import MemoPost from './memo-post.vue';
  import MemoListItem from './memo-list-item.vue';
  import ReachBottom from '@/components/reach-bottom.vue';
  import LazyGroup from '@/components/lazy-group.vue';
  import Collapse from '@/components/collapse';
  // Resources
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'memos',
    components: {
      MemoPost,
      MemoListItem,
      ReachBottom,
      LazyGroup,
      Collapse,
    },
    setup() {
      const { list } = useList();
      const isPageEnd = ref(false);
      const tempTimes = ref(0);
      function onReachBottom(finish) {
        setTimeout(() => {
          tempTimes.value++;
          /*if (tempTimes.value > 2) {
            isPageEnd.value = true;
          }*/

          /*for (let i = 0; i < 1000; i++) {
            list.value.push({
              id: `${Date.now()}`,
              avatar: avatarImage,
              content: `content: ${i}`,
              createTime: '2021-04-13 8:26:22',
              images: [ avatarImage, ],
            });
          }*/
          [
            {
              id: `${Date.now()}`,
              avatar: avatarImage,
              content: `我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。
忙到我原神疲劳都没刷。

随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。

后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。`,
              createTime: '2021-04-13 8:26:22',
              images: [ avatarImage, ],
            },
            {
              id: `${Date.now()}`,
              avatar: avatarImage,
              content: '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。',
              createTime: '2021-04-12 18:26:22',
              images: [ avatarImage, avatarImage, avatarImage, avatarImage ],
            },
            {
              id: `${Date.now()}`,
              avatar: avatarImage,
              content: `我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。
忙到我原神疲劳都没刷。
随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。
后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。`,
              createTime: '2021-04-13 8:26:22',
              images: [ avatarImage, ],
            },
            {
              id: `${Date.now()}`,
              avatar: avatarImage,
              content: `我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。
忙到我原神疲劳都没刷。
随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。
后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。`,
              createTime: '2021-04-13 8:26:22',
              images: [ avatarImage, ],
            },
          ].forEach(row => list.value.push(row));
          nextTick(finish);
        }, 2000);
      }

      // Header post button
      const isShowPostButton = ref(false);
      onMounted(() => {
        setTimeout(() => isShowPostButton.value = true, 500);
      });

      const memoPost = ref();
      function showPost() {
        if (memoPost.value) {
          memoPost.value.open();
        }
      }

      return {
        list,
        isPageEnd,
        onReachBottom,

        isShowPostButton,
        memoPost,
        showPost,
      };
    },
  };
</script>

<style scoped></style>


=