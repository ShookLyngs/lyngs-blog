// components
import RippleButton from '@/components/ripple-button.vue';
import BorderButton from '@/components/border-button.vue';
import TextButton from '@/components/text-button.vue';
import Imager from '@/components/imager.vue';
import Empty from '@/components/empty.vue';
import Container from '@/layouts/container.vue';

const components = [RippleButton, BorderButton, TextButton, Imager, Empty, Container];

// uses
import Icon from '@/components/icon';
import Loading from '@/components/loading';
import Scrollbar from '@/components/scrollbar';
import Collapse from '@/components/collapse';
import Popper from '@/components/popper';
import ImageViewer from '@/components/image-viewer';

const uses = [Icon, Loading, Scrollbar, Collapse, Popper, ImageViewer];

export default {
  install(app) {
    // Set global components
    components.forEach(component => app.component(component.name, component));

    // Install Global components
    uses.forEach(usage => app.use(usage));
  },
};
