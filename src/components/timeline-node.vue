<template>
  <div class="absolute right-full top-0 bottom-0">
    <div class="flex items-center select-none" :style="nodeStyle">
      <div
        class="mr-2 whitespace-nowrap font-semibold text-sm text-positive-400"
        v-if="$slots.time || time"
      >
        <slot name="time">{{ time }}</slot>
      </div>
      <div
        class="box-border rounded-full border-4 border-positive-400 bg-negative-800 z-10"
        :style="symbolStyle"
      />
    </div>
    <div
      class="absolute flex justify-center box-content right-0"
      :style="lineWrapperStyle"
    >
      <div class="w-px h-full bg-negative-600" />
    </div>
  </div>
</template>

<script>
  import { computed } from 'vue';

  export default {
    name: 'timeline-node',
    props: {
      time: {
        type: String,
        default: '',
      },
      isFirst: {
        type: Boolean,
        default: false,
      },
      isLast: {
        type: Boolean,
        default: false,
      },

      hideSymbol: {
        type: Boolean,
        default: false,
      },
      symbolSize: {
        type: Number,
        default: 1,
      },
      nodeHeight: {
        type: Number,
        default: 2,
      },
      nodeTop: {
        type: Number,
        default: 1.875,
      },
      gapHeight: {
        type: Number,
        default: 1.25,
      },
    },
    setup(props) {
      const nodeStyle = computed(() => {
        return {
          height: `${props.nodeHeight}rem`,
          marginTop: `${props.nodeTop}rem`,
        };
      });

      const symbolStyle = computed(() => {
        return {
          display: props.hideSymbol ? 'none' : 'block',
          width: `${props.symbolSize}rem`,
          height: `${props.symbolSize}rem`,
        };
      });

      const lineWrapperStyle = computed(() => {
        const top = props.isFirst
          ? `${props.nodeHeight + props.symbolSize / 2}rem`
          : '0';
        const bottom = props.isLast ? 'initial' : '0';
        const height = props.isLast
          ? `${props.nodeTop + props.nodeHeight / 2}rem`
          : 'auto';

        return {
          top,
          bottom,
          height,
          width: `${props.symbolSize}rem`,
        };
      });

      return {
        nodeStyle,
        symbolStyle,
        lineWrapperStyle,
      };
    },
  };
</script>

<style scoped></style>
