import { ref, provide, inject, watch } from 'vue';

export const useListKey = 'use-list';

export function useList(initialValue = [], key = useListKey) {
  const list = ref(initialValue);

  function find(row) {
    return list.value.find(current => current === row);
  }
  function findIndex(row) {
    return list.value.findIndex(current => current === row);
  }
  function isFirstChild(row) {
    return findIndex(row) === 0;
  }
  function isLastChild(row) {
    return findIndex(row) === list.value.length - 1;
  }

  const compact = {
    list,
    find,
    findIndex,
    isFirstChild,
    isLastChild,
  };

  provide(key, compact);
  return compact;
}

export function useListItem(row, key = useListKey) {
  const { list, find, findIndex, isFirstChild, isLastChild } = inject(key);

  const data = ref(null);
  const isExist = ref(false);
  const isFirst = ref(true);
  const isLast = ref(true);

  watch([ list, row ], () => {
    const unwrapped = unwrapRow(row);

    if (list.value.length) {
      data.value = find(unwrapped) ?? row;
      isExist.value = findIndex(unwrapped) > -1;
      isFirst.value = isFirstChild(unwrapped);
      isLast.value = isLastChild(unwrapped);
    }
  }, { immediate: true });

  function unwrapRow(row) {
    if (row instanceof Function) return row();
    if ('value' in row) return row.value;

    throw new Error(`'row' must be a Lambda expression or a Ref object.`);
  }

  return {
    list,
    data,
    isExist,
    isFirst,
    isLast,
  };
}

