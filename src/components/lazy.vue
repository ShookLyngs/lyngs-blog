<template>
  <keep-alive>
    <div ref="element" v-if="show">
      <slot />
    </div>
  </keep-alive>
</template>

<script>
  // Functions
  import { ref, watch, inject, onBeforeMount } from 'vue';
  import { v1 as createUid } from 'uuid';

  export default {
    name: 'lazy',
    setup() {
      const uid = createUid();
      const element = ref();
      const reduced = ref();

      const { add, remove } = inject('lazyGroup', null);
      onBeforeMount(() => remove(element.value));

      const show = ref(true);
      watch(element, () => {
        const isReduced = !reduced.value || (reduced.value && element.value !== reduced.value);
        if (add && remove && element.value && isReduced) {
          reduced.value = element.value;
          add(uid, element.value, (canShow) => show.value = canShow);
        }
      });

      return {
        element,
        show,
      };
    },
  };
</script>

<style scoped>

</style>