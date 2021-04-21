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
        class: 'markdown-renderer',
        innerHTML: transferred.value,
        onClick: onClickRenderer,
      });
    };
  }
};