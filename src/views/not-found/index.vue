<template>
  <div class="flex-auto flex h-full justify-center">
    <div class="flex flex-col items-center body">
      <empty type="search" />
      <div class="text-center text-sm text-positive-400 mb-14">这里什么都没有</div>

      <border-button type="gray" text="回到首页" @click="toEntry" />
    </div>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router';

  export default {
    name: 'not-found',
    setup() {
      const { push } = useRouter();
      function toEntry() {
        push({ name: 'entry' });
      }

      return {
        toEntry,
      };
    },
  };
</script>