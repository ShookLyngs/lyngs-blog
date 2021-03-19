<template>
  <div class="mr-2.5 mt-2 px-3 py-1.5 text-xs font-medium rounded bg-negative-700 text-positive-600">
    <slot>
      {{ text }}
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'tag',
    props: {
      text: {
        type: [ String, Number ],
        default: '',
      },
    },
  };
</script>

<style lang="less" scoped></style>