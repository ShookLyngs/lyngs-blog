<template>
  <template v-if="type === 'svg'">
    <svg class="ls-icon ls-icon-svg" aria-hidden="true" :class="name + '-svg'">
      <use :xlink:href="'#' + name" />
    </svg>
  </template>
  <template v-else-if="type === 'css'">
    <span class="ls-icon iconfont ls-icon-css" :class="name" />
  </template>
</template>

<script>
  import './src/iconfont.js';
  import './src/iconfont.css';

  export default {
    name: 'icon',
    props: {
      type: {
        type: String,
        default: 'svg',
      },
      name: {
        type: String,
        default: '',
      }
    },
  };
</script>

<style lang="less" scoped>
  .ls-icon-svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .iconfont {
    font-size: inherit;
  }

  .icon-loading:before,
  .icon-loading,
  .icon-loading-svg {
    animation: ls-rotate 2s infinite linear;
  }
</style>