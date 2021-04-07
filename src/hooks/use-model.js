import { ref, unref, watch } from 'vue';

export function useModel(name, target, emit) {
  const getter = () => unwrap(target);
  const emitName = `update:${name}`;

  const model = ref(getter());
  watch(getter, () => model.value = getter());
  watch(model, () => emit(emitName, model.value));

  return model;
}

function unwrap(target) {
  return unref(target?.());
}