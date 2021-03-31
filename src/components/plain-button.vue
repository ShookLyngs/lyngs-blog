<template>
  <div
    class="plain-button"
    :class="active ? activeClass : normalClass"
    @click.stop="onClick"
  >
    <slot name="icon">
      <icon class="text-lg" :name="icon" v-if="icon" />
    </slot>
    <span class="ml-1.5 text-sm" v-if="$slots.default || text">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>

<script>
  import Icon from '@/components/icon';
  export default {
    name: 'plain-button',
    components: {
      Icon,
    },
    props: {
      icon: {
        type: String,
        default: '',
      },
      text: {
        type: [String, Number],
        default: '',
      },
      active: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      normalClass: {
        type: [Object, Array, String],
        default: '',
      },
      activeClass: {
        type: [Object, Array, String],
        default: '',
      },
    },
    emits: ['click'],
    setup(props, { emit }) {
      function onClick() {
        if (!props.disabled) emit('click');
      }

      return {
        onClick,
      };
    },
  };
</script>

<style lang="less" scoped>
  .plain-button {
    @apply px-2 py-1 rounded;
    @apply flex items-center cursor-pointer select-none transition duration-300 active:opacity-70;

    & + & {
      @apply ml-4;
    }
    &.is-disabled {
      @apply cursor-default opacity-60 active:opacity-60;
    }
  }
</style>
