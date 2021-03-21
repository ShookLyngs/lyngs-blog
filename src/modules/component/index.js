// components
import BorderButton from '@/components/border-button.vue';
import Imager from '@/components/imager.vue';
import Empty from '@/components/empty.vue';

const components = [ BorderButton, Imager, Empty ];

// uses
import Loading from '@/components/loading';

const uses = [ Loading ];

export default {
  install(app) {
    // Set global components
    components.forEach(
      component => app.component(component.name, component)
    );

    // Install Global components
    uses.forEach(
      usage => app.use(usage)
    );
  }
};