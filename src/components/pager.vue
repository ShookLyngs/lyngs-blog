<template>
  <div class="flex justify-between">
    <div class="flex w-28">
      <border-button class="flex-auto" type="gray" padding="sm">
        <icon name="icon-arrow-left" />
      </border-button>
      <border-button class="flex-auto" type="gray" padding="sm">
        <icon name="icon-arrow-right" />
      </border-button>
    </div>

    <div class="hidden md:flex">
      <border-button
        type="gray"
        padding="sm"
        v-for="number in 5"
        :key="number"
        :text="number"
      />
      <border-button
        class="is-active" type="gray" padding="sm"
        text="6"
      />
    </div>

    <div class="flex w-28">
      <input
        ref="input"
        type="number"
        min="1"
        max="3"
        class="pager-input w-full"
        v-model="jumper"
        @focus="onInputFocus"
        @keyup.enter="onJump"
      >
    </div>
  </div>
</template>

<script>
  // Functions
  import { ref, watchEffect } from 'vue';
  // Components
  import BorderButton from '@/components/border-button.vue';
  import Icon from '@/components/icon/icon.vue';

  export default {
    name: 'page',
    components: {
      BorderButton,
      Icon,
    },
    setup() {
      const jumper = ref('1');
      watchEffect(() => {
        if (jumper.value > 10) jumper.value = '10';
        if (jumper.value < 0) jumper.value = jumper.value.replace('-', '');
      });
      function onJump() {
        console.log('jump');
      }

      const input = ref(null);
      function onInputFocus() {
        if (input.value) {
          input.value.select();
        }
      }

      return {
        jumper,
        onJump,

        input,
        onInputFocus,
      };
    },
  };
</script>

<style lang="less" scoped>
  // input
  .pager-input {
    @apply scale-card inline-flex justify-center items-center;
    @apply box-border rounded-md h-10 px-3 text-sm font-semibold text-center;
    @apply border-2 border-negative-700 bg-negative-900 focus:border-theme-500;
    @apply text-positive-700 active:text-theme-600 focus:shadow-lg;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }

  // button
  .is-active {
    @apply text-theme-500;
  }
</style>
