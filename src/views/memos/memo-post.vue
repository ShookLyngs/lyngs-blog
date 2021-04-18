<template>
  <modal-dialog
    ref="modal"
    title="新想法"
    position="center"
    mobile-position="end"
    outer-class="body-top"
    transition-name="slide-from-bottom"
  >
    <div class="body-x flex-auto flex flex-col overflow-hidden">
      <field class="px-0 flex-auto flex flex-col overflow-hidden">
        <scrollbar
          disabled-horizontal
          class="flex-auto flex flex-col"
          wrap-class="flex-auto flex flex-col"
          view-class="box-border px-3.5 flex-auto flex flex-col"
        >
          <markdown-editor
            placeholder="有什么新想法"
            :preview="preview"
            v-model="form.content"
          />
          <div class="body-top -mx-0.5 flex flex-wrap">
            <div
              class="image"
              v-for="image in form.images"
              :key="image"
              :class="`image--${form.images.length}`"
            >
              <div class="image__content">
                <imager background view :src="image" />
              </div>
            </div>
          </div>
        </scrollbar>
      </field>

      <div class="sticky bottom-0 bg-negative-900">
        <div class="body-y flex justify-between items-center">
          <div>
            <plain-button
              icon="icon-yes-fill"
              text="预览"
              class="mr-3"
              normal-class="text-positive-600"
              active-class="text-theme-500"
              :active="preview"
              @click="togglePreview"
            />
          </div>
          <div>
            <border-button text="确认" />
          </div>
        </div>
      </div>
    </div>
  </modal-dialog>
</template>

<script>
  // Functions
  import { reactive, ref } from 'vue';
  // Components
  import ModalDialog from '@/components/modal-dialog.vue';
  import BorderButton from '@/components/border-button.vue';
  import PlainButton from '@/components/plain-button.vue';
  import Field from '@/components/field.vue';
  import MarkdownEditor from '@/components/markdown-editor.vue';
  // Resources
  import avatarImage from '@/assets/images/avatar.jpg';

  export default {
    name: 'memo-post',
    components: {
      ModalDialog,
      BorderButton,
      PlainButton,
      Field,
      MarkdownEditor,
    },
    setup() {
      const modal = ref();
      function open() {
        modal.value?.open?.();
      }
      function close() {
        modal.value?.close?.();
      }

      const form = reactive({
        content: '',
        images: [ avatarImage ],
      });

      const preview = ref(false);
      function togglePreview() {
        preview.value = !preview.value;
      }

      return {
        modal,
        open,
        close,

        form,
        preview,
        togglePreview,
      };
    },
  };
</script>

<style lang="less" scoped>
  .image {
    @apply mb-1;
    margin-left: theme('spacing[0.5]');
    margin-right: theme('spacing[0.5]');
    width: calc(33.33% - theme('spacing[1]'));

    @media (min-width: theme('screens.md')) {
      width: calc(25% - theme('spacing[1]'));
    }
    .image__content {
      @apply relative rounded overflow-hidden text-xl md:text-2xl text-positive-200 bg-negative-600;
      padding-top: 100%;

      .imager {
        @apply absolute left-0 top-0 w-full h-full;
      }
    }
  }
</style>