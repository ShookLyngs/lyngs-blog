import { ref, isRef, unref, provide, inject, watchEffect } from 'vue';
import ResizeObserver from 'resize-observer-polyfill';

export function useElementResize(target) {
  const width = ref(null);
  const height = ref(null);

  function onResize() {
    const updatedSize = getSize(target);
    width.value = updatedSize.width;
    height.value = updatedSize.height;
  }

  const listener = ref(new ResizeObserver(onResize));
  function listen() {
    listener.value.observe(unref(target));
  }
  function remove() {
    listener.value.unobserve(unref(target));
  }
  function forceUpdate() {
    onResize();
  }

  if (isRef(target)) {
    watchEffect(() => {
      if (target.value) {
        remove();
        listen();
        onResize();
      }
    });
  }
  if (!isRef(target) && target) {
    listen();
    onResize();
  }

  return {
    width,
    height,
    remove,
    forceUpdate,
  };
}

function getSize(target) {
  const unwrapped = unref(target);

  if (unwrapped === window) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  } else if (unwrapped) {
    const { width, height } = unwrapped.getBoundingClientRect();
    return {
      width,
      height,
    };
  } else {
    return {
      width: null,
      height: null,
    };
  }
}

/*
const windowResize = useElementResize(window);
export function useWindowResize() {
  return windowResize;
}
*/

const useResizeKey = 'useResizeKey';
export function createResizeObserver(element, key = useResizeKey) {
  const resize = useElementResize(element);

  provide(key, resize);
  return resize;
}
export function useResizeObserver(key = useResizeKey) {
  try {
    return inject(key);
  } catch {
    throw new Error(
      'You need to create Resize by calling \'createResizeObserver()\' before using it.'
    );
  }
}
