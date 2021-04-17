<template>
  <modal-dialog
    close-on-click-modal
    ref="modal"
    title="新的想法"
  >
    <field class="flex-auto flex flex-col">
      <markdown-editor placeholder="说点什么吧" v-model="form.content" />
    </field>

    <div class="body-y flex justify-end sticky bottom-0 bg-negative-900">
      <border-button text="发表" />
    </div>

    <!--<li v-for="item in 50" :key="item">content</li>-->
  </modal-dialog>
</template>

<script>
  // Functions
  import {reactive, ref} from 'vue';
  // Components
  import ModalDialog from '@/components/modal-dialog.vue';
  import BorderButton from '@/components/border-button.vue';
  import Field from '@/components/field.vue';
  import MarkdownEditor from '@/components/markdown-editor.vue';

  export default {
    name: 'memo-post',
    components: {
      ModalDialog,
      BorderButton,
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
      });

      return {
        modal,
        open,
        close,

        form,
      };
    },
  };
</script>

<style scoped>

</style>