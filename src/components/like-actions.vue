<template>
  <collapse direction="horizontal" show>
    <div class="inline-flex">
      <plain-button
        icon="icon-yes-fill"
        class="!rounded-none"
        normal-class="text-positive-400 bg-negative-700"
        active-class="text-negative-700 bg-theme-500"
        text="12"
        :active="isMode(modes.like)"
        @click="switchMode(modes.like)"
        v-if="!isMode(modes.dislike)"
      />
      <plain-button
        icon="icon-no-fill"
        class="!rounded-none"
        normal-class="text-positive-400 bg-negative-700"
        active-class="text-negative-700 bg-error-500"
        text="9"
        :active="isMode(modes.dislike)"
        @click="switchMode(modes.dislike)"
        v-if="!isMode(modes.like)"
      />
    </div>
  </collapse>
</template>

<script>
  // Functions
  // import { ref } from 'vue';
  // Components
  import Collapse from '@/components/collapse';
  import PlainButton from '@/components/plain-button.vue';

  const modes = {
    normal: '',
    like: 'like',
    dislike: 'dislike',
  };

  export default {
    name: 'comment-actions',
    components: {
      Collapse,
      PlainButton,
    },
    props: {
      mode: {
        type: String,
        default: modes.normal,
      },
    },
    emits: [ 'click' ],
    setup(props, { emit }) {
      function isMode(mode) {
        return props.mode === mode;
      }
      function switchMode(mode) {
        emit('click', props.mode === mode ? '' : mode);
      }

      return {
        modes,
        isMode,
        switchMode,
      };
    },
  };
</script>

<style lang="less" scoped>

</style>