<template>
  <div>
    <div class="body-x ">
      111
      <div v-for="item in 100" :key="item" class="h-6 text-center">something worth remembering</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-index',
    setup() {

      return {};
    },
  };
</script>

<style lang="less" scoped>

</style>