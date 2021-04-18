<template>
  <!-- ImageSwiper, view images in big screen -->
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div
    ref="dialog"
    class="pswp"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
    @click.stop.prevent
  >

    <!-- Background of PhotoSwipe. 
         It's a separate element as animating opacity is faster than rgba(). -->
    <div class="pswp__bg !bg-modal-900" />

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

      <!-- Container that holds slides. 
          PhotoSwipe keeps only 3 of them in the DOM to save memory.
          Don't modify these 3 pswp__item elements, data is added later on. -->
      <div class="pswp__container">
        <div class="pswp__item" />
        <div class="pswp__item" />
        <div class="pswp__item" />
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">

        <div class="pswp__top-bar">

          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter" />

          <button class="pswp__button pswp__button--close" @click="close">
            <icon name="icon-no" />
          </button>

          <button class="pswp__button pswp__button--share" title="Share" />

          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen" />

          <button class="pswp__button pswp__button--zoom" title="Zoom in/out" />

          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut" />
              </div>
            </div>
          </div>
        </div>

        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip" />
        </div>

        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" />

        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)" />

        <div class="pswp__caption">
          <div class="pswp__caption__center" />
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  // Functions
  import { ref } from 'vue';
  // Components
  import Icon from '@/components/icon';
  // PhotoSwipe
  import PhotoSwipe from 'photoswipe';
  import PhotoSwipeDefaultUi from 'photoswipe/dist/photoswipe-ui-default';
  import 'photoswipe/dist/photoswipe.css';
  import 'photoswipe/dist/default-skin/default-skin.css';

  export default {
    name: 'image-swiper',
    components: {
      Icon,
    },
    emits: [
      'close',
      'destroy',
    ],
    setup(props, { emit }) {
      const dialog = ref();
      const swiper = ref();
      function createSwiper() {
        swiper.value = new PhotoSwipe(dialog.value, PhotoSwipeDefaultUi, list.value, {
          closeEl:true,
          captionEl: true,
          counterEl: true,
          arrowEl: true,
          zoomEl: false,
          fullscreenEl: false,
          shareEl: false,
          preloaderEl: false,
          bgOpacity: 0.8,
          showHideOpacity: true,
          loop: false,
          history: false,
          focus: true,
          galleryPIDs:false,
          getThumbBoundsFn(index) {
            const { thumbRect } = list.value[index];
            return {
              x: thumbRect.left,
              y: thumbRect.top,
              w: thumbRect.width,
              h: thumbRect.height,
            };
          }
        });
        swiper.value.listen('close', onClose);
        swiper.value.listen('destroy', onDestroy);
      }
      function onClose() {
        emit('close');
      }
      function onDestroy() {
        emit('destroy');
      }

      const list = ref([]);
      function open(urls) {
        list.value = urls;
        createSwiper();
        swiper.value.init();
      }
      function close() {
        swiper.value.close();
      }

      return {
        dialog,
        open,
        close,
      };
    },
  };
</script>

<style lang="less" scoped>
  .pswp {
    &__top-bar {
      @apply body;
      height: auto;
      background: none;
    }
    &__button--close {
      @apply scale-card flex justify-center items-center rounded-md bg-negative-900 shadow-xl;
      @apply opacity-100 border-2 border-solid border-negative-900 active:border-theme-500 active:shadow-2xl;
      background-image: none;
    }
  }
</style>