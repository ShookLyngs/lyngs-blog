<template>
  <container>
    <!-- banner -->
    <div class="relative">
      <div
        class="background bg-cover bg-center w-full md:breaker-content"
        :style="{ backgroundImage: `url(${detailImage})` }"
      />
    </div>

    <!-- content -->
    <div class="relative body mt-36 rounded-lg border border-negative-700 bg-negative-900">
      <!-- title -->
      <div class="body-top text-xl text-positive-800 font-bold md:text-2xl">
        你可以说我嫉妒清华大学博士，我自己是井底之蛙，我被阴谋论洗脑，我自己不行不代表别人不行
      </div>

      <!-- tags -->
      <div class="body-y flex flex-wrap pt-2 select-none">
        <tag v-for="tag in data.tags" :key="tag">{{ tag }}</tag>
      </div>

      <!-- content -->
      <div class="body-y text-base text-positive-600 font-medium">
        你可以说我嫉妒清华大学博士，我自己是井底之蛙，我被阴谋论洗脑，我自己不行不代表别人不行……都可以说，但我的怀疑真真切切地完全是因为多年的理工科教育告诉我这不科学。
        如果我看到电视上有人一拳打塌房子，我也会怀疑其真实性，而且并不是因为我力气太小、不懂武术。这种怀疑跟这个表演者学历多高、人品多好、性格多么圈粉也无关。这节目之后他发过一篇微博解释，“想象成小孩子的脸”“关闭呼吸”，我也不能理解。如果哪天真的证明此人确有这项绝技，可以科学证明，有理可依，那么你再说我是傻子、小人、恶意中伤、井底之蛙，我都躺平任嘲；如果揭穿其造假，那也不能说明我聪明，仅仅是正常。以下是这位清华看水大神的解释：转自微博节目播出后，铺天盖地的询问，各种胡乱猜测，更有甚者以商业为目的歪曲为记忆法（躺枪的还有鲍橒和孙亦廷等天赋型选手）。与其这样瞎猜不如我自己来跟大家说清楚，首先由于时间的限制节目剪掉不少，现场我有简单说到怎么看的，正如Dr魏所讲，这是多信息匹配。杯子没有选择玻璃的而是亚克力的，是因为玻璃会有薄厚不匀甚至气泡，亚克力批量生产的差别极小，自然物体各个不同，工业化产品相似度极高，如果没有水赋予生命，单看杯子很难快速浏览。其次，新杯子倒入水，过一段时间或多或少会有随机的气泡产生，但它们会变，变大变小或是消失，如果十杯二十杯单独依据气泡是可以的，但如果成百上千杯的话，就靠不住了，比如这杯有9个气泡，走一走晃一晃，也许就少了1-2个，而且杯子是圆的，稍一旋转就会变成其它组合，杯子基数变大后，就会有正好也是7-8个气泡的，那样就很难分辩了，所以气泡是依据信息之一，但不能仅靠它。还有尘埃和光影。然后谈谈当时我是如何看的，观察第一杯水时，我关闭了呼吸和心跳，我用一种带着微笑的渴望去融入它，就像所有父亲趴在熟睡女儿脸边想去亲她的感觉，这一刻万籁俱寂，水一下子变大，我闭上眼感受着翱游在里面，分不清是水还是天空⋯再次睁开眼时，就如我贴图的这个画面出现了，我再一次闭上眼冥想，再睁开时，左下角8点钟方向又出现了一个孩子的笑脸，我看了她好久⋯但实际这时只过了15秒。我把信息包裏好放到脑海中的一个安全地方，接下来我就是去找她们了，快速扫过是不想让更多的信息停留被记住覆盖最初那一杯，有时会1秒4杯，但自己的好奇心还是会让我去看看其它杯中的乾坤，看水时我基本是不呼吸的，因为任何一丝丝波动都会让水出现涟漪干扰观察，即便这样快速筛选，还是有不少有意思的其它图像挤进来了⋯慢慢我包裹好的原始信息外围满了其它水杯，就像坐北京的地铁，直到我看到那一杯时，一下子，同样的感觉又有了，那种欣喜就像久别的恋人街角偶遇⋯我之所以说旋转15度是因为水中女孩和鹦鹉嘴的方向都移动了半个钟点，气泡丢失了2-3个，我推断是换手和放置震动所至，所以说不止一个人碰过。最后，终于写完了。PS：看评论还是有很多人觉得这事儿可信，那就再解释两句。是的，水哥上过央视，又比我有钱比我帅，学历才识更是远胜于我等。但气功大师治病也上过央视，比我强的人耍花招骗人也常见得很。对于一个完全超越常识的事情，加上玄幻的解释（关闭心跳在水里看见女孩和鹦鹉嘴，恕我凡夫俗子，不能理解），保持怀疑我觉得没毛病。到底是强者真的恐怖如斯，还是皇帝的新衣，我相信总有一天要真相大白。言尽于此。
      </div>

      <!-- taken block, donate -->
      <empty />

      <!-- userinfo, and actions -->
      <div class="mt-20 flex justify-between">
        <div class="flex items-center">
          <imager class="flex-static w-10 h-10 rounded-full overflow-hidden select-none" :src="avatarImage" />
          <div class="ml-3 select-none">
            <div class="text-sm font-semibold">Shook</div>
            <div class="text-xs text-positive-100">发布于 昨天 xx:xx</div>
          </div>
        </div>
        <div class="flex items-center">
          <text-button type="gray" padding="sm">
            <icon class="text-2xl" name="icon-setting" />
          </text-button>
        </div>
      </div>
    </div>

    <!-- TODO: comments -->

  </container>
</template>

<script>
  // Functions
  import { ref } from 'vue';
  // Components
  import Tag from '@/components/tag.vue';
  // Resources
  import detailImage from '@/assets/images/article/detail.jpg';
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'article-detail',
    components: {
      Tag,
    },
    setup() {
      const data = ref({
        tags: [ '前端开发', 'Vue3' ],
      });

      return {
        data,
        detailImage,
        avatarImage,
      };
    },
  };
</script>

<style scoped>
  .background {
    @apply absolute top-0 overflow-hidden rounded-2xl;
    left: 50%;
    height: 260px;
    transform: translate3d(-50%, 0, 0);
  }
</style>