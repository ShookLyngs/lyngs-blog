<template>
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

    <transition-group name="list">
      <memo-list-item
        v-for="item in list"
        :key="item.id"
        :data="item"
      />
    </transition-group>
    <empty />
  </container>
</template>

<script>
  // Functions
  import { ref, onMounted } from 'vue';
  import { useList } from '@/hooks/use-list';
  // Components
  import MemoListItem from './memo-list-item.vue';
  // Resources
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'memos',
    components: {
      MemoListItem,
    },
    setup() {
      const { list } = useList();
      setTimeout(() => {
        list.value = [
          {
            id: 'sdfaj1',
            avatar: avatarImage,
            content: `我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。
忙到我原神疲劳都没刷。
随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。
后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。`,
            createTime: '2021-04-13 8:26:22',
            images: [ 'avatarImage', avatarImage, ],
          },
          {
            id: 'sdfaj2',
            avatar: avatarImage,
            content: '我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。',
            createTime: '2021-04-12 18:26:22',
            images: [ avatarImage, avatarImage, avatarImage, avatarImage, avatarImage, avatarImage ],
          },
        ];
      }, 1500);

      // Header post button
      const isShowPostButton = ref(false);
      onMounted(() => {
        setTimeout(() => isShowPostButton.value = true, 500);
      });

      function showPost() {}

      return {
        list,

        isShowPostButton,
        showPost,
      };
    },
  };
</script>

<style scoped></style>


=