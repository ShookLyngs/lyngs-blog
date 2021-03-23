<template>
  <div class="flex justify-between">
    <div class="flex w-28">
      <border-button class="flex-auto" type="gray">
        <icon name="icon-arrow-left" />
      </border-button>
      <border-button class="flex-auto" type="gray">
        <icon name="icon-arrow-right" />
      </border-button>
    </div>

    <div class="hidden md:flex">
      <border-button type="gray" v-for="number in 6" :key="number">
        {{ number }}
      </border-button>
    </div>

    <div class="flex w-28">
      <border-button type="gray">
        <input type="text" class="w-full">
      </border-button>
    </div>
  </div>
</template>

<script>
  import BorderButton from '@/components/border-button.vue';
  import Icon from '@/components/icon/icon.vue';

  export default {
    name: 'page',
    components: {
      BorderButton,
      Icon,
    },
  };
</script>

<style scoped>
  
</style>