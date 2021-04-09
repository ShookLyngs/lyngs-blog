import { ref, unref, watch } from 'vue';

export function useModel(target, effect) {
  const getter = () => unwrap(target);

  const model = ref(getter());
  watch(getter, () => model.value = getter());
  watch(model, () => effect(model.value));

  return model;
}

function unwrap(target) {
  return unref(target?.());
}