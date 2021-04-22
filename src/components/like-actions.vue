<template>
  <collapse show>
    <plain-button
      icon="icon-yes-fill"
      normal-class="text-positive-400 bg-negative-700"
      active-class="text-negative-700 bg-theme-500"
      text="12"
      :active="like"
      @click="like = !like"
    />
    <plain-button
      icon="icon-no-fill"
      class="ml-2"
      normal-class="text-positive-400 bg-negative-700"
      active-class="text-negative-700 bg-error-500"
      text="9"
      :active="dislike"
      @click="dislike = !dislike"
    />
  </collapse>
</template>

<script>
  // Functions
  import { ref } from 'vue';
  // Components
  import Collapse from '@/components/collapse';
  import PlainButton from '@/components/plain-button.vue';

  export default {
    name: 'comment-actions',
    components: {
      Collapse,
      PlainButton,
    },
    props: {

    },
    setup() {
      const like = ref(false);
      const dislike = ref(false);

      return {
        like,
        dislike,
      };
    },
  };
</script>

<style scoped>

</style>