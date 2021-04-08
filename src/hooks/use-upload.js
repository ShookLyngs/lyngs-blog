import { ref } from 'vue';
import { v4 as createId } from 'uuid';

const fileStatus = {
  ready: 'ready',
  process: 'process',
  success: 'success',
  fail: 'fail',
};

function normalizeFiles(files) {
  const filtered = !files?.length ? [files] : [...files];
  return filtered
    .filter(file => file instanceof File)
    .map(createFileWrapper);
}

function createFileWrapper(file) {
  return {
    file,
    uid: createId(),
    status: fileStatus.ready,
    error: null,
    _isFileWrapper: true,
  };
}

function unwrapFileWrapper(target) {
  return target?._isFileWrapper === true ? target.file : target;
}

async function loadFile(file) {
  const unwrapped = unwrapFileWrapper(file);
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = ({ target: { result } }) => resolve(result);
    reader.onerror = reject;

    reader.readAsDataURL(unwrapped);
  });
}

const uploadDefaultOptions = {
  multiple: false,
};

export function useUpload(options = uploadDefaultOptions) {
  const { multiple } = {
    ...uploadDefaultOptions,
    ...options,
  };

  const files = ref([]);
  function addFiles(list) {
    if (!list) return;

    list = normalizeFiles(list);
    if (!list.length) return;

    if (multiple) {
      files.value = [
        ...files.value,
        ...list,
      ];
    } else {
      files.value = [
        list[0],
      ];
    }
  }
  function removeFile(uid) {
    const index = files.value.findIndex(file => file.uid === uid);
    if (index > -1) files.value.splice(index, 1);
  }
  function removeFiles(uids) {
    if (!uids || !uids.length) return;
    uids.forEach(uid => removeFile(uid));
  }
  function clearFiles() {
    files.value = [];
  }

  function onDrop(event) {
    addFiles(event.dataTransfer.files);
    console.log(files.value);
  }

  return {
    files,
    addFiles,
    removeFile,
    removeFiles,
    clearFiles,
    onDrop,

    loadFile,
  };
}