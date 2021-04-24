<template>
  <div class="flex">
    <plain-button
      icon="icon-up-fill"
      class="!py-1.5"
      normal-class="text-positive-400 bg-negative-700"
      active-class="text-negative-700 bg-theme-500"
      text="12"
      :active="isMode(modes.like)"
      @click="switchMode(modes.like)"
    />
    <plain-button
      icon="icon-down-fill"
      class="ml-2 !py-1.5"
      normal-class="text-positive-400 bg-negative-700"
      active-class="text-negative-700 bg-error-500"
      :active="isMode(modes.dislike)"
      @click="switchMode(modes.dislike)"
    />
  </div>
</template>

<script>
  // Components
  import PlainButton from '@/components/plain-button.vue';

  const modes = {
    normal: '',
    like: 'like',
    dislike: 'dislike',
  };

  export default {
    name: 'comment-actions',
    components: {
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