<template>
  <container content-class="!py-20">
    <resume-section-header
      title="文章"
      description="推荐阅读的文章。"
    />

    <div>

    </div>
  </container>
</template>

<script>
  import { ref } from 'vue';
  import ResumeSectionHeader from './section-header.vue';

  export default {
    name: 'resume-articles',
    components: {
      ResumeSectionHeader,
    },
    setup() {
      const list = ref([]);

      return {
        list,
      };
    },
  };
</script>

<style scoped>

</style>