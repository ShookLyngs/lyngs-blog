<template>
  <div class="py-2.5">
    <div class="rounded-xl border border-negative-700 bg-negative-900 body">
      <div class="text-xl text-positive-800 font-bold truncate md:text-2xl">
        一般长的标题长这样，还没有占满一行就没了
      </div>
      <div class="mt-2.5 text-base text-positive-600 font-medium overflow-hidden line-clamp">
        我天，这几天一直在各个论坛找资料，我都忘了这篇回答了。忙到我原神疲劳都没刷。随着资讯越来越多，心路历程：从“庵野老子捅死你个王八蛋，再放飞一万个你的复制体老母亲”到“老子先揍你到半死，再给你个抱抱”近20年的eva粉，当年也是疯狂查设定，找真相，想拼凑完整的剧情。后来终于明白“这他妈的就是老贼一拍脑袋的产物”“你叫他自己圆都圆不回来”最后蜕变成妈妈粉的存在。
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'article-list-item'
  };
</script>

<style scoped>
  .line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
</style>