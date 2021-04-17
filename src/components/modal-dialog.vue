<template>
  <modal v-model:show="actualShow" v-on="$attrs">
    <div class="dialog w-full md:px-0 md:content flex max-h-full self-center" :class="outerClass">
      <div
        class="dialog__inner flex-auto flex flex-col overflow-hidden md:rounded-lg border border-negative-600 bg-negative-900"
        :class="innerClass"
        @click.prevent.stop
      >
        <!-- Header -->
        <div class="dialog__header body flex justify-between items-center">
          <plain-button
            class="dialog__title text-xl font-semibold !px-0"
            icon-class="text-xl"
            icon="icon-left"
            @click="close"
          >
            <slot name="title">
              <span class="ml-2">{{ title }}</span>
            </slot>
          </plain-button>
        </div>

        <!-- Content -->
        <slot />
      </div>
    </div>
  </modal>
</template>

<script>
  // Functions
  import { useModel } from '@/hooks/use-model';
  // Components
  import Modal from '@/components/modal.vue';
  import PlainButton from '@/components/plain-button.vue';
  import {computed} from 'vue';

  export default {
    name: 'modal-dialog',
    components: {
      Modal,
      PlainButton,
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
      position: {
        type: String,
        default: '',
        validator: value => ['', 'center', 'start', 'end'].includes(value),
      },
      mobilePosition: {
        type: String,
        default: 'center',
        validator: value => ['', 'center', 'start', 'end'].includes(value),
      },
    },
    emits: ['update:show'],
    setup(props, { emit }) {
      const actualShow = useModel(
        () => props.show,
        (value) => emit('update:show', value)
      );
      function open() {
        actualShow.value = true;
      }
      function close() {
        actualShow.value = false;
      }

      const outerClass = computed(() => {
        const classes = [];

        const { position, mobilePosition } = props;

        if (mobilePosition === 'start') {
          classes.push('body-bottom self-start');
        }
        if (mobilePosition === 'center') {
          classes.push('body self-center');
        }
        if (mobilePosition === 'end') {
          classes.push('body-top self-end');
        }

        if (position === 'start') {
          classes.push('md:body-y md:self-start');
        }
        if (position === 'center') {
          classes.push('md:body-y md:self-center');
        }
        if (position === 'end') {
          classes.push('md:body-y md:self-end');
        }

        return classes;
      });
      const innerClass = computed(() => {
        const classes = [];

        const { position, mobilePosition } = props;

        if (mobilePosition === 'center' || !position) {
          classes.push('rounded-xl');
        }
        if (mobilePosition === 'start') {
          classes.push('rounded-b-xl');
        }
        if (mobilePosition === 'end') {
          classes.push('rounded-t-xl');
        }

        return classes;
      });

      return {
        actualShow,
        open,
        close,

        outerClass,
        innerClass,
      };
    }
  };
</script>

<style scoped>

</style>