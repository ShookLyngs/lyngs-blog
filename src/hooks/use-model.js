import { ref, unref, watch, defineEmit } from 'vue';

export function useModel(name, target) {
  const getter = () => unwrap(target);

  const emitName = `update:${name}`;
  const emit = defineEmit([emitName]);

  const model = ref(getter());
  watch(getter, model.value = getter());
  watch(model, () => emit(emitName, model.value));

  return model;
}

function unwrap(target) {
  return unref(target?.());
}