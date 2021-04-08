import { ref } from 'vue';

export function localeDateTime(dateTime) {
  return languageMap[language.value]?.['dateTime']?.(dateTime);
}

const language = ref('zh_CN');
const languageMap = {
  zh_CN: chinese,
};

const chinese = {
  dateTime() {
    /* TODO */
  }
};