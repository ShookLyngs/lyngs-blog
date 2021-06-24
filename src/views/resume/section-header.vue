<template>
  <div class="mb-4 flex justify-between items-center">
    <div>
      <div class="text-xl md:text-3xl font-bold">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="text-sm text-positive-300">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
    <slot name="append">
      <div class="ml-4 text-sm inline-flex items-center">
        <slot name="actions" />
      </div>
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'resume-section-header',
    props: {
      title: {
        type: String,
        default: '',
      },
      description: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style scoped>

</style>