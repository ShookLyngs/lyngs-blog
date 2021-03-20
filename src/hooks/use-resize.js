import { ref } from 'vue';

const width = ref(window.innerWidth);
const height = ref(window.innerHeight);
window.addEventListener('resize', () => {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
});

export function useWindowResize() {
  return {
    windowWidth: width,
    windowHeight: height,
  };
}