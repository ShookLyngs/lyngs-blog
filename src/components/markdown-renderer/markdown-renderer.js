import { createVNode, ref, watch, watchEffect} from 'vue';
import { render } from './markdown';

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

    const element = ref();
    watchEffect(() =>{
      if (element.value) {
        console.log(element.value.children);
      }
    });

    return () => {
      console.log(transferred.value.replace);
      const page = createVNode('div', {
        ref: element,
        class: 'markdown-renderer',
        innerHTML: transferred.value,
      });

      // console.log(page);
      return page;
    };
  }
};