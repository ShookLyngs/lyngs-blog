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

  const content = ref(null);
  const isRegistered = computed(() => !!content.value);
  function register(value) {
    content.value = value;
  }
  function deregister() {
    content.value = null;
  }
  function execute(name, ...args) {
    if (!isRegistered.value) return;
    if (!content.value?.[name]) {
      throw new Error(`No method in Field is call: ${name}`);
    }

    content.value?.[name]?.(...args);
  }

  const fieldState = reactive({
    content,
    isRegistered,
    register,
    deregister,
    execute,
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