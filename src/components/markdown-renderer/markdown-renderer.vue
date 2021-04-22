<script>
  // Functions
  import { h, ref, watch } from 'vue';
  import { render } from './markdown';
  import { openImageViewer } from '@/components/image-viewer';

  export default {
    name: 'markdown-renderer',
    props: {
      content: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const transferred = ref(updateContent());
      function updateContent() {
        return render(props.content);
      }
      watch(() => props.content, () => {
        transferred.value = updateContent();
      });

      function onClickRenderer(event) {
        if (event.target.tagName === 'IMG') {
          onClickImage(event.target);
        }
      }
      function onClickImage(image) {
        openImageViewer([{
          // Full image
          src: image.src,
          w: image.naturalWidth,
          h: image.naturalHeight,
          // Thumbnail data
          thumbRect: image.getBoundingClientRect(),
        }]);
      }

      return () => {
        return h('div', {
          class: 'markdown-renderer markdown-body',
          innerHTML: transferred.value,
          onClick: onClickRenderer,
        });
      };
    }
  };
</script>

<style lang="less">
  .markdown-renderer {
    @apply text-sm md:text-base leading-5;

    img {
      @apply rounded-md;
    }
    h1, h2, h3, h4, h5, h6 {
      border-bottom: none;
    }

    .code {
      @apply rounded-md;
      white-space: pre;
      background: #2d2d2d !important;
    }
  }
</style>