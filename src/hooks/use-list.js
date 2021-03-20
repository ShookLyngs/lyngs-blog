import { ref, isRef, unref, reactive, provide, inject, watchEffect } from 'vue';

export const useListKey = 'use-list';

export function useList({ list = [], state = {}, key = useListKey } = {}) {
  list  = ref(list);
  state = reactive(state);

  function find(row) {
    return list.value.find(current => current === row);
  }
  function findIndex(row) {
    return list.value.findIndex(current => current === row);
  }
  function remove(row) {
    const index = findIndex(row);
    if (index < 0) return false;

    list.value.splice(index, 1);
    return true;
  }

  function isFirstChild(row) {
    return findIndex(row) === 0;
  }
  function isLastChild(row) {
    return findIndex(row) === list.value.length - 1;
  }

  const compact = {
    list,
    state,
    find,
    findIndex,
    remove,
    isFirstChild,
    isLastChild,
  };

  provide(key, compact);
  return compact;
}

export function useListItem({ row, key = useListKey } = {}) {
  const {
    list, state,
    find, findIndex,
    isFirstChild, isLastChild,
    remove: removeRow,
  } = inject(key);

  const data = ref(null);
  const isExist = ref(false);
  const isFirst = ref(true);
  const isLast = ref(true);

  watchEffect(() => {
    const rowValue = unwrapRow(row);

    if (list.value.length) {
      data.value = find(rowValue) ?? row;
      isExist.value = findIndex(rowValue) > -1;
      isFirst.value = isFirstChild(rowValue);
      isLast.value = isLastChild(rowValue);
    }
  });

  function unwrapRow(row) {
    if (row instanceof Function) return row();
    if (isRef(row)) return unref(row);

    throw new Error(`'row' must be a Lambda expression or a Ref object.`);
  }

  function remove() {
    removeRow(data.value);
  }

  return {
    list,
    state,
    data,
    remove,
    isExist,
    isFirst,
    isLast,
  };
}

