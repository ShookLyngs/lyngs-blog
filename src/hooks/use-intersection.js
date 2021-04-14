import { ref, watchEffect } from 'vue';

export function useIntersection(element) {
  const target = ref(element);
  const observer = ref();

  watchEffect(() => {
    if (target.value) {
      observer.value = new IntersectionObserver(onObserverCallback, {
        root: target.value,
      });
    }
  });
  function onObserverCallback(entries) {
    entries.forEach(entry => {
      trigger(entry.target, entry);
    });
  }

  const watches = ref([]);
  function observe(element, callback) {
    const reduced = watches.value.find(row => row.element === element);
    if (reduced) {
      reduced.callback = callback;
    } else {
      observer.value.observe(element);
      watches.value.push({ element, callback });
    }
  }
  function unobserve(element) {
    const index = watches.value.findIndex(row => row.element === element);
    if (index > -1) {
      observer.value.unobserve(element);
      watches.value.splice(index, 1);
    }
  }
  function trigger(element, ...args) {
    watches.value.forEach(row => {
      if (row.element === element) {
        row.callback(...args);
      }
    });
  }
  function disconnect() {
    if (observer.value) {
      observer.value.disconnect();
    }
  }

  return {
    observer,
    observe,
    unobserve,
    trigger,
    disconnect,
  };
}