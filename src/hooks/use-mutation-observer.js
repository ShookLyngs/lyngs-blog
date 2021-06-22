import { isRef, ref, watch } from 'vue';

export function useMutationObserver({ target, config = {}, onChange = () => {} }) {
  config = ref({
    childList: true,
    ...config,
  });

  const observer = ref();
  function onMutationChange(mutations) {
    onChange({
      mutations,
      types: getTypes(mutations),
      map: toMap(mutations),
    });
  }
  function observeNode(element) {
    if (!observer.value) observer.value = new MutationObserver(onMutationChange);
    else observer.value.disconnect();
    observer.value.observe(element, config.value);
  }
  function toMap(mutations) {
    return [...mutations].reduce((collection, mutation) => {
      collection[mutation.type] = mutation;
      return collection;
    }, {});
  }
  function getTypes(mutations) {
    return [...mutations].reduce((collection, mutation) => {
      return (collection.push(mutation.type) && collection);
    }, []);
  }

  const element = isRef(target) ? target : ref(target);
  watch(
    [ element, config ],
    () => element.value && observeNode(element.value)
  );

  return {
    element,
    config,
  };
}