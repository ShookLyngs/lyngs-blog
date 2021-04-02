<template>
  <div class="field">
    <div class="text-xl font-bold text-positive-800" v-if="label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'field',
    props: {
      label: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style lanlg="less" scoped>
  .field {
  }
</style>