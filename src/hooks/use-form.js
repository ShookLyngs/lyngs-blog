import { provide, inject, ref, reactive, computed, onBeforeUnmount } from 'vue';

export const formStateKey = 'form';
export const fieldStateKey = 'field';

export function useForm() {
  const form = ref(null);

  const formState = reactive({
    form,
    fields: ref([]),
  });

  provide(formStateKey, formState);
  return formState;
}

export function useField(initialState = {}) {
  initialState = {
    key: fieldStateKey,
    ...initialState,
  };

  const contentState = ref(null);
  const isRegistered = computed(() => !!contentState.value);
  function register(value) {
    contentState.value = value;
  }
  function deregister() {
    contentState.value = null;
  }
  function execute(name, ...args) {
    if (!isRegistered.value) return;
    contentState.value?.[name]?.(...args);
  }

  function trigger(name, ...args) {
    fieldState?.[name]?.(...args);
  }
  const fieldState = reactive({
    contentState,
    isRegistered,
    register,
    deregister,
    execute,
    trigger,
    ...initialState,
  });

  provide(initialState.key, fieldState);
  return fieldState;
}

export function useFieldContent(initialState = {}) {
  initialState = {
    fieldKey: fieldStateKey,
    ...initialState,
  };

  const fieldState = inject(initialState.fieldKey);
  const { register, deregister } = fieldState;

  const contentState = reactive({
    fieldState,
    ...initialState,
  });

  register(contentState);
  onBeforeUnmount(deregister);

  return contentState;
}