import { ref, provide, inject, watchEffect } from 'vue';

export const dropdownItemProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  divided: {
    type: [ Boolean, String ],
    default: '',
    validator: value => typeof value === 'boolean' || ['', 'top', 'bottom'].includes(value),
  },
};

export function createDropdownShared(merged) {
  const instance = {
    dropdown: ref(),
    ...merged,
  };

  watchEffect(() => console.log(instance.dropdown));

  provide('dropdown', instance);
  return instance;
}

export function useDropdownShared(merge = {}) {
  const instance = inject('dropdown', {});
  if (merge) Object.assign(instance, merge);

  provide('dropdown', instance);
  return instance;
}