<script>
  export default {
    name: 'slot-detector',
    emits: [ 'updated' ],
    setup(props, { slots, emit }) {
      let [ recordSlot ] = slots.default();

      return () => {
        const [ currentSlot ] = slots.default();
        if (currentSlot.children !== recordSlot.children) {
          recordSlot = currentSlot;
          emit('updated', currentSlot?.children > 0);
          console.log(currentSlot.children);
        }

        return currentSlot;
      };
    },
    watch: {
      '$slots.default'(value) {
        console.log('watch', value);
      },
    },
  };
</script>

<style scoped>

</style>